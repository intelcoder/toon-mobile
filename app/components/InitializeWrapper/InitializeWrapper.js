/**
 * Created by fiddlest on 3/17/2017.
 */
import React, {Component} from 'react';
import {
  View,
  Text,
  ToastAndroid,
AsyncStorage,
  InteractionManager
} from 'react-native';
import {connect} from 'react-redux'

import {fetchForInit} from '../../actions/fetchActions';

import {isTokenExpired, createRequestUrl} from '../../utils';
import {urlTypes, siteList} from '../../model/data';
import Loading from '../WebtoonActivityIndicator/WebtoonActivityIndicator';
import {saveImageToLocal} from './init';

const initializeWrapper = (ComposedComponent) => {
  class InitializeWrapper extends Component {
    state = {
      initializing: false,
      webtoons: []
    };

    componentWillMount() {
      const {login, isConnected, isInitialized} = this.props;


      if (!isInitialized && isConnected) {
        this.setState({
          initializing: true
        }, () => {
          InteractionManager.runAfterInteractions(() => {
            this.fetchAllWebtoonListFromServer(siteList, login.tokenDetail);
          });
        });
      } else if(isInitialized) {
        AsyncStorage.getItem(this.props.site)
          .then((w)=> {
            return JSON.parse(w)
          })
          .then((ws) =>this.setState({webtoons: ws})
          )
          .catch((e)=> {
            console.log(e)
          })
      }
    }

    fetchAllWebtoonListFromServer = (siteList, {token_type, access_token})=> {
      const requestList = siteList.map((site)=> {
        let requestUrl = createRequestUrl(urlTypes.LIST, site);
        const fetchDetail = {
          method: 'GET',
          headers: {
            Authorization: token_type.toLowerCase() + ' ' + access_token
          }
        };
        return {requestUrl: requestUrl, fetchDetail: fetchDetail};
      });
      this.props.dispatch(fetchForInit(requestList))
    };

    updateSite = (webtoon) => {
      webtoon.site = webtoon.site.name;
      return webtoon;
    };

    finalizeInit = () => {
      AsyncStorage.getItem(this.props.site)
        .then((data) => {
          const webtoons = JSON.parse(data)
          this.setState({
            webtoons: webtoons,
            initializing: false,
          })
        })
    };

    saveWebtoonsToLocal = async(webtoons) => {
      //create sites object from siteList
      let updatedWebtoons;
      let sites = siteList.reduce((acc, site) => {
        acc[site] = [];
        return acc;
      }, {});

      try {
        //Update webtoon data and save thumbnail_url to local
        updatedWebtoons = webtoons
          .map(this.updateSite)
          .map(saveImageToLocal());
        updatedWebtoons = await Promise.all(updatedWebtoons);
      } catch (err) {
        return ToastAndroid.show("Error occurred on saving images", ToastAndroid.LONG);
      }

      // Separate webtoon by site
      updatedWebtoons.forEach((webtoon) => {
        sites[webtoon.site].push(webtoon)
      });

      // Save webtoon data to local using AsyncStorage
      const savePromises = Object.keys(sites).map((site)=> {
        return AsyncStorage.setItem(`${site}`, JSON.stringify(sites[site]));
      });

      try {
        // If saving did not throw any error, finish initializing
        await Promise.all(savePromises);
        this.props.updateInitializedState(true);
        this.finalizeInit();
        ToastAndroid.show("Init finished", ToastAndroid.LONG);
      } catch (err) {
        ToastAndroid.show(" Fail to save due to :" + err, ToastAndroid.LONG);
      }
    };

    componentWillReceiveProps(nextProps) {
      const {isFetching, fetchResult} = nextProps;
      if (!isFetching && fetchResult.data.length > 0) {
        const webtoons = fetchResult.data;
        this.saveWebtoonsToLocal(webtoons);
      }
    }

    getContents = (showComponent) => {
      return showComponent ?
        <ComposedComponent
          {...this.props}
          webtoonList={this.state.webtoons}
        />
        : <View style={{flex:1, backgroundColor:'red'}}><Loading animating={true}/></View>
    };

    render() {
      const canRenderComposedComp = !this.state.initializing && this.state.webtoons.length > 0;
      return this.getContents(canRenderComposedComp)
    }
  }

  const mapStateToProps = (state) => {
    const {loginReducer, fetchReducer} = state;
    return {
      login: loginReducer,
      fetchResult: fetchReducer,
      isFetching: fetchReducer.isFetching
    }
  };

  return connect(mapStateToProps)(InitializeWrapper);
};

export default initializeWrapper;