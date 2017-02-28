/**
 * Created by fiddlest on 2/23/2017.
 */

import React from 'react';
import {
    View,
    Dimensions
} from 'react-native';
import {Actions, Scene, Router} from 'react-native-router-flux';
import LoginPage from '../LoginPage/LoginPage';
import {Navigator} from 'react-native'



const scenes = Actions.create(
    <Scene key="root">
        <Scene key="login" component={LoginPage} title="Login"/>
    </Scene>
);


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

    handleRender = (route, navigator) => {
        return (
            <View>
                {
                    React.cloneElement(
                        this.getPage(route, navigator),
                        {...this.state}
                    )
                }
            </View>
        )
    };

    getPage = (route, navigator) => {
        if (route.title === 'home') {
            return <LoginPage navigator={navigator} title={route.title}/>
        }
    };


    render() {
        return (
                <Navigator
                    initialRoute={{title: 'home', index: 0}}
                    renderScene={this.handleRender}
                />
        )
    }
}
