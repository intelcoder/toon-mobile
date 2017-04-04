/**
 * Created by fiddlest on 2/23/2017.
 */

//@flow;

import React from 'react';
import {
    View,
    Dimensions,
    AsyncStorage,
    PermissionsAndroid
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

const scenes = Actions.create(
    <Scene key="root">
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
const requestReadPermission = async() => {
    try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          {
              'title': 'Cool Photo App Camera Permission',
              'message': 'Cool Photo App needs access to your camera ' +
              'so you can take awesome pictures.'
          }
        )
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log("You can use the READ_EXTERNAL_STORAGE")
        } else {
            console.log("Camera permission denied")
        }
    } catch (err) {
        console.warn(err)
    }
};
const requestWritePermission = async() => {
    try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
              'title': 'Cool Photo App Camera Permission',
              'message': 'Cool Photo App needs access to your camera ' +
              'so you can take awesome pictures.'
          }
        )
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log("You can use the WRITE_EXTERNAL_STORAGE")
        } else {
            console.log("Camera permission denied")
        }
    } catch (err) {
        console.warn(err)
    }
};

export default class App extends React.Component {

    state = {
        width: 0,
        height: 0,
        isInitialized: false,
        tokenDetail: {}
    };

    updateInitializedState = (initialized :bool) => {
        if(initialized !== null){
            AsyncStorage.setItem(INIT_STATE_KEY, initialized.toString())
              .then(()=>{
                  this.setState({
                      isInitialized: initialized
                  })
              });
        }
    };

    componentWillMount() {
        const {width, height} = Dimensions.get('window');
        this.setState({
            width: width,
            height: height
        });
        this.setInitState();
    }
    componentDidMount() {
        requestReadPermission();
        requestWritePermission();

    }

    validateApiToken = async () => {
        const tokenInfo = await AsyncStorage.getItem(dataKeys.TOKEN);
        const tokenDetail = JSON.parse(tokenInfo);
        if(tokenDetail && tokenDetail.hasToken){
            this.setState({
                tokenDetail: tokenDetail
            })
        }
    };

    setInitState = async (initState = null) => {
        try {
            const isInitialized = await AsyncStorage.getItem(INIT_STATE_KEY);
            if(isInitialized == null){
                await AsyncStorage.setItem(INIT_STATE_KEY,'false');
            }else {
                this.setState({
                    isInitialized: isInitialized === 'true'
                })
            }
        }catch (error){
            console.log("test",error)
        }
    };

    render() {
        return (
            <Provider store={store}>
                <ConnectedRouter
                    scenes={scenes}
                    width={this.state.width}
                    height={this.state.height}
                    isInitialized={this.state.isInitialized}
                    updateInitializedState={this.updateInitializedState}

                />
            </Provider>

        )
    }
}
