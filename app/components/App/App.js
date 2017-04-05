/**
 * Created by fiddlest on 2/23/2017.
 */

//@flow;

import React from 'react';
import {
  View,
  Dimensions,
  AsyncStorage,
  NetInfo
} from 'react-native';
import {Provider, connect} from 'react-redux'
import {Actions, Scene, Router} from 'react-native-router-flux';
import {Navigator} from 'react-native'

import store from '../../store/store';
import LoginPage from '../LoginPage/LoginPage';
import WebtoonPager from '../WebtoonPager/WebtoonPager';
import SitePage from '../SitePage/SitePage';
import EpisodePage from '../EpisodePage/EpisodePage';
import WebtoonImageListPage from '../WebtoonImageListPage/WebtoonImageListPage';

import ModelTest from '../ModelTest/ModelTest';
import dataKeys from '../../model/dataKeys'
import {netState} from '../../model/data';
import {requestReadPermission, requestWritePermission} from '../../utils/permissionRequest';
import Home from '../Home/Home';

const scenes = Actions.create(
  <Scene key="root">
    <Scene key="home" component={Home} hideNavBar={true} title="Home"/>
    <Scene key="login" component={LoginPage} title="Login"/>
    <Scene key="webtoon" hideNavBar={true} component={WebtoonPager}/>
    <Scene key="episode" hideNavBar={true} component={EpisodePage}/>
    <Scene key="test" hideNavBar={true} component={ModelTest} title="test"/>
    <Scene key="toonSite" hideNavBar={true} component={SitePage} title="Toon Site"/>
    <Scene key="toonImages" hideNavBar={true} component={WebtoonImageListPage} title="Toon"/>
  </Scene>
);

const INIT_STATE_KEY = 'webtoon:initialized';
const ConnectedRouter = connect()(Router);



export default class App extends React.Component {

  state = {
    width: 0,
    height: 0,
    isInitialized: null,
    tokenDetail: {},
    isConnected: null,
  };

  componentDidMount() {
    requestReadPermission();
    requestWritePermission();
    this.initNetState();
    this.setInitState();
  }

  componentWillMount() {
    const {width, height} = Dimensions.get('window');
    this.setState({
      width: width,
      height: height
    });

  }

  updateInitializedState = (initialized:bool) => {
    if (initialized !== null) {
      AsyncStorage.setItem(INIT_STATE_KEY, initialized.toString())
        .then(()=> {
          this.setState({
            isInitialized: initialized
          })
        });
    }
  };

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener(
      'change',
      this.handleFirstConnectivityChange
    );
  }


  handleFirstConnectivityChange = (isConnected) => {
    this.setState({
      isConnected: isConnected
    })
  };


  initNetState = () => {
    NetInfo.isConnected.fetch().then(isConnected => {
      this.setState({
        isConnected: isConnected
      })
    });
    NetInfo.isConnected.addEventListener(
      'change',
      this.handleFirstConnectivityChange
    );
  };

  validateApiToken = async() => {
    const tokenInfo = await AsyncStorage.getItem(dataKeys.TOKEN);
    const tokenDetail = JSON.parse(tokenInfo);
    if (tokenDetail && tokenDetail.hasToken) {
      this.setState({
        tokenDetail: tokenDetail
      })
    }
  };

  setInitState = async(initState = null) => {
    try {
      const isInitialized = await AsyncStorage.getItem(INIT_STATE_KEY);
      if (isInitialized == null) {
        await AsyncStorage.setItem(INIT_STATE_KEY, 'false');
      } else {
        this.setState({
          isInitialized: isInitialized === 'true'
        })
      }
    } catch (error) {
      console.log("test", error)
    }
  };
  getContents = () => {
    const {isInitialized, isConnected} = this.state;
    const show = isConnected !==null && isInitialized !== null;
    if(show){
      return (
        <Provider store={store}>
          <ConnectedRouter
            scenes={scenes}
            width={this.state.width}
            height={this.state.height}
            isInitialized={this.state.isInitialized}
            isConnected={this.state.isConnected}
            updateInitializedState={this.updateInitializedState}
          />
        </Provider>
      )
    }else {
      return <View style={{backgroundColor:'black'}}></View>
    }
  };

  render() {
    return (
      <View style={{flex:1}}>
        {

          this.getContents()
        }
      </View>
    )
  }
}
