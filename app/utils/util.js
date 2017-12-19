/**
 * Created by AA on 2017/10/17.
 */

import React, {Component} from 'react';

import {
    Alert,
    Dimensions,
    ListView,
    ToastAndroid,
} from 'react-native';
import Toast from 'react-native-root-toast';

import Geolocation from 'Geolocation';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

//产生ListView的对象
const ds = new ListView.DataSource({
    rowHasChanged: (r1, r2) => r1 !== r2
});


//定义的跳转方法
const jumpPage = (navigate, target, params) => {
    "use strict";
    if (params != null) {
        navigate(target, params);
    }
    if (params == null) {
        navigate(target);
    }
}

//封装的弹出吐司的方法
const toastShow = (data) => {
    "use strict";
    if (data != null && data != '') {
        Toast.show(data, {
            // duration:Toast.durations.SHORT,
            duration: 1200,
            position: -64,
            shadowColor: '#ff361c',
            backgroundColor: '#dededf',
            textColor: '#2d4db0',
        })
    }

}

//获取经纬度的方法  Longitude  Latitude
let getLongitudeAndLatitude = () => {

    //获取经纬度和通过经纬度请求城市位置有绝对的先后顺序，通过Promise完成
    return new Promise((resolve, reject) => {

        Geolocation.getCurrentPosition(
            location => {

                //可以获取到的数据
                var result = "速度：" + location.coords.speed +
                    "\n经度：" + location.coords.longitude +
                    "\n纬度：" + location.coords.latitude +
                    "\n准确度：" + location.coords.accuracy +
                    "\n行进方向：" + location.coords.heading +
                    "\n海拔：" + location.coords.altitude +
                    "\n海拔准确度：" + location.coords.altitudeAccuracy +
                    "\n时间戳：" + location.timestamp;

                // ToastAndroid.show("UTIl" + location.coords.longitude, ToastAndroid.SHORT);

                resolve([location.coords.longitude, location.coords.latitude]);
            },
            error => {
                // Alert.alert("获取位置失败：" + error, "")
                reject(error);
            }
        );

    })

}


//从城市列表数组（子元素为城市json对象）中根据城市名获取城市对象
let getCityByName = (cityArr, targetCityName) => {

    if (cityArr.length == 0 || cityArr == null ||
            targetCityName == "" || targetCityName == null) {
        return;
    }
    for (let i = 0; i < cityArr.length; i++) {
        if (cityArr[i].name == targetCityName) {
            return cityArr[i];
        }
    }
    return {};
}


export {WIDTH, HEIGHT, jumpPage, ds, toastShow, getLongitudeAndLatitude,getCityByName};