/**
 * Created by fiddlest on 3/22/2017.
 */
import React, {Component} from 'react';

import {
  View,
  Text,
  Image,
  ScrollView,
  ListView
} from 'react-native';

export default class WebtoonView extends Component {

  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2)=> r1 != r2});
    this.state = {
      dataSource: this.ds.cloneWithRows(this.getContents())
    }
  }

  getContents = () => {
    const {toonImageList} = this.props;
    return toonImageList.map((toonImage, index)=> {
      return (
        <Image
          key={toonImage.order + index}
          resizeMode={Image.resizeMode.contain}
          source={{uri: 'file://' + toonImage.image_url, width: 384, height: 690}}
        />
      )
    })
  };

  render() {
    return (
      <View style={{flex:1}}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(d)=>d}
        />
      </View>
    )
  }
}