/**
 * Created by fiddlest on 2/23/2017.
 */
import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native'

import Login from '../Login/Login';


export default class LoginPage extends Component {

    render() {
      return (
        <View style={[styles.loginPage, {height: this.props.height}]}>
          <Login {...this.props}/>
        </View>
      )
    }
}


const styles = StyleSheet.create({
    loginPage: {
      backgroundColor: '#4286f4',
      justifyContent: 'center',
      alignItems: 'center'
    }
});
