/**
 * Created by fiddlest on 3/6/2017.
 */
import React, {Component, PropTypes} from 'react';
import {
  TouchableHighlight,
  Text,
} from 'react-native';


export default ({handleOnPress, text, btnStyle}) => {
  return (
    <TouchableHighlight style={btnStyle} onPress={handleOnPress}>
      <Text>{text}</Text>
    </TouchableHighlight>
  )
}

