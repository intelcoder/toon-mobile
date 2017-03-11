/**
 * Created by fiddlest on 3/2/2017.
 */
import React, {Component} from 'react';
import {View, StyleSheet, ToolbarAndroid } from 'react-native';
import {TabViewAnimated, TabBar} from 'react-native-tab-view';
import {connect} from 'react-redux';

import ToonGird from '../ToonGrid/ToonGrid';
import fetchIfNeeded from '../../actions/fetchAction';
import {createRequestUrl} from '../../utils/index';
import {urlTypes} from '../../model/data';
import siteModel from '../../model/siteModel';
import {weekdays} from '../../utils/index';
var nativeImageSource = require('nativeImageSource');


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  page: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});


class WebtoonPageContainer extends Component {
  state = {
    index: 0,
    routes: [
      {key: '1', title: '월'},
      {key: '2', title: '화'},
      {key: '3', title: '수'},
      {key: '4', title: '목'},
      {key: '5', title: '금'},
      {key: '6', title: '토'},
      {key: '7', title: '일'},
    ],
    site: this.props.site
  };

  componentDidMount() {
    const {site, loginInfo} = this.props;
    const {index} = this.state;
    setTimeout(() => {
      this.fetchWebtoonData(site, loginInfo, index);
    }, 1000)

  }

  fetchWebtoonData = (site, loginInfo, index) => {
    const {dispatch} = this.props;
    //fetch monday toon list
    if(loginInfo.hasToken){
      let requestUrl = createRequestUrl(urlTypes.LIST, site);
      const {token_type, access_token} = loginInfo.tokenDetail;
      dispatch(
        fetchIfNeeded(requestUrl , {
            method: 'GET',
            headers: {
              Authorization: token_type.toLowerCase() + ' ' + access_token
            }
          }
        )
      )
    }
  };
  _handleChangeTab = (index) => {
    this.setState({index});
  };

  _renderHeader = (props) => {
    return <TabBar {...props} />;
  };

  _renderScene = ({webtoonList, width, isFetching}) => {
    return ({index})=>{
      return <ToonGird
        index={index}
        webtoonList={webtoonList.filter(webtoon=> webtoon.weekday == weekdays[index])}
        width={width}
        isFetching={isFetching}
      />
    }
  };

  render() {
    const renderScene = this._renderScene(this.props);
    const site = this.state.site;
    return (
      <View style={{flex:1}}>
        <ToolbarAndroid
          title={site.toUpperCase()}
          style={{
            height: 56,
            backgroundColor: siteModel[site.toLowerCase()].backgroundColor,
          }}
          titleColor='white'
          subtitleColor='white'
          actions={toolbarActions}
        />
        <TabViewAnimated
          style={styles.container}
          navigationState={this.state}
          renderScene={renderScene}
          renderHeader={this._renderHeader}
          onRequestChangeTab={this._handleChangeTab}
        />
      </View>
    );
  }
}

var toolbarActions = [
  {title: 'Naver'},
  {title: 'Daum'},
  {title: 'Rezin'},
  {title: 'Kakao'},

];

const mapStateToProps = (state) => {
  const {loginReducer, fetchReducer} = state;
  return {
    loginInfo: loginReducer,
    webtoonList: fetchReducer.data,
    isFetching: fetchReducer.isFetching
  }
};

export default connect(mapStateToProps)(WebtoonPageContainer);
