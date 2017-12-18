/**
 * Created by AA on 2017/11/2.
 *
 * 自定义的触摸组件
 */
import React, {Component} from 'react';

import {
    TouchableNativeFeedback,
    Platform,
    TouchableOpacity
}from 'react-native';

class TouchView extends Component {
    render() {
        if (Platform.OS == 'android') {
            return (
                <TouchableNativeFeedback
                    onPress={this.props.onPress}
                    style={this.props.style}
                >
                    {this.props.children}
                </TouchableNativeFeedback>
            );
        } else {
            return (
                <TouchableOpacity onPress={this.props.onPress}>
                    {this.props.children}
                </TouchableOpacity>
            );
        }
    }
}

export default TouchView;