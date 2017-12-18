/**
 * Created by AA on 2017/11/3.
 *
 * Main界面的跳转栈
 */

import React, {Component} from 'react';
import {StackNavigator} from 'react-navigation';

import Main from '../main/Main';

import Drawer from './Drawer';

import Position from '../main/Position';
import Detail from '../main/EventDetail';
import UserEvents from '../main/UserEvents';

import Home from './Home';

const Stack = StackNavigator({

    Drawer: {screen: Drawer},
    // Home:{screen:Home},
    //Main: {screen: Main},
    Position: {screen: Position},
    Detail: {screen: Detail},
    UserEvents: {screen: UserEvents}

}, {
    navigationOptions: {
        header: null
    }
})

export default Stack;