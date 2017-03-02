/**
 * Created by fiddlest on 2/23/2017.
 */
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Dimensions,
    Button,
    Keyboard,
    NativeModules
} from 'react-native';
import React, {Component} from 'react';
import {login} from './actions';
import secret from '../../config/secret'
import {vw, vh} from '../../utils/styleHelper';

export default class Login extends Component {

    state = {
      id: '',
      pwd: ''
    };

    handleOnPress = async () => {
     /* NativeModules.ToastAndroid.show('This is a toast with short duration', NativeModules.ToastAndroid.SHORT)*/;
      if(this.state.id && this.state.pwd){
        try {
          const requestDetail = {
            method: 'POST',
            headers: {'Content-Type':'application/x-www-form-urlencoded'},
            body: JSON.stringify({
              client_id: secret.clientId,
              grant_type: 'password',
              username: this.state.id,
              password: this.state.pwd
            })
          };
          this.props.dispatch(login(requestDetail));
        } catch(err){
          console.log("error occurred", err)
        }
      }
    };


    handleIdInput = (text) => {
      if(text) this.setState({id: text})
    };

    handlePwdInput = (text) => {
      if(text) this.setState({pwd: text})
    };

    render() {
      const {width, height} = this.props;
      return (
        <View style={[styles.login, {width: width * 0.8, height: height * 0.5 }]}>
          <View style={{marginTop:40}}>
            <TextInput
              placeholder="ID"
              onChangeText={this.handleIdInput}
            />
            <TextInput
              placeholder="Password"
              onChangeText={this.handlePwdInput}
              onSubmitEditing={Keyboard.dismiss}
              secureTextEntry={true}
            />
          </View>
          <View style={styles.btnContainer}>
            <View style={styles.loginBtnContainer}>
              <Button
                title="Login"
                color={'red'}
                onPress={this.handleOnPress}
              />
            </View>
          </View>
        </View>
      )
    }
}


const styles = StyleSheet.create({
  login: {

  },
  btnContainer: {
    flex:1,
    flexDirection: 'column',
    marginTop: vh(8),
    alignItems: 'flex-end'
  },

  loginBtnContainer: {
    width: vw(30)
  }

});
