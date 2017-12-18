/**
 */

import RealmData from './RealmData';

import Realm from 'realm';
import{
    Alert,
}from 'react-native';

const myRealm = new Realm(RealmData[RealmData.length - 1]);


//保存所有城市
//传入的是请求回来的对象{}   存进数据库的是对象的各个字段  主要是locs
const savePosition = (cities) => {
    try {
        // console.error('error', "12345");
        myRealm.write(() => {

            let citiesData = myRealm.objects('position');

            if (citiesData == null || citiesData.length == 0) {
                myRealm.create('position', cities);
            } else {
                citiesData[citiesData.length - 1].locs = cities.locs;
                citiesData[citiesData.length - 1].start = cities.start;
                citiesData[citiesData.length - 1].count = cities.count;
                citiesData[citiesData.length - 1].total = cities.total;
            }
        })
    } catch (error) {
        console.error('error', error);
    }
}

//取出的是cities
const getPositions = () => {
    let cities = myRealm.objects('position');
    if (cities != null && cities.length > 0) {
        return new Promise((resolve, reject) => {
            resolve(cities[cities.length - 1])
        })
    }
}

//保存音乐数据
const saveEventsToLocal = (musics) => {

    try {
        myRealm.write(() => {
            "use strict";
            let musicData = myRealm.objects('music');
            if (musicData == null || musicData.length == 0) {
                myRealm.create('music', musics);
            } else {
                musicData[musicData.length - 1].start = musics.start;
                musicData[musicData.length - 1].count = musics.count;
                musicData[musicData.length - 1].total = musics.total;
                musicData[musicData.length - 1].events = musics.events;
            }
        })
    } catch (error) {
        console.error('error', error);
    }
}

//获取本地事件数据
const getLocalEvents = () => {

    let musics = myRealm.objects('music');
    if (musics != null && musics.length > 0) {
        return new Promise((resolve, reject) => {
            resolve(musics[musics.length - 1]);
        })
    }
}

//保存设定的城市
const insertNowCity = (cityNameAndId) => {
    if (cityNameAndId == null) {
        return;
    }
    try {
        // Alert.alert("", "errorInsert");

        let arr = cityNameAndId.split('##');

       //Alert.alert("", "name" + arr[0] + "id" + arr[1]);

        myRealm.write(() => {
            let NowCity = myRealm.objectForPrimaryKey('city', 0);
            if (NowCity == null) {
                myRealm.create('city', {
                    id: 0,
                    cityName: arr[0],
                    cityId: arr[1],
                })
            } else {
                NowCity.cityName = arr[0];
                NowCity.cityId = arr[1];
            }
            //Alert.alert("", "name" + arr[0] + "id" + arr[1]);
        })
    } catch (error) {
        console.error("error",error);
    }
}

const queryNowCity = () => {
    let NowCity = myRealm.objects('city');
    if (NowCity == null || NowCity.length == 0) {
        return '武汉##118254';
    } else {
        return NowCity[0].cityName + "##" + NowCity[0].cityId;
    }
}


//保存设置
//--------------------------------
const saveLocal = (local) => {
    if (local == null) {
        return;
    }
    try {
        myRealm.write(() => {
            let localData = myRealm.objectForPrimaryKey('local', 0);
            if (localData == null || localData.length == 0) {
                myRealm.create('local', {
                    id: 0,
                    cityName: local.cityName,
                    cityId: local.cityId,
                });
            } else {
                localData.cityName = local.cityName;
                localData.cityId = local.cityId;
            }
        })
    } catch (error) {
        console.error("error", error);
    }
}

const getLocal = () => {
    "use strict";
    let local = myRealm.objects('local');
    if (local != null && local.length > 0) {
        return local[0];
    } else {
        return "NULL"
    }
}
//--------------------------------------------------------


export  {savePosition, getPositions, saveEventsToLocal, getLocalEvents, saveLocal, getLocal, queryNowCity, insertNowCity};


