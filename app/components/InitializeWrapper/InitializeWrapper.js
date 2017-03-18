/**
 * Created by fiddlest on 3/17/2017.
 */
import React, {Component} from 'react';
import {
  View,
  Text,
  ToastAndroid
} from 'react-native';
import {connect} from 'react-redux'
import flowRight from 'lodash.flowright';
import {Actions} from 'react-native-router-flux';

import fetchIfNeeded, {fetchForInit} from '../../actions/fetchActions';
import secret from '../../config/secret';
import {isTokenExpired, createRequestUrl} from '../../utils';
import {urlTypes, siteList} from '../../model/data';
import Loading from '../WebtoonActivityIndicator/WebtoonActivityIndicator';
import Model from '../../model/realm/model';
import {saveImageToLocal} from './init';

const initializeWrapper = (ComposedComponent) => {
  class InitializeWrapper extends Component {
    state = {
      initializing: false,
      webtoons: []
    };

    componentWillMount() {

      const {login, site} = this.props;
      this.setState({
        initializing: true
      });
      if (!this.props.isInitialized) {
        const loginData = {
          access_token:"9yBv8nsc67rCuH6YNyzPSFAJZtUOQW",
          token_type :"Bearer",
          hasToken: true
        };

        //fetchForInit
        const requestList = siteList.map((site)=>{
          let requestUrl = createRequestUrl(urlTypes.LIST, site);
          const {token_type, access_token} = loginData;
          const fetchDetail = {
            method: 'GET',
            headers: {
              Authorization: token_type.toLowerCase() + ' ' + access_token
            }
          };
          return {requestUrl: requestUrl, fetchDetail: fetchDetail};
        });
        this.props.dispatch(fetchForInit(requestList))
      }
    }

    fetchWebtoonListFromServer = ({site},{token_type, access_token})=>{
      const requestList = siteList.map((site)=>{
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

    finalizeInit = (webtoons) => {
      this.setState({
        webtoons: webtoons,
        initializing: false,
      })
    };

    componentWillReceiveProps(nextProps) {
      const {isFetching, fetchData} = nextProps;
      if (!isFetching && fetchData.length > 0) {
        const webtonModel = Model(this.props.webtoonRealm);
        const updatedWebtoon = fetchData
          .map(this.updateSite)
          .map(saveImageToLocal());

        Promise.all(updatedWebtoon)
          .then((webtoons) => {
            try {
              webtonModel.bulkCreate("Webtoon", webtoons);
            } catch (err) {
              console.log(err)
              ToastAndroid.show("Fail on init :" + err, ToastAndroid.SHORT);
            }
            this.props.updateInitializedState(true);
            this.finalizeInit()
          });
      }
    }
    render() {
      const canRenderComposedComp = !this.state.initializing && this.state.webtoons.length > 0;
      return true ? <View style={{flex:1, backgroundColor:'red'}}><Loading animating={true}/></View> :
        <ComposedComponent {...this.props} webtoonList={this.state.webtoons}/>

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