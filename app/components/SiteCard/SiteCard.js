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


const styles = StyleSheet.create({
  siteCard: {
    justifyContent: 'center',
    alignItems: 'center',
  },

});


export default class SiteCard extends Component {
  constructor(props){
    super(props);

    const {index} = this.props;
    this.state = {
      slide: new Animated.ValueXY({x:0, y: 200}),
      fade: new Animated.Value(0)
    };
    this.slideIn = Animated.timing(
      this.state.slide,
      {
        toValue: {x: 0, y: 0},
        duration: 500,
        delay: index * 100,
        easing: Easing.in(Easing.ease)
      }
    );
    this.fade = Animated.timing(
      this.state.fade,
      {
        toValue: 1,
        duration: 550,
        delay: index * 100,
      }
    );
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
    const {site, backgroundColor, textColor, width, height, margin} = this.props;
    return (
      <Animated.View style={[
        styles.siteCard,
        {
          transform: this.state.slide.getTranslateTransform(),
          opacity: this.state.fade,
          margin:margin,
          backgroundColor: backgroundColor,
          width: width,
          height: height
        }]}>
        <Text style={{color: textColor, textAlign:'center'}}>{site}</Text>
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



