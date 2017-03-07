/**
 * Created by fiddlest on 3/2/2017.
 */
import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { TabViewAnimated, TabBar } from 'react-native-tab-view';
import ToonGird from '../ToonGrid/ToonGrid';

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
      { key: '1', title: '월' },
      { key: '2', title: '화' },
      { key: '3', title: '수' },
      { key: '4', title: '목' },
      { key: '5', title: '금' },
      { key: '6', title: '토' },
      { key: '7', title: '일' },
    ],
  };

  _handleChangeTab = (index) => {
    this.setState({ index });
  };

  _renderHeader = (props) => {
    return <TabBar {...props} />;
  };

  _renderScene = ({ route }) => {
    switch (route.key) {
      case '1':
        return <ToonGird  width={this.props.width}/>;
      case '2':
        return <View style={[ styles.page, { backgroundColor: '#673ab7' } ]} />;
      case '3':
        return <View style={[ styles.page, { backgroundColor: '#ff4081' } ]} />;
      case '4':
        return <View style={[ styles.page, { backgroundColor: '#673ab7' } ]} />;
      case '5':
        return <View style={[ styles.page, { backgroundColor: '#ff4081' } ]} />;
      case '6':
        return <View style={[ styles.page, { backgroundColor: '#673ab7' } ]} />;
      case '7':
        return <View style={[ styles.page, { backgroundColor: '#673ab7' } ]} />;
      default:
        return null;
    }
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


export default WebtoonPageContainer;
