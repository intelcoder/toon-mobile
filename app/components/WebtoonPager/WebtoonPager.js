/**
 * Created by fiddlest on 3/2/2017.
 */
import React, {Component} from 'react';
import {View, StyleSheet, ToolbarAndroid } from 'react-native';
import {TabViewAnimated, TabBar} from 'react-native-tab-view';
import ToonGird from '../ToonGrid/ToonGrid';
import siteModel from '../../model/siteModel';
import {weekdays} from '../../utils/index';
import initializeWrapper from '../InitializeWrapper/InitializeWrapper'


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


class WebtoonPager extends Component {
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
    site: this.props.site,
    webtoonList: []
  };

  componentDidMount() {
    const {site, loginInfo} = this.props;
    const {index} = this.state;
  }

  _onActionSelected  = (position) => {
    this.setState({
      site: toolbarActions[position].title.toLowerCase()
    });


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
        webtoonList={webtoonList.filter(webtoon => webtoon.weekday == weekdays[index])}
        width={width}
        isFetching={isFetching}
      />
    }
  };

  getAction = () => {
    return [
      {title: 'Naver'},
      {title: 'Daum'},
      {title: 'Rezin'},
      {title: 'Kakao'},
    ].filter((action) => {
      if(this.state.site !== action.title.toLowerCase())
        return action;
    });
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
          onActionSelected={this._onActionSelected}
          titleColor='white'
          subtitleColor='white'
          actions={this.getAction()}
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

export default initializeWrapper(WebtoonPager);