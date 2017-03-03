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

} from 'react-native';
import React, {Component} from 'react';
import moment from 'moment';
import {Actions} from 'react-native-router-flux';

import secret from '../../config/secret';
import {vw, vh} from '../../utils/styleHelper';

export default class Login extends Component {

    state = {
      id: 'fiddlesticks',
      pwd: 'Tjdwns!@3'
    };

    handleOnPress = async () => {
      this.props.onPress(this.state.id, this.state.pwd);
    };

    isTokenExpired = (tokenExpiredAt) => {
      return tokenExpiredAt > moment().unix() + secret.expires_in;
    };
    componentWillUpdate(nextProps){
      const {hasToken, tokenReceivedAt} = nextProps.login;
      if(hasToken && !this.isTokenExpired(tokenReceivedAt)){
        Actions.webtoon()
      }
    }

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
