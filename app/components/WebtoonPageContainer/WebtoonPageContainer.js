/**
 * Created by fiddlest on 3/2/2017.
 */
import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import {TabViewAnimated, TabBar} from 'react-native-tab-view';
import {connect} from 'react-redux';

import ToonGird from '../ToonGrid/ToonGrid';
import fetchIfNeeded from '../../actions/fetchAction';
import {createRequestUrl} from '../../utils/index';
import {urlTypes} from '../../model/data';
import {createUrlQuery, indexToweekday} from '../../utils/index';

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
    this.fetchWebtoonData(this.props);
  }

  fetchWebtoonData = ({dispatch, site, loginInfo, index}) => {
    //fetch monday toon list
    console.log('fetchWebtoonData',index)
    if(loginInfo.hasToken){
      let requestUrl = createRequestUrl(urlTypes.LIST, site);
      const {token_type, access_token} = loginInfo.tokenDetail;
      const query = {
        weekday: indexToweekday(index)
      };
      requestUrl = requestUrl + '?' + createUrlQuery(query);
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
  componentWillUpdate(nextProps, nextState){
    if(this.state.index !== nextState.index){
      console.log('componentWillUpdate',nextState.index)
      this.fetchWebtoonData({...nextProps, ...nextState})
    }
  }

  _handleChangeTab = (index) => {
    this.setState({index});
  };

  _renderHeader = (props) => {
    return <TabBar {...props} />;
  };


  _renderScene = ({route}) => {
    const {webtoonList} = this.props;
    return <ToonGird webtoonList={webtoonList} width={this.props.width}/>;
  };

  render() {
    return (
      <TabViewAnimated
        style={styles.container}
        navigationState={this.state}
        renderScene={this._renderScene}
        renderHeader={this._renderHeader}
        onRequestChangeTab={this._handleChangeTab}
      />
    );
  }
}


const mapStateToProps = (state) => {
  const {loginReducer, fetchReducer} = state;
  return {
    loginInfo: loginReducer,
    webtoonList: fetchReducer.data
  }
};

export default connect(mapStateToProps)(WebtoonPageContainer);
