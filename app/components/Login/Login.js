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
    Keyboard
} from 'react-native';
import React, {Component} from 'react';
import {vw, vh} from '../../utils/styleHelper';

export default class Login extends Component {

    state = {
      id: '',
      pwd: ''
    };

    handleOnPress = async () => {
      if(this.state.id && this.state.pwd){
        try {
          let response = await fetch('http://192.168.2.39:9966/o/token/', {
            method: 'POST',
            headers: {'Content-Type':'application/x-www-form-urlencoded'},
            body: JSON.stringify({
              client_id: '',
              grant_type: 'password',
              username: this.state.id,
              password: this.state.pwd
            })
          });
          const responseJson = await response.json();
          console.log(responseJson)

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
        <View style={{width: width * 0.8,height: height * 0.5 }}>
          <View>
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
              />
            </View>
          </View>
        </View>
      )
    }
}


const styles = StyleSheet.create({
  inputContainer: {
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
