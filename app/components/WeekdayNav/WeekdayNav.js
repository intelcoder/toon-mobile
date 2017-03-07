/**
 * Created by fiddlest on 3/6/2017.
 */
import React, {Component} from 'react';
import {
  View,
  Text,
  ListView
} from 'react-native';
import {weekdayNavList} from '../../model/data';

import NavButton from '../NavButton/NavButton';

export default class WeekdayNav extends Component {

  constructor(props){
    super(props);
    const ds = new ListView.dataSource({rowHasChanged : (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(weekdayNavList)
    }
  }

  render(){
    const {handleOnPress, btnStyle} = this.props;
    return(
      <ListView
        horizontal={true}
        style={{flex:1}}
        dataSource={this.state.dataSource}
        renderRow={(weekday)=>{
          return <NavButton
            handleOnPress={handleOnPress}
            btnStyle={btnStyle}
            text={weekday}
          />
        }}
      />

    )
  }
}
