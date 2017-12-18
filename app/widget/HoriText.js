/**
 * Created by AA on 2017/11/12.
 */

import React, {Component} from 'react';
import {
    Text,
    View,
    StyleSheet,
}from 'react-native';

export default class HoriText extends Component {
    render() {
        return (
            <View style={{flexDirection: 'row'}}>
                <Text style={[styles.sItem_time, {color: '#252525'}]}>{this.props.title}</Text>
                <Text style={styles.sItem_time}>{this.props.content}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    sItem_time: {
        fontSize: 14
    }
})