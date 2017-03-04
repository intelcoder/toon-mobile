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

const scenes = Actions.create(
    <Scene key="root">
        <Scene key="login"  component={LoginPage} title="Login"/>
        <Scene key="webtoon"  hideNavBar={true} component={WebtoonPageContainer}/>
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
