/**
 * Created by fiddlest on 3/2/2017.
 */
import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { TabViewAnimated, TabBar } from 'react-native-tab-view';

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
      { key: '1', title: 'Naver' },
      { key: '2', title: 'Daum' },
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
        return <View style={[ styles.page, { backgroundColor: '#ff4081' } ]} />;
      case '2':
        return <View style={[ styles.page, { backgroundColor: '#673ab7' } ]} />;
      default:
        return null;
    }
  };

  render() {
    return (
      <View>
        <TabViewAnimated
          style={styles.container}
          navigationState={this.state}
          renderScene={this._renderScene}
          renderHeader={this._renderHeader}
          onRequestChangeTab={this._handleChangeTab}
        />
      </View>

    );
  }
}


export default WebtoonPageContainer;
