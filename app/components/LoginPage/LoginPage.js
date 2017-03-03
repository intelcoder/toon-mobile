/**
 * Created by fiddlest on 2/23/2017.
 */
import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    NativeModules
} from 'react-native'
import {login} from '../Login/actions';
import secret from '../../config/secret'
import {connect} from 'react-redux';
import Login from '../Login/Login';


class LoginPage extends Component {

  handleOnPress = async (id, pwd) => {
      if(id && pwd){
        try {
          const requestDetail = {
            method: 'POST',
            headers: {'Content-Type':'application/x-www-form-urlencoded'},
            body: JSON.stringify({
              client_id: secret.clientId,
              grant_type: 'password',
              username: id,
              password: pwd
            })
          };
          this.props.dispatch(login(requestDetail));
        } catch(err){
          console.log("error occurred", err)
        }
      }else{
        NativeModules.ToastAndroid.show('ID and password is required field', NativeModules.ToastAndroid.SHORT);
      }
    };

    render() {
      return (
        <View style={[styles.loginPage, {height: this.props.height}]}>
          <Login {...this.props} login ={this.props.login} onPress={this.handleOnPress}/>
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
