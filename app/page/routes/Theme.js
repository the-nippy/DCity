/**
 * Created by AA on 2017/11/2.
 *
 * 选择主题的页面
 */

import React, {Component} from 'react';
import {
    Text,
    View,
    Image,
    StyleSheet,
}from 'react-native';

import {WIDTH, HEIGHT} from '../../utils/util';

export default class Theme extends Component {
    render() {
        return (
            <View style={styles.all}>
                <Text>选择皮肤的界面</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({

    all: {
        width: WIDTH,
        height: HEIGHT,
        backgroundColor: "#cdcdbf"
    }

})

