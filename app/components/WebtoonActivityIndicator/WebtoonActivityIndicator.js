/**
 * Created by fiddlest on 3/9/2017.
 */
import React, { Component } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';


class ActivityIndicator extends Component {

  type = [];
  state = {
    animating: true,
  };

  getStyleByType = (type) => {

  };

  render() {
    const {type, size, customStyle} = this.props;

    return (
      <ActivityIndicator
        animating={this.state.animating}
        style={[styles.indicatorCenter,customStyle,{}]}
        size={size}
      />
    )
  }

}

const styles = StyleSheet.create({
  indicatorCenter: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  fullCenter: {
    flex:1,
  },

});
