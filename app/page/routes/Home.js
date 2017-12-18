/**
 * Created by AA on 2017/10/17.
 *
 * 作为进入的首页
 *
 * 第三方库：https://github.com/root-two/react-native-drawer
 *
 */

import React, {Component} from 'react';
import {
    Text,
    View,
    StyleSheet,
    Dimensions,
    ToastAndroid
}from 'react-native';

// const SideMenu=require('react-native-side-menu');
import SideMenu from 'react-native-side-menu';

import PageContainer from '../main/PageContainer';
import Menus from './Menu';
import Theme from './Theme';
import Main from '../main/Main';


class Home extends Component {

    // 构造
    constructor(props) {
        super(props);

        //this.props.menuRef = this.refs.menu

        // 初始状态
        this.state = {
            menuOpen: false,
            //mainPage为负一时为主界面，其他页面为各自在功能数据中的index
            currentPageId: 0,
            type: 'music',
            eventTitle: '音乐'
        };
    }

    _openMenu = () => {
        this.setState({menuOpen: true})
    }


    _clickMenu = (type,title) => {
        this.setState({
            menuOpen: false,
            // currentPageId: rowId,
            type: type,
            eventTitle: title,
        });
        ToastAndroid.show("id" + type, ToastAndroid.SHORT);

    }

    render() {
        return (
            <SideMenu
                ref="menu"
                menu={
                    <Menus
                        onPress={this._clickMenu}
                    />}
                isOpen={this.state.menuOpen}

                //autoClosing={false}
            >
                {/*{this._renderPage(this.state.currentPageId)}*/}
                {/*<PageContainer onPress={() => this.setState({menuOpen: true})}*/}
                {/*index={this.state.currentPageId}*/}
                {/*></PageContainer>*/}
                <Main
                    onPressOpen={() => {
                        this._openMenu()
                    }}
                    navigation={this.props.navigation}
                    eventType={this.state.type}
                    eventTypeTitle={this.state.eventTitle}
                />
            </SideMenu>
        );
    }
}

const home = new Home();
const Open = home._openMenu;

export default Home;
export {Open};







