/**
 * Created by AA on 2017/11/8.
 *
 * 存入当前位置，主题等其他数据
 *用 AsyncStorage
 */

import {
    AsyncStorage,
    Alert,
}from 'react-native';

const setAsyncData = (cityName, cityId) => {

    let keyValuePair = [['name', cityName], ['id', cityId]];

    AsyncStorage.multiSet(keyValuePair, function (error) {
        if (error) {
            return;
        }
    })

}

const getAsyncData = () => {

    let keys = ['name', 'id'];
    AsyncStorage.multiGet(keys,  (err, result)=> {
        if (err) {
            return "NULL";
        }
        //result[i][0]是存入的键   每个数组的第二个元素才是值
        if (result[0][1] != null && result[1][1] != null) {
            Alert.alert('', 'id' + result[1][1]);
            let data = [result[0][1], result[1][1]];
            return data;
        } else {
            return "NULL";
        }
    });
}


export {setAsyncData, getAsyncData};
