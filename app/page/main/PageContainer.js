/**
 * Created by AA on 2017/10/17.
 */

import React, {Component} from 'react';

import Main from './Main';
import Theme from '../routes/Theme';
import Stack from '../routes/Stack';

export default class PageContainer extends Component {

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            menuOpen: false,
        };
    }

    render() {
        //这里的Switch case会出现异常？
        let index = this.props.index;

        if (index == 0) {
            return <Stack onPress={this.props.onPress}></Stack>
        }
        if (index == 1) {
            return <Theme></Theme>
        }
        if (index == 2) {
            return <Theme></Theme>
        }else{
            return <Theme></Theme>
        }
    }
}
