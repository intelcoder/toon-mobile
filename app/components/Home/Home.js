/**
 * Created by fiddlest on 4/5/2017.
 */
import React, {Component} from 'react';
import {
  View,
Text,
  Alert
} from 'react-native';

import LoginPage from '../LoginPage/LoginPage';
import WebtoonPage from '../WebtoonPager/WebtoonPager';

export default class Home extends Component {

  componentWillMount() {

  }

  componentDidMount() {

  }
  getContents = () => {
    const {isInitialized, isConnected} = this.props;
    console.log(isConnected, isInitialized)
    if(isInitialized) {
      return <WebtoonPage {...this.props}/>;
    }else if( !isInitialized && isConnected) {
      return <LoginPage {...this.props}/>;
    }else {
      Alert.alert(
        'Requires network connectivity',
        'App requires internet connection for init',
        [
          {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
          {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        { cancelable: false }
      );
    }
  };


  render() {
    return (
      <View style={{flex:1}}>
        {

          this.getContents()
        }
      </View>
    )
  }
}


