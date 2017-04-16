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
    AsyncStorage,
    ToastAndroid
} from 'react-native';
import React, {Component} from 'react';
import moment from 'moment';
import {Actions} from 'react-native-router-flux';

import WebtoonActivityIndicator from '../WebtoonActivityIndicator/WebtoonActivityIndicator';
import secret from '../../config/secret';
import dataKeys from '../../model/dataKeys';
import {vw, vh} from '../../utils/styleHelper';

export default class Login extends Component {

    state = {
      id: '',
      pwd: ''
    };

    handleOnPress = async () => {
      this.props.onPress(this.state.id, this.state.pwd);
    };



    isTokenExpired = (tokenExpiredAt) => {
      return tokenExpiredAt > moment().unix() + secret.expires_in;
    };
    componentWillUpdate(nextProps){
      const {hasToken, tokenReceivedAt, tokenDetail, error} = nextProps.login;
      if(this.props.login !== nextProps.login){
        if( hasToken && !this.isTokenExpired(tokenReceivedAt)){
          this.saveTokenDetailInDb(tokenDetail)
            .then(() => {
              setTimeout(()=>{
                if(!Actions.pop()) Actions.webtoon()
              },300);

            })
            .catch((err) => {
              console.log("error occurred on saving data", err);
            })
        }

        if(error){
          if(error.message){
            ToastAndroid.show(error.message, ToastAndroid.SHORT )
          }else {
            ToastAndroid.show(error, ToastAndroid.SHORT )
          }

        }
      }
    }

    saveTokenDetailInDb = async (tokenDetail) => {
      return AsyncStorage.setItem(dataKeys.TOKEN, JSON.stringify(tokenDetail));
    };

    handleIdInput = (text) => {
      if(text) this.setState({id: text})
    };

    handlePwdInput = (text) => {
      if(text) this.setState({pwd: text})
    };

    render() {
      const {width, height, login} = this.props;
      const {isFetching} = login;
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
                  onPress={this.handleOnPress}
                  accessibilityLabel="Press to login"
                />
            </View>
            <View style={styles.activityIndicatorContainer}>
              <WebtoonActivityIndicator
                size="large"
                color="green"
                animating={true}
                customStyle={{
                  zIndex: isFetching ? 2 : -1,
                  width: vw(30),
                  height: vw(9)
                }}
              />
            </View>
          </View>
        </View>
      )
    }
}


const styles = StyleSheet.create({

  btnContainer: {
    flex:1,
    flexDirection: 'column',
    marginTop: vh(8),
    alignItems: 'flex-end',

  },

  loginBtnContainer: {
    position:'relative',
    width: vw(30),
    zIndex: 1,
    height: 40,
  },
  activityIndicatorContainer: {
    position: 'absolute', top: 0
  }

});
