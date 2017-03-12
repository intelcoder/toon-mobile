/**
 * Created by fiddlest on 3/11/2017.
 */
import React, {Component, PropTypes} from 'react';
import {
  View,
  Text,
  AsyncStorage,
  Image,
  PermissionsAndroid
} from 'react-native';
import toonList from '../../model/mockDataNaverList';
import Model, {getByFilter} from '../../model/model';
import RNFetchBlob from 'react-native-fetch-blob'
import Promise from 'bluebird';
import Realm from 'realm';
import moment from 'moment';

export default class ModelTest extends Component {

  componentDidMount() {
    this.requestReadPermission();
    this.requestWritePermission();

  }

  test = async ()=> {
    let dirs = RNFetchBlob.fs.dirs;
    const result = toonList.map((toon) => {
       return RNFetchBlob
        .config({
          path : dirs.DocumentDir + '/naver/'+toon.toon_id + '.jpg',
          appendExt : 'jpg',
        })
        .fetch('GET', toon.thumbnail_url, {
        })
        .then((res) => {
          toon.thumbnail_url = res.path();
          return toon;
        })
    });
    Promise.all(result)
      .then((re)=>{
        console.log("done",JSON.stringify(re))
      })
  };


  requestReadPermission = async() => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          'title': 'Cool Photo App Camera Permission',
          'message': 'Cool Photo App needs access to your camera ' +
          'so you can take awesome pictures.'
        }
      )
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use the READ_EXTERNAL_STORAGE")
      } else {
        console.log("Camera permission denied")
      }
    } catch (err) {
      console.warn(err)
    }
  }
  requestWritePermission = async() => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          'title': 'Cool Photo App Camera Permission',
          'message': 'Cool Photo App needs access to your camera ' +
          'so you can take awesome pictures.'
        }
      )
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use the WRITE_EXTERNAL_STORAGE")
      } else {
        console.log("Camera permission denied")
      }
    } catch (err) {
      console.warn(err)
    }
  }
  render() {
    return (
      <View style={{flex:1, backgroundColor:'blue'}}>



      </View>
    )
  }
}
