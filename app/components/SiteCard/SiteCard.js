/**
 * Created by fiddlest on 3/4/2017.
 */

import React, {Component, PropTypes} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Easing
} from 'react-native';

import {flexCenter} from '../../utils/styleHelper';

const style = StyleSheet.create({
  siteCard: flexCenter()
});

export default class SiteCard extends Component {
  constructor(props){
    super(props);
    this.slideIn = Animated.timing(
      this.state.slide,
      {
        toValue: {x: 0, y: 0},
        duration: 2000,
        delay: 1000,
        easing: Easing.in(Easing.ease)
      }
    );
    this.fade = Animated.timing(
      this.state.fade,
      {
        toValue: 1,
        duration: 2000,
        delay: 1000,
      }
    );
    this.state = {
      slide: new Animated.ValueXY({x:0, y: 200}),
      fade: new Animated.Value(0)
    }
  }

  componentDidMount(){
    this.animateIn();
  }

  animateIn = () =>{
    Animated.parallel([
      this.slideIn,
      this.fade
    ]).start();
  };

  render() {
    const {site, backgroundColor, textColor, width, height} = this.props;
    return (
      <Animated.View style={[
        style.siteCard,
        {
          transform: this.state.slide.getTransactionWrappers(),
          backgroundColor: backgroundColor,
          opacity: this.state.fade,
          width: width,
          height: height
        }]}>
        <Text style={{textColor}}>{site}</Text>
      </Animated.View>
    );
  }
}

SiteCard.propTypes = {
  site: PropTypes.string,
  backgroundColor: PropTypes.string,
  textColor: PropTypes.string,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired
};

SiteCard.defaultProps = {
  site: 'null',
  backgroundColor: 'white',
  textColor: 'black'
};



