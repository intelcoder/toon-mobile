/**
 * Created by fiddlest on 3/2/2017.
 */
import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  ToolbarAndroid,
  AsyncStorage
} from 'react-native';
import {TabViewAnimated, TabBar} from 'react-native-tab-view';
import {Actions} from 'react-native-router-flux';
import ToonGird from '../ToonGrid/ToonGrid';
import siteModel from '../../model/siteModel';
import {weekdays} from '../../utils/index';
import initializeWrapper from '../InitializeWrapper/InitializeWrapper'
import Model from '../../model/model';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  page: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const toolbarActions = [
  {title: 'Naver'},
  {title: 'Daum'},
];


class WebtoonPager extends Component {
  state = {
    index: 0,
    routes: [
      {key: '1', title: '월'},
      {key: '2', title: '화'},
      {key: '3', title: '수'},
      {key: '4', title: '목'},
      {key: '5', title: '금'},
      {key: '6', title: '토'},
      {key: '7', title: '일'},
    ],
    site: this.props.site,
    webtoonList: [],
    toolbarActions: []
  };

  _onActionSelected  = (position) => {
    const site = this.state.toolbarActions[position].title.toLowerCase();
    this.setActions(site);
    this.updateWebtoonList(site)
  };

  updateWebtoonList = async (site) => {
    const model = Model();
    const webtoonList = await model.getByKey(site);

    this.setState({
      site: site,
      webtoonList: webtoonList
    })
  };

  _handleChangeTab = (index) => {
    this.setState({index});
  };

  _renderHeader = (props) => {
    return <TabBar {...props} />;
  };

  _renderScene = ({webtoonList}, {width, isFetching}) => {

    return ({index})=>{
      return <ToonGird
        index={index}
        webtoonList={webtoonList.filter(webtoon => webtoon.weekday == weekdays[index])}
        width={width}
        isFetching={isFetching}
        handleCardClick={this.handleCardClick}
      />
    }
  };
  shouldComponentUpdate(nextProps, nextState) {
    const {webtoonList, site, toolbarActions} = this.state;
    if( webtoonList !== nextState.webtoonList || site !== nextState.site || toolbarActions !== nextState.toolbarActions){
      return true;
    }
    return false;
  }

  componentDidMount() {
    this.setActions(this.state.site);
    this.updateWebtoonList(this.props.site)
  }

  handleCardClick = (toonId): void => {
    if(toonId) Actions.episode({toonId: toonId});
  };

  setActions = (site) => {
    const actions = toolbarActions.filter((action) => {
      if(site !== action.title.toLowerCase())
        return action;
    });
    this.setState({
      toolbarActions: actions
    })
  };

  render() {

    const site = this.state.site;
    return (
      <View style={{flex:1}}>
        <ToolbarAndroid
          title={site.toUpperCase()}
          style={{
            height: 56,
            backgroundColor: siteModel[site.toLowerCase()].backgroundColor,
          }}
          onActionSelected={this._onActionSelected}
          titleColor='white'
          subtitleColor='white'
          actions={this.state.toolbarActions}
        />
        {
          this.state.webtoonList.length > 0 && <TabViewAnimated
            style={styles.container}
            navigationState={this.state}
            renderScene={this._renderScene(this.state,this.props)}
            renderHeader={this._renderHeader}
            onRequestChangeTab={this._handleChangeTab}
          />
        }

      </View>
    );
  }
}

WebtoonPager.defaultProps = {
  site: 'naver'
};
export default initializeWrapper(WebtoonPager);
