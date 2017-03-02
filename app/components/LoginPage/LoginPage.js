/**
 * Created by fiddlest on 2/23/2017.
 */
import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native'

import {connect} from 'react-redux';
import Login from '../Login/Login';


class LoginPage extends Component {
    render() {
      console.log("LoginPage",this.props)
      return (
        <View style={[styles.loginPage, {height: this.props.height}]}>
          <Login {...this.props} login ={this.props.login} />
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

function mapStateToProps(state) {
  return {
    login: state.loginReducer
  }
}



export default connect(mapStateToProps)(LoginPage)
