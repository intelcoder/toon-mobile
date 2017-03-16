/**
 * Created by fiddlest on 3/12/2017.
 * @flow
 */
'use strict';
import React, {Component} from 'react';
import {
  View,
  Text,
  ListView,
  ToolbarAndroid,
  StyleSheet
} from 'react-native';
import EpisodeBox from '../EpisodeBox/EpisodeBox';

type Props  = {
  episodes: Array<Object>,
  style?: StyleSheet.Styles;
}


const styles = StyleSheet.create({
  episodeList : {
    flex: 1,
  }
});


export default class EpisodeList extends Component {
  state:{
    episodes: []
  };
  constructor(props: Props){
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 != r2});
    this.state = {
      episodes: ds.cloneWithRows(this.props.episodes)
    }
  }
  render(){
    return (
      <View style={styles.episodeList}>
        <ListView
          dataSource={this.state.episodes}
          renderRow={(episode)=>{
            return <EpisodeBox width={332} episode={episode}/>
          }}
        />
      </View>
    )
  }
}

