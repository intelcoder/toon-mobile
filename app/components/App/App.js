/**
 * Created by fiddlest on 2/23/2017.
 */

//@flow;

import React from 'react';
import {
    View,
    Dimensions
} from 'react-native';
import { Provider, connect } from 'react-redux'
import {Actions, Scene, Router} from 'react-native-router-flux';
import {Navigator} from 'react-native'
import store from '../../store/store';

import LoginPage from '../LoginPage/LoginPage';
import WebtoonPageContainer from '../WebtoonPageContainer/WebtoonPageContainer';
import SitePage from '../SitePage/SitePage';
import ToonGrid from '../ToonGrid/ToonGrid';

const scenes = Actions.create(
    <Scene key="root">
        <Scene key="webtoon"  hideNavBar={true} component={WebtoonPageContainer}/>
        <Scene key="toonGrid"  hideNavBar={true} component={ToonGrid} title="Toon grid"/>
        <Scene key="toonSite"  hideNavBar={true} component={SitePage} title="Toon Site"/>
        <Scene key="login"  component={LoginPage} title="Login"/>

    </Scene>
);

const ConnectedRouter = connect()(Router)

export default class App extends React.Component {

    state = {
        width: 0,
        height: 0,
    };

    componentWillMount(){
        const {width, height} = Dimensions.get('window');
        this.setState({
            width: width,
            height: height
        })
    }

    render() {
        return (
          <Provider store={store}>
            <ConnectedRouter scenes={scenes} width={this.state.width} height={this.state.height}/>
          </Provider>

        )
    }
}
