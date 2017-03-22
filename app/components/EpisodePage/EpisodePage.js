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

import {urlTypes} from '../../model/data'
import {createRequestUrl} from '../../utils/index';
import fetchIfNeeded from '../../actions/fetchActions';

import secret from '../../config/secret';

class EpisodePage extends Component {

  componentDidMount(){
    const {dispatch, toonId,login} = this.props;
    const fetchDetail = {
      method: 'GET',
      headers: {
        Authorization: login.tokenDetail.token_type.toLowerCase() + ' ' + login.tokenDetail.access_token
      }
    };
    dispatch(fetchIfNeeded(secret.baseUrl + `${toonId}/episode/`, fetchDetail ))

  }

  render() {
    return (
      <View>
        <Text>This is Episode Page {this.props.toonId}</Text>
      </View>
    )
  }
}

const mapStateToProps = (state) :object => {
  const {loginReducer} = state;
  return {
    login: loginReducer
  }
};

export default connect(mapStateToProps)(EpisodePage);