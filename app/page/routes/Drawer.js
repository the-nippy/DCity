/**
 * Created by AA on 2017/11/10.
 *
 * 侧滑导航
 */

import Music from '../types/Music';
import Drama from '../types/Drama';
import Exhibition from '../types/Exhibition';
import Film from '../types/Film';
import Commonweal from '../types/Commonweal';
import Party from '../types/Party';
import Salon from '../types/Salon';
import Sports from '../types/Sports';
import Travel from '../types/Travel';
import getDrawItem from '../types/Model';
import {menu_fun} from '../../data/static/function';

import React from 'react';
import {
    AppRegistry,
    Text,
    View,
    StyleSheet,
    Image,
    Button,
    ScrollView,
}  from 'react-native';

import {
    DrawerNavigator,
    DrawerItems,
} from 'react-navigation';


const Drawer = DrawerNavigator({

        Music: {screen: Music},
        Drama: {screen: Drama},
        Exhibition: {screen: Exhibition},
        Film: {screen: Film},
        Commonweal: {screen: Commonweal},
        Party: {screen: Party},
        Salon: {screen: Salon},
        Sports: {screen: Sports},
        Travel: {screen: Travel},
    },
    {
        drawerWidth: 200, // 抽屉宽
        drawerPosition: 'left', // 抽屉在左边还是右边
        // contentComponent: CustomDrawerContentComponent,  // 自定义抽屉组件
        contentOptions: {
            initialRouteName: 'Home', // 默认页面组件
            activeItemKey: 'Notifications',
            labelStyle: {//标签样式
                // color : 'red',
                height: 30,
                fontSize: 17,
                alignItems: 'center',
                marginTop: 20
            },
            activeTintColor: 'white',  // 选中文字颜色
            activeBackgroundColor: '#dc5039', // 选中背景颜色
            inactiveTintColor: '#666',  // 未选中文字颜色
            inactiveBackgroundColor: '#fff', // 未选中背景颜色
            style: {  // 样式
                marginVertical: 0,
            },

            itemStyle: {
                alignItems: "center",
                height: 50
            },
            //没有作用
            onItemPress: (route) => {
                console.log('-------->' + JSON.stringify(route))
            },
        },
        contentComponent: props => {
            console.log('contentComponent');
            console.log(props);
            return (
                <ScrollView>
                    <View>
                        {/*<View style={{paddingVertical: 20, paddingHorizontal: 15, backgroundColor: '#000'}}>*/}
                        {/*<Text style={{color: '#FFF'}}>ser Name</Text>*/}
                        {/*</View>*/}
                        <View style={{
                            height: 100,
                            backgroundColor: '#4c70ca',
                            alignItems: 'flex-start',
                            justifyContent: 'center'
                        }}>
                            <Text style={{marginLeft: 20, fontSize: 21}}>全部活动类型</Text>
                        </View>

                        <View style={{width:200,height:30,backgroundColor:'#ffffff'}}></View>

                        <DrawerItems {...props} />

                        {/*<View style={{*/}
                            {/*marginTop:40,*/}
                            {/*width: 200,*/}
                            {/*height: 60,*/}
                            {/*justifyContent: 'center',*/}
                            {/*alignItems: 'flex-start',*/}
                            {/*backgroundColor: '#cd5a47'*/}
                        {/*}}>*/}
                            {/*<Text style={{fontSize: 19,marginLeft:20}}>设 置</Text>*/}
                        {/*</View>*/}

                    </View>
                </ScrollView>
            )
        }
    }
)

export default Drawer;


