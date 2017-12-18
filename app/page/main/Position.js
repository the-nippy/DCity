/**
 * Created by AA on 2017/11/3.
 *
 * 获取定位的页面
 *
 *
 */
import React, {Component} from 'react';
import {
    Text,
    View,
    StyleSheet,
    Image,
    FlatList,
    ListView,
    TouchableOpacity,
    Alert,
    AsyncStorage,
    ToastAndroid,
} from 'react-native';

// var Geolocation = require('Geolocation');


import LinearGradient from 'react-native-linear-gradient';
import TouchView from '../../widget/TouchView';
import HttpManager from '../../data/http/HttpManager';
import {saveLoca, insertNowCity} from '../../data/storage/RealmManager';
import {setAsyncData, getAsyncData} from '../../data/storage/LocalStorage';
import {WIDTH, HEIGHT} from '../../utils/util';

const MainColor = '#dc5039';

//定义水平垂直间距，每行的个数，计算宽高
let Hori_MARGIN = 20, Ver_MARGIN = 10, cols = 4;
let city_HEIGHT = 35, city_WIDTH = (WIDTH - (cols + 1) * Hori_MARGIN) / cols;

//一次请求50条数据
let city_count = 36;

let httpManager = new HttpManager();

export default class Position extends Component {

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            //cityList: data_city,
            currentCity: '',
            //所有城市数据cities是一个json字符串，其中locs字段是城市数组
            cities: '',
            showMore: false,
        };
        this.getData();
    }

    //组件加载完成时就获取经纬度信息
    componentDidMount() {
        this.getNetPosition();
    }

    getNetPosition() {

        httpManager.getCityLocation()
            .then((data) => {
                Alert.alert("位置？", "" + JSON.stringify(data));
                ToastAndroid.show("" + JSON.stringify(data), ToastAndroid.SHORT);
            })
            .catch((error) => {
                Alert.alert("Position Error", "" + error);
            });
    }


    getData() {

        httpManager.getCityList(0, city_count).then((cities) => {
            if (cities == null) {
                Alert.alert("", "cities为空")
            } else {
                this.setState({cities: cities})
                //将fetch后的数据直接存入，在Http请求之后，Promise数据
                // savePosition(cities);
            }
        }).catch((error) => {
            console.error('error', error);
        });
    }

    //需要将当前的城市记录下来再回退
    _clickBack() {


        //存入值 name和id
        let currentCity = this.state.currentCity;

        // ToastAndroid.show("name" + currentCity.name + "Id" + currentCity.id, ToastAndroid.SHORT);

        if (currentCity != null && currentCity != '') {
            let cityData = currentCity.name + "##" + currentCity.id;
            insertNowCity(cityData);
        }


        let {params} = this.props.navigation.state;
        //改变位置城市需要刷新
        params.fresh();

        this.props.navigation.goBack();
    }

    _clickCityItem(city) {

        this.setState({currentCity: city});

        this.getNetPosition()
    }

    _getItemLayout(data, index) {
        let itemHeight = 100;
        return {length: itemHeight, offset: itemHeight * index, index}
    }

    _renderCity(item) {
        return (
            <TouchView
                onPress={() => this._clickCityItem(item)}>
                <View style={styles.city_item}>
                    <Text style={{fontSize: 16}}>{item.name}</Text>
                </View>
            </TouchView>
        );
    }

    render() {
        return (
            <View style={styles.all}>

                <View style={styles.head}>
                    <TouchableOpacity onPress={() => {
                        this._clickBack()
                    }}>
                        <Image source={require('../../source/arrow_back.png')}
                               style={styles.head_image}
                        />
                    </TouchableOpacity>
                    <Text style={styles.head_text}>城市</Text>
                </View>

                <LinearGradient
                    colors={[
                        '#ffffff',
                        '#ffddbf',
                        '#ffffff',
                    ]}
                    start={{x: 0, y: 0}} end={{x: 1, y: 2}}
                    locations={[0.1, 0.5, 1]}
                    style={{flex: 1}}
                >
                    <View style={styles.current}>
                        <Text style={{fontSize: 17,}}>当前城市：</Text>
                        <Text style={{fontSize: 18, color: '#190602'}}>{this.state.currentCity.name}</Text>

                        <TouchView onPress={() => {
                            this._clickBack()
                        }}
                        >
                            <View style={styles.current_confirm}>
                                <Text style={{fontSize: 16}}>确定</Text>
                            </View>
                        </TouchView>


                    </View>

                    <View style={{width: WIDTH, height: 1, backgroundColor: '#cdcdcd'}}></View>


                    <Text style={{fontSize: 17, marginTop: 10, marginLeft: 15}}>可选城市:</Text>

                    <FlatList
                        style={{marginTop: 10}}
                        data={this.state.cities.locs}
                        keyExtractor={(item, index) => index}
                        renderItem={
                            ({item}) => this._renderCity(item)
                        }
                        getItemLayout={(data, index) => this._getItemLayout(data, index)}
                        showsVerticalScrollIndicator={false}
                        numColumns={cols}

                    />

                </LinearGradient>
            </View>

        );
    }
}


const styles = StyleSheet.create({

    all: {
        width: WIDTH,
        height: HEIGHT,
        // flex: 1,
        justifyContent: 'flex-start',

        backgroundColor: '#ffffff'
    },
    head: {
        width: WIDTH,
        height: 60,
        flexDirection: 'row',
        backgroundColor: MainColor,
        alignItems: 'center',
    },
    head_image: {
        width: 25,
        height: 25,
        marginLeft: 10
    },
    head_text: {
        position: 'absolute',
        left: WIDTH / 2 - 20,
        fontSize: 20,
        color: '#ffffff'
    },
    flat_view: {
        flex: 1,
        marginLeft: 5,
        marginRight: 5,
        backgroundColor: "#cdcdbf",
    },
    city_item: {
        width: city_WIDTH,
        height: city_HEIGHT,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: Hori_MARGIN,
        marginTop: Ver_MARGIN,
        borderRadius: 3,
        backgroundColor: '#cecebf'
    },

    current: {
        height: 45,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginLeft: 15,
    },

    current_confirm: {
        width: 80,
        height: 36,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#3e75d1',
        position: 'absolute',
        left: WIDTH - 110,
        borderRadius: 5
    },


})