/**
 * Created by fiddlest on 3/4/2017.
 */


import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet
} from 'react-native';

export default class ToonCard extends Component {

  render() {
    const {src, title, width, height} = this.props;
    return (
      <View style={{width: width, height: height}}>
        <Image source={{uri: src}}/>
        <View>
          <Text>{title}</Text>
        </View>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  cardContainer: {
    flex:1,
  },
  cardImage: {
    flex:0.8,
    resizeMode: 'cover'
  },
  textContainer: {
    flex:0.2
  }
});
