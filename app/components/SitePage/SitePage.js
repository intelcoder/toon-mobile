/**
 * Created by fiddlest on 3/4/2017.
 */
import React, {Component, PropTypes} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ListView
} from 'react-native';

import SiteCard from '../SiteCard/SiteCard';

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
      dataSource: ds.cloneWithRows( ['green', 'red','pink', 'green', 'red','pink','green', 'red']),
    };
  }

  render() {
    const {width, height} = this.props;
    const third = Math.floor((width /3.3));
    const margin = (width - (third * 3)) / 6;
    return (
      <ListView contentContainerStyle={styles.sitePage}
                dataSource={this.state.dataSource}
                renderRow={(rowData, secId, rowId) =>
                  <SiteCard index={rowId}
                            margin={margin}
                            backgroundColor={rowData}
                            width={third}
                            height={third} />

                }
      />
    )
  }
}
