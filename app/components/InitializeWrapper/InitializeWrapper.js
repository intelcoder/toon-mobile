/**
 * Created by fiddlest on 3/17/2017.
 */
import React, {Component} from 'react';
import {
  View,
  Text
} from 'react-native';
import {connect} from 'react-redux'
import {Actions} from 'react-native-router-flux';

import fetchIfNeeded, {fetchForInit} from '../../actions/fetchActions';
import secret from '../../config/secret';
import {isTokenExpired, createRequestUrl} from '../../utils';
import {urlTypes, siteList} from '../../model/data';
import Loading from '../WebtoonActivityIndicator/WebtoonActivityIndicator';

const initializeWrapper = (ComposedComponent) => {
  class InitializeWrapper extends Component {
    state = {
      initializing: false,
    };

    componentWillMount() {

      const {login, site} = this.props;
      /*@todo Add back later
       const tokenExpired = isTokenExpired(login.tokenReceivedAt, secret.expires_in);
       if(!login.hasToken || !tokenExpired) Actions.login();*/

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

    componentWillReceiveProps(nextProps) {
      const {isFetching, fetchData} = nextProps;
      if (!isFetching && fetchData.length > 0) {
        console.log("componentWillReceiveProps", fetchData.length)
        //save data into storage

        //get data from storage

        //If there is no error, change initialized value to true;

      }
    }

    fetchWebtoonDataFromStorage = (site) => {
      const webtoonRealm = this.props.webtoonRealm;
      const webtoons = webtoonRealm.objects.filter(`site="${site}"`);
      console.log(webtoons);
    };


    fetchWebtoonData = (site, {hasToken, token_type,access_token }) => {
      const {dispatch} = this.props;
      //fetch monday toon list
      if (hasToken) {
        let requestUrl = createRequestUrl(urlTypes.LIST, site);
        const fetchDetail = {
          method: 'GET',
          headers: {
            Authorization: token_type.toLowerCase() + ' ' + access_token
          }
        };
        dispatch(fetchIfNeeded(requestUrl, fetchDetail)
        )
      }
    };

    render() {
      return true ? <View style={{flex:1, backgroundColor:'red'}}><Loading animating={true}/></View> :
        <ComposedComponent {...this.props}/>

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