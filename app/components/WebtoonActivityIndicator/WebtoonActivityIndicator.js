/**
 * Created by fiddlest on 3/9/2017.
 */
import React, { Component } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';


export default class WebtoonActivityIndicator extends Component {

  type = [];
  state = {
    animating: false,
  };


  render() {
    const {type, size, customStyle, color, animating} = this.props;
    return (
      <ActivityIndicator
        animating={animating}
        style={[styles.indicatorCenter,customStyle]}
        size={size}
        color={color}
      />
    )
  }
}

const styles = StyleSheet.create({
  indicatorCenter: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullCenter: {
    flex:1,
  },
});

WebtoonActivityIndicator.defaultProps = {
  customStyle: {},
  size: 'small',
  color: ''

};
