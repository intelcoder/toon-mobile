/**
 * Created by fiddlest on 3/4/2017.
 */
import React, {Component, PropTypes} from 'react';

import {Actions} from 'react-native-router-flux';
import {
  View,
  Text,
  StyleSheet,
  ListView
} from 'react-native';

import SiteCard from '../SiteCard/SiteCard';
import siteModel from '../../model/siteModel';

const styles = StyleSheet.create({
  sitePage: {
    flex:1,
    flexDirection: 'row',
    flexWrap: 'wrap'
  }
});

export default class SitePage extends Component{

  constructor() {
    super();
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(Object.keys(siteModel)),
    };
  }

  handleOnPress = (site) => {
    Actions.webtoon({site: site})
  };

  render() {
    const {width} = this.props;
    const third = Math.floor((width /3.3));
    const margin = (width - (third * 3)) / 6;
    return (
      <ListView contentContainerStyle={styles.sitePage}
                dataSource={this.state.dataSource}
                renderRow={(site, secId, rowId) =>
                  <SiteCard index={rowId}
                            margin={margin}
                            site={siteModel[site].site}
                            backgroundColor={siteModel[site].backgroundColor}
                            width={third}
                            height={third}
                            handleOnPress={this.handleOnPress}
                  />
                }
      />
    )
  }
}
