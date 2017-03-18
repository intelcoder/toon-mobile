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
import Realm from 'realm';

import store from '../../store/store';
import LoginPage from '../LoginPage/LoginPage';
import WebtoonPager from '../WebtoonPager/WebtoonPager';
import SitePage from '../SitePage/SitePage';
import ModelTest from '../ModelTest/ModelTest';
import {
    WebtoonSchema,
    EpisodeSchema,
    ToonImagesSchema,
} from '../../model/realm/schema';

const scenes = Actions.create(
    <Scene key="root">
        <Scene key="login" component={LoginPage} title="Login"/>
        <Scene key="webtoon" hideNavBar={true} component={WebtoonPager}/>
        <Scene key="test" hideNavBar={true} component={ModelTest} title="test"/>
        <Scene key="toonSite" hideNavBar={true} component={SitePage} title="Toon Site"/>
    </Scene>
);

const INIT_STATE_KEY = 'webtoon:initialized';

const ConnectedRouter = connect()(Router);

export default class App extends React.Component {

    state = {
        width: 0,
        height: 0,
        webtoonRealm: new Realm({schema: [WebtoonSchema, EpisodeSchema, ToonImagesSchema], schemaVersion:3}),
        isInitialized: false
    };

    updateInitializedState = async (initialized :bool) => {
        if(initialized !== null){
            console.log("test",initialized.toString() )
            await AsyncStorage.setItem(INIT_STATE_KEY, initialized.toString());
            return this.setState({
                isInitialized: initialized
            })
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
                    webtoonRealm={this.state.webtoonRealm}
                    isInitialized={this.state.isInitialized}
                    updateInitializedState={this.updateInitializedState}

                />
            </Provider>

        )
    }
}
