/**
 * Created by AA on 2017/11/10.
 */
import React, {Component} from 'react';
import{
    StyleSheet,
    View,
    Image,
}from 'react-native';

import Main from '../main/Main';


export default class Film extends Component {

    static navigationOptions = {
        //{ focused: boolean, tintColor: string }
        drawerLabel: '电影',
        //{ focused: boolean, tintColor: string }
        drawerIcon: ({tintColor}) => (
            <Image
                source={require('../../source/menu/film.png')}
                style={styles.icon}
            />
        ),
    };

    render() {
        //这里写一个子页面
        return (
            <View>
                {/*<Button*/}
                    {/*onPress={() => this.props.navigation.navigate('DrawerOpen')}*/}
                    {/*title=" MyHomeScreen ----> open drawer"*/}
                {/*/>*/}
                <Main text="电影"
                      navigation={this.props.navigation}
                      eventType="film"
                      onPressOpen={()=>{ this.props.navigation.navigate('DrawerOpen')}}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    icon: {
        width: 30,
        height: 30,
    },
});
