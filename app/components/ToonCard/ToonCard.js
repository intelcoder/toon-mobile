/**
 * Created by fiddlest on 3/4/2017.
 */

//@flow

import React, {Component, PropTypes} from 'react';
import {View, Text, Image, StyleSheet,TouchableOpacity } from 'react-native';

export default class ToonCard extends Component {

  render() {
    const {toon_id, src, rating, author, title, width, height, handleCardClick} = this.props;
    return (

        <TouchableOpacity onPress={()=> handleCardClick(toon_id)}  style={[styles.cardContainer,{width: width, height: height * 1.2}]}>
          <View style={styles.imageContainer}>
            <Image style={styles.cardImage} source={{uri: "file://" +  src}} accessibilityLabel={title + ' 사진'} />
          </View>

          <View style={styles.textContainer}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.rating}>{rating}</Text>
            <Text style={styles.author}>{author}</Text>
          </View>
        </TouchableOpacity>
    )
  }
}

ToonCard.propTypes = {
  src: PropTypes.string.isRequired,
  rating: PropTypes.number,
  title: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired
};


const styles = StyleSheet.create({
  cardContainer: {

  },
  imageContainer: {flex:1},
  cardImage: {
    flex:1,
    resizeMode: 'stretch',
  },
  textContainer: {
    backgroundColor: '#f7f8f9',
    paddingBottom: 5
  },
  title: {
    marginTop: 3,
    fontWeight: 'bold',
  },
  rating: {
    color: 'red'
  },
  author: {
    color: '#666666'
  }
});
