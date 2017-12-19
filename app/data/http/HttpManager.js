/**
 *
 * 网络获取数据
 */
import {Alert} from 'react-native';


import Error from './Error';
import {Unknown_Error, ErrorDeal, NetWork_Error} from './ErrorDeal';
import {savePosition, getPositions, saveEventsToLocal, getLocalEvents} from '../storage/RealmManager';
import {getLongitudeAndLatitude} from '../../utils/util';

import React from 'react';

const BUrl = 'https://api.douban.com/v2';

const Cities_URL = '/loc/list';

const Event_URL = '/event/list';

//用户发起 参加和感兴趣的    user_created    user_participated      user_wished
//api.douban.com/v2/event/user_wished/54770363
const UserEvents_URL = '/event';

//需要加上mcode码，申请的应用的安全码
const BaiduMap_URL = "https://api.map.baidu.com/geocoder/v2/?ak=j3ENU9p7L1IHGeyu8ZsCOwGIoj7FeYH0&output=json&mcode=08:B0:A2:48:DC:AE:36:2A:EE:C4:8F:C6:DD:91:F4:8C:04:C3:BA:2C;com.minepro&location="

// const TencentMap_URL="https://apis.map.qq.com/ws/geocoder/v1/?key=DXMBZ-E6KWP-EC3D5-VYHF5-5FBX6-42BUX&location=";

// http://api.map.baidu.com/geocoder/v2/?ak=8fWAUoCNY4NCIt9rvZu3FGSF52kXLc9e&location=30.206526,120.209158&output=json

export default class HttpManager {

    //获取网络数据
    getNetData(url) {
        return new Promise((resolve, reject) => {
            fetch(url).then((response) => response.json())
                .then((responseData) => {
                    resolve(responseData);
                })
                .catch((error) => {
                    reject(ErrorDeal.getError(NetWork_Error))
                })
                .done()
        })
    }

    //获取城市列表数据
    getCityList(start, count) {

        //先从数据库获取数据
        if (getPositions() != null) {
            return getPositions();
        }

        //数据库没有数据再通过网络获取
        return new Promise((resolve, reject) => {
            this.getNetData(BUrl + Cities_URL + "?start=" + start + "&count=" + count)
                .then((data) => {
                    if (data != null) {
                        if (data.code != null && typeof data.code == 'number') {
                            // console.error('error','48'+data.code);
                            reject(ErrorDeal.getError(data.code))
                        } else if (data.count != null && data.count > 0) {
                            resolve(data);
                            //这里的data和返回后的Promise数据差别？
                            savePosition(data)
                        } else {
                            reject(ErrorDeal.getError(NetWork_Error));
                        }
                    } else {
                        // console.error('error','60'+data.code);
                        //数据为空，网络错误
                        reject(ErrorDeal.getError(NetWork_Error));
                    }
                }).catch((error) => {
                if (error != null && error instanceof Error) {
                    reject(error);
                } else {
                    reject(ErrorDeal.getError(NetWork_Error));
                }
            });
        })
    }

    //获取指定地点 日期，类型的活动列表
    getEventAppointed(loc, date, type, start, count, needNet) {

        // 如果不需要网络获取，并且本地数据不为空才返回
        if (!needNet && getLocalEvents() != null) {
            return getLocalEvents();

        } else {
            return new Promise((resolve, reject) => {
                this.getNetData(BUrl + Event_URL + '?loc=' + loc + '&day_type=' + date + '&type=' +
                    type + '&start=' + start + '&count=' + count)
                    .then((data) => {
                        if (data != null) {
                            // Alert.alert("",""+data.code)
                            if (data.code != null && typeof data.code == 'number') {
                                // console.error('error','86'+data.code);
                                reject(ErrorDeal.getError(data.code));
                            } else if (data.count != null && data.count > 0) {
                                resolve(data)
                                //保存数据到数据库
                                saveEventsToLocal(data);
                            } else {
                                reject(ErrorDeal.getError(data.code));
                                // console.error('error','93'+data.code);
                            }
                        } else {
                            // console.error('error','86'+data.code);
                            //数据为空
                            reject(ErrorDeal.getError(data.code))
                        }
                    }).catch((error) => {
                    if (error != null && error instanceof Error) {
                        // Alert.alert("",""+error);
                        reject(error);
                    } else {
                        reject(ErrorDeal.getError(NetWork_Error));
                    }
                });
            })
        }
    }

    //获取用户发起的事件  第一个参数为发起 感兴趣  参加   第二个参数为用户ID
    getUserEvents(typeOfUser, userId) {
        return new Promise((resolve, reject) => {
            this.getNetData(BUrl + UserEvents_URL + '/' + typeOfUser + '/' + userId).then(
                (data) => {
                    if (data != null) {
                        if (data.code != null && typeof data.code == 'number') {
                            reject(ErrorDeal.getError(data.code));
                        } else if (data.count != null && data.count > 0) {
                            resolve(data)
                            //不需要保存数据到数据库
                        } else {
                            reject(ErrorDeal.getError(data.code));
                        }
                    } else {
                        //数据为空
                        reject(ErrorDeal.getError(data.code))
                    }
                }).catch((error) => {
                if (error != null && error instanceof Error) {
                    // Alert.alert("",""+error);
                    reject(error);
                } else {
                    reject(ErrorDeal.getError(NetWork_Error));
                }
            });
        });
    }


    //根据经纬度获取定位  百度定位http://api.map.baidu.com/geocoder/v2/?ak...
    //Postman
    getCityLocation() {

        return new Promise((resolve, reject) => {

            getLongitudeAndLatitude()
            //获取经纬度的方法返回的是经纬度组成的数组
                .then((locationArr) => {

                      // Alert.alert("", "" + locationArr[1]);
                    let longitude = locationArr[0];
                    let latitude = locationArr[1];

                    this.getNetData(BaiduMap_URL + latitude + "," + longitude)
                        .then((data) => {
                            if (data.status == 0) {
                                resolve(data);
                            } else {
                                reject(ErrorDeal.getError(data.code));
                            }
                        }).catch((data) => {
                        reject(ErrorDeal.getError(data.code));
                    })

                }).catch((data) => {
                reject(ErrorDeal.getError(data.code));
            })

        })

        //
        //     let longitudeAndLatitude = getLongitudeAndLatitude();
        //
        //     //此处还没有获取到定位数据
        //     Alert.alert("", "" + longitudeAndLatitude[0]);
        //
        //     if (longitudeAndLatitude != null && longitudeAndLatitude.length == 2) {
        //
        //         Alert.alert("", "" + longitudeAndLatitude);
        //
        //         let longitude = longitudeAndLatitude[0];
        //         let latitude = longitudeAndLatitude[1];
        //
        //         return new Promise((resolve, reject) => {
        //
        //             this.getNetData(BaiduMap_URL + "&" + longitude + "," + latitude)
        //                 .then((result) => {
        //                     if (result.status == 0) {
        //                         resolve(result);
        //                     } else {
        //                         reject(result.status)
        //                     }
        //                 })
        //         })
        //     } else {
        //         return new Promise((resolve, reject) => {
        //             reject(null);
        //         })
        //     }
    }


}
