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
import fetchIfNeeded from '../../actions/fetchActions';
import EpisodeList from '../EpisodeList/EpisodeList';

import secret from '../../config/secret';

type Props = {
  toonId: string
}

class EpisodePage extends Component {

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
       if(this.props.toonId !== nextProps.toonId) this.fetchEpisode(nextProps);
  }
  getContents = () => {
    const {fetchResult, width, height} = this.props;
    if(fetchResult.data.episodes && fetchResult.data.episodes.length) {
      return (
        <EpisodeList
          width={width}
          height={height}
          episodes={fetchResult.data.episodes}
        />
      )
    }
  };

  render() {
    return (
      <View style={{flex: 1}}>
        {
          this.getContents()
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