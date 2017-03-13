/**
 * Created by fiddlest on 3/12/2017.
 */
import React, {Component, PropTypes} from 'react';
import {
  View,
  Text,
  ListView,
  ToolbarAndroid,
  StyleSheet
} from 'react-native';
import EpisodeBox from '../EpisodeBox/EpisodeBox';

export default class EpisodeList extends Component {

  constructor(props){
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
            return <EpisodeBox episode={episode}/>
          }}
        />
      </View>
    )
  }
}


const styles = StyleSheet.create({
  episodeList : {
    flex: 1,
  }
});
