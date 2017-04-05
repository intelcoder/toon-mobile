/**
 * Created by fiddlest on 3/19/2017.
 */
import React, {Component} from 'react';
import {
  View,
  Text,
  ListView,
  ToolbarAndroid,
  StyleSheet
} from 'react-native';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux'

import fetchIfNeeded from '../../actions/fetchActions';
import EpisodeList from '../EpisodeList/EpisodeList';

import secret from '../../config/secret';

type Props = {
  toonId: string
}

class EpisodePage extends Component {

  state = {
    episodeList: []
  };

  componentDidMount(){
    this.fetchEpisode(this.props);
  }

  fetchEpisode = ({dispatch, toonId, login}) => {
    const fetchDetail = {
      method: 'GET',
      headers: {
        Authorization: login.tokenDetail.token_type.toLowerCase() + ' ' + login.tokenDetail.access_token
      }
    };
    dispatch(fetchIfNeeded(secret.baseUrl + `${toonId}/episode/`, fetchDetail ))
  };

  componentWillReceiveProps(nextProps){
    const {fetchResult} = nextProps;
    const episodes = fetchResult.data.episodes;
       if(this.props.toonId !== nextProps.toonId) this.fetchEpisode(nextProps);
       if(episodes  && episodes.length) this.getContents(episodes)
  }
  handleClick = (episode) => {
    return () => {
      const {toonId} = this.props;
      Actions.toonImages({
        episodeNo: episode.no,
        toonId: toonId
      })
    };
  };

  getContents = (episodes) => {
      this.setState({
        episodeList: episodes
      });
  };

  render() {
    const {width, height} = this.props;
    return (
      <View style={{flex: 1}}>
        {
          this.state.episodeList.length > 0 && (
            <EpisodeList
              width={width}
              height={height}
              episodes={this.state.episodeList}
              handleClick={this.handleClick}
            />
          )
        }
      </View>
    )
  }
}

const mapStateToProps = (state) :object => {
  const {loginReducer, fetchReducer} = state;
  return {
    login: loginReducer,
    fetchResult: fetchReducer
  }
};

export default connect(mapStateToProps)(EpisodePage);