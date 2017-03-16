/**
 * Created by fiddlest on 2/23/2017.
 */

//@flow;

import React from 'react';
import {
    View,
    Dimensions,
    AsyncStorage
} from 'react-native';
import {Provider, connect} from 'react-redux'
import {Actions, Scene, Router} from 'react-native-router-flux';
import {Navigator} from 'react-native'
import store from '../../store/store';

import LoginPage from '../LoginPage/LoginPage';
import WebtoonPageContainer from '../WebtoonPageContainer/WebtoonPageContainer';
import SitePage from '../SitePage/SitePage';
import ModelTest from '../ModelTest/ModelTest';
import {
    WebtoonSchema,
    EpisodeSchema,
    ToonImagesSchema,
    SchemaName
} from '../../model/realm/schema';
import Realm from 'realm';


const scenes = Actions.create(
    <Scene key="root">
        <Scene key="login" component={LoginPage} title="Login"/>
        <Scene key="test" hideNavBar={true} component={ModelTest} title="test"/>

        <Scene key="toonSite" hideNavBar={true} component={SitePage} title="Toon Site"/>
        <Scene key="webtoon" hideNavBar={true} component={WebtoonPageContainer}/>
    </Scene>
);

const ConnectedRouter = connect()(Router);

export default class App extends React.Component {

    state = {
        width: 0,
        height: 0,
        webtoonRealm: new Realm({schema: [WebtoonSchema, EpisodeSchema, ToonImagesSchema]}),
        isInitialized: false
    };

    componentWillMount() {
        const {width, height} = Dimensions.get('window');
        this.setState({
            width: width,
            height: height
        });
        this.setInitState();

    }

    setInitState = async () => {
        try {
            const isInitialized = await AsyncStorage.getItem('webtoon:initialized');
            if(isInitialized == null){
                await AsyncStorage.setItem('webtoon:initialized','false');
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
                    webtoonRealm={this.state.webtoonRealm}
                    isInitialized={this.state.isInitialized}

                />
            </Provider>

        )
    }
}
