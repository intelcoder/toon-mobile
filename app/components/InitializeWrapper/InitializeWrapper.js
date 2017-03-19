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
      const {login} = this.props;

      if (!this.props.isInitialized) {

        this.setState({
          initializing: true
        }, () => {
          InteractionManager.runAfterInteractions(() => {
            // ...long-running synchronous task...
            this.fetchAllWebtoonListFromServer(siteList, login.tokenDetail);
          });
        });
      } else {
        AsyncStorage.getItem(this.props.site)
          .then((w)=>{
            return JSON.parse(w)
          })
          .then((ws) =>
            this.setState({
            webtoons:ws
          }))

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

    componentWillReceiveProps(nextProps) {
      const {isFetching, fetchData} = nextProps;
      if (!isFetching && fetchData.length > 0) {
        fetchData.forEach((webtoons) => {
          const updateWebtoon = webtoons
            .map(this.updateSite)
            .map(saveImageToLocal());

          const finalPromises = Promise.all(updateWebtoon)
            .then((webtoons)=>{
              let site = 'naver';
              if(webtoons[0] && webtoons[0].site) site = webtoons[0].site;
              return AsyncStorage.setItem(`${site}`, JSON.stringify(webtoons)).then(()=>{
                return webtoons.map((webtoon) => {
                  return AsyncStorage.setItem(`${site}:${webtoon.toon_id}`, JSON.stringify(webtoon))
                });
              });
            });

          Promise.all(finalPromises)
            .then(()=>{
              this.props.updateInitializedState(true);
              this.finalizeInit();
              ToastAndroid.show( "Init finished", ToastAndroid.LONG);
            })
            .catch((err)=>{
              ToastAndroid.show(" Fail to save due to :" + err, ToastAndroid.LONG);
            })

        });


        /*  const updatedWebtoon = fetchData
            .map(this.updateSite)
            .map(saveImageToLocal())


          Promise.all(updatedWebtoon)
            .then((webtoons) => {
              try {
                console.log(webtoons)
                AsyncStorage.setItem(`${this.props.site}`, JSON.stringify(webtoons)).then(()=>{});

                //save into local storage
                this.props.updateInitializedState(true);
                this.finalizeInit(webtoons)
              } catch (err) {
                ToastAndroid.show("Fail on init :" + err, ToastAndroid.LONG);
              }
            });*/
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
      console.log(this.state.webtoons)
      const canRenderComposedComp = !this.state.initializing && this.state.webtoons.length > 0;
      return this.getContents(canRenderComposedComp)
    }
  }

  const mapStateToProps = (state) => {
    const {loginReducer, fetchReducer} = state;
    return {
      login: loginReducer,
      fetchData: fetchReducer.data,
      isFetching: fetchReducer.isFetching
    }
  };

  return connect(mapStateToProps)(InitializeWrapper);
};

export default initializeWrapper;