/**
 * Created by AA on 2017/11/12.
 */

import React, {Component} from 'react';
import {
    Text,
    View,
    Image,
    StyleSheet,
}from 'react-native';

import {WIDTH, HEIGHT, jumpPage, toastShow}  from '../utils/util';
import TouchView from './TouchView';
// const MainColor='#b03d29';
const MainColor = '#dc5039';


export default class DetailItem extends Component {
    render() {
        return (
            <TouchView
                onPress={this.props.onPress}
            >
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                    <View style={styles.all}>
                        <View style={{flexDirection: 'row',}}>
                            <Image style={{width: 20, height: 20}} source={require('../source/arrow.png')}></Image>
                            <Text style={styles.item_text}>{this.props.title}</Text>
                        </View>

                        <View>
                            <Text>{this.props.value}</Text>
                        </View>
                    </View>
                    <View style={styles.line}></View>
                </View>
            </TouchView>
        );
    }
}

const styles = StyleSheet.create({
    all: {
        width: WIDTH - 20,
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    item_text: {
        color: '#000000',
        marginLeft: 8,
        fontSize: 16
    },
    line: {
        width: WIDTH - 20, height: 1, backgroundColor: '#cdcdcd'
    }

})