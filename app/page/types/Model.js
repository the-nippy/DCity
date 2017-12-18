/**
 * Created by AA on 2017/11/10.
 *
 * 通过getDrawItem方法生成侧滑项  待实现
 */
import React, {Component} from 'react';
import{
    StyleSheet,
    View,
    Image,
}from 'react-native';

import Main from '../main/Main';

const getDrawItem = (item) => {
    "use strict";

    return (
        <Music title={item.title}
               type={item.type}
               image={item.image}
        />
    );

}

class Music extends Component {

    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {};
      }

    // static navigationOptions = {
    //     //{ focused: boolean, tintColor: string }
    //     drawerLabel: this.props.title,
    //     //{ focused: boolean, tintColor: string }
    //     drawerIcon: ({tintColor}) => (
    //         <Image
    //             source={this.props.image}
    //             style={[styles.icon, {tintColor: tintColor}]}
    //         />
    //     ),
    // };

    render() {
        //这里写一个子页面
        return (
            <View>
                {/*<Button*/}
                {/*onPress={() => this.props.navigation.navigate('DrawerOpen')}*/}
                {/*title=" MyHomeScreen ----> open drawer"*/}
                {/*/>*/}
                <Main text={this.props.title}
                      navigation={this.props.navigation}
                      eventType={this.props.type}
                      onPressOpen={() => {
                          this.props.navigation.navigate('DrawerOpen')
                      }}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    icon: {
        width: 24,
        height: 24,
    },
});

export default getDrawItem;
