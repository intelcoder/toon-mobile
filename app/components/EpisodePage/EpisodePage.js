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
import {Actions, ActionConst} from 'react-native-router-flux'
import difference from 'lodash.difference';

import fetchIfNeeded from '../../actions/fetchActions';
import EpisodeList from '../EpisodeList/EpisodeList';

import secret from '../../config/secret';
import Model from '../../model/model';
import {isTokenValid} from '../../utils'
import {saveEpisodeImage} from '../../utils/saveImage';
import {extractValueFromObjArray} from '../../utils';

/*
* if last uploaded time is diff save
* */

class EpisodePage extends Component {

  state = {
    episodeList: []
  };

  //site:pk:ep - list of episode
  componentDidMount(){
    this.onLoad();
  }




  onLoad = async () => {
    const {site, toonId, isConnected, login} = this.props;
    const model = Model();
    const key = [site, toonId, 'ep'].join(':');
    const episodeKeys = await model.getByKey(key);
    //If no result, connected , move to login
    if (isConnected && !isTokenValid(login)) {
      Actions.login({type: ActionConst.REPLACE});
    } else if (isConnected && isTokenValid(login)) {
      this.fetchEpisode(this.props)
    } else if (!isConnected && !episodeKeys) {
      //show empty record page
    } else {
      try {
        this.loadEpisodesFromDb(episodeKeys);
      }catch(e){
        console.log('onLoad/loading local data error ', e);
      }
    }
  };

  loadEpisodesFromDb = async (episodeKeys) => {
    const pEpidoes = episodeKeys.reduce((acc, key) => {
      const episodeKey = [site, toonId, 'ep', key].join(':');
      const model = Model();
      acc.push(model.getByKey(episodeKey));
      return acc;
    });

    const episodeList = await promise.all(pEpidoes);
    this.setState({
      episodeList: episodeList
    })
  };

  fetchEpisode = ({dispatch, toonId, login}) => {
    const fetchDetail = {
      method: 'GET',
      headers: {
        Authorization: login.tokenDetail.token_type.toLowerCase() + ' ' + login.tokenDetail.access_token
      }
    };
    dispatch(fetchIfNeeded(secret.baseUrl + `${toonId}/episode/`, fetchDetail ))
  };


  componentWillReceiveProps(nextProps, nextState) {
    const {episodes, webtoon} = nextProps.fetchResult.data;

    if (this.props.toonId !== nextProps.toonId) this.fetchEpisode(nextProps);
    if (episodes && episodes.length){
      //if it is favorite save
      if(webtoon.favorite === true) {
        try {
          this.saveEpisodes(nextProps, episodes);
        } catch(e){
          console.log("error occurred saveEpisodes", e)
        }
      }
      this.getContents(episodes);
    }
  }

  saveEpisodes = async ({site, toonId}, episodes) => {
    const model = Model();
    const episodeKeys = [site, toonId, 'ep'].join(':');

    let currentEpisodeKeys = await model.getByKey(episodeKeys);
    //Save list of no in episodes to use as key later
    const noList = extractValueFromObjArray(episodes, 'no');
    model.save(episodeKeys, noList);
    //compare current keys and new keys. Then, get only non exist episde in currnent and save it

    //Check if there are new episodes and if so add episode to the db
    const diff = difference(noList, currentEpisodeKeys);
    const newEpisodes = episodes.filter((episode)=> {
      if (diff.indexOf(episode.no) > -1) return episode;
    });

    //Save each episode infomation with image;
    const listofPromies = newEpisodes.reduce((promises, episode)=> {
      promises.push(saveEpisodeImage(toonId, episode));
      return promises;
    },[]);

    //save episode with saved image path
    const listOfEpisode = await Promise.all(listofPromies);
    listOfEpisode.forEach(episode => {
      const episodeKey = [site, toonId, 'ep', episode.no].join(':');
      model.save(episodeKey, episode);
    });
  };

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
          this.state.episodeList.length > 0 ? (
            <EpisodeList
              width={width}
              height={height}
              episodes={this.state.episodeList}
              handleClick={this.handleClick}
            />
          ) : <Text>No item</Text>
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