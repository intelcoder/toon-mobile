/**
 * Created by fiddlest on 3/6/2017.
 */

import React, {Component, PropTypes} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ListView
} from 'react-native';

import ToonCard from '../ToonCard/ToonCard';
import mockNaverList from '../../model/mockDataNaverList';

export default class ToonGrid extends Component {

  constructor(props){
    super(props);
    const ds = new ListView.DataSource({rowHasChanged : (r1, r2) => r1!=r2});
    this.state = {
      dataSource: ds.cloneWithRows(this.props.webtoonList)
    }
  }

  componentWillUpdate(nextProps){
    if(this.props.webtoonList !== nextProps.webtoonList){
      const ds = new ListView.DataSource({rowHasChanged : (r1, r2) => r1!=r2});
      this.setState({
        dataSource: ds.cloneWithRows(nextProps.webtoonList)
      })
    }
  }

  render() {
    const {width,webtoonList} = this.props;
    return (
      <View>
        {
          webtoonList.length > 0 &&
          <ListView
            contentContainerStyle={{
              flexDirection: 'row',
              flexWrap: 'wrap'}}
            renderRow={(data)=>
              <ToonCard
                src={data.thumbnail_url}
                title={data.title}
                rating={data.rating}
                author={data.author}
                width={width/3}
                height={width/3}
              />
            }
            dataSource={this.state.dataSource}
          />
        }

      </View>

    )
  }
}

/*
ToonGrid.propTypes = {
  toonList: PropTypes.array.isRequired,
  width: PropTypes.number.isRequired
};*/
