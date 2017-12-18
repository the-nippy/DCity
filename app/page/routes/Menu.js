/**
 * Created by AA on 2017/10/17.
 *
 * 侧滑菜单
 */

import React, {Component} from 'react';
import {
    Text,
    View,
    StyleSheet,
    Image,
    ListView,
}from 'react-native';

import  TouchView from '../../widget/TouchView';

import {WIDTH, HEIGHT, jumpPage, ds} from '../../utils/util';
import {menu_fun} from '../../data/static/function';
import Main from '../main/PageContainer';

export default class Menu extends Component {

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            data_fun: ds.cloneWithRows(menu_fun),
        };
    }

    _renderFun = (rowData, sectionId, rowId) => {
        return (
            <TouchView
                onPress={() => {
                    this.props.onPress(rowData.type,rowData.title)
                }}>
                <View style={styles.list_item}>
                    <Image style={styles.item_image}
                           source={rowData.image}
                    ></Image>
                    <Text style={styles.item_text}>{rowData.title}</Text>
                </View>
            </TouchView>
        );
    }

    render() {
        return (
            <View style={styles.all}>

                <View style={styles.menu_head}>
                    <View style={{borderRadius: 10}}>
                        <Image
                            source={require('../../source/user_person.png')}
                            style={styles.head_image}
                        ></Image>
                    </View>
                    <View style={styles.head_texts}>
                        <Text style={{fontSize: 22}}>someone</Text>
                        <Text style={{fontSize: 16, marginTop: 8}}>starkcoder@sina.com</Text>
                    </View>
                </View>

                <ListView
                    dataSource={this.state.data_fun}
                    renderRow={this._renderFun}
                    style={{marginTop: 5}}
                >
                </ListView>

            </View>
        );
    }
}

const styles = StyleSheet.create({

    all: {
        width: WIDTH,
        height: HEIGHT,
    },
    menu_head: {
        width: WIDTH,
        height: 110,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#6852aa'
    },
    head_image: {
        width: 50,
        height: 50,
        backgroundColor: '#ffffff',
        marginLeft: 10,
    },
    head_texts: {
        marginLeft: 10,
        justifyContent: 'center',
        alignItems: 'flex-start'
    },

    list_item: {
        flexDirection: 'row',
        justifyContent: "flex-start",
        alignItems: 'center',
        width: WIDTH,
        height: 50,
        marginVertical: 2,
        backgroundColor: '#cecedf'
    },
    item_image: {
        width: 35,
        height: 35,
        marginLeft: 15,
        borderRadius: 10,
    },
    item_text: {
        marginLeft: 10,
        fontSize: 17,
        color:'#3a134c'
    },


})
