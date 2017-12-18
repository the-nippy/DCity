/**
 * Created by AA on 2017/11/2.
 */

import React, {Component} from 'react';
import {
    Text,
    View,
    StyleSheet,
    Image,
    TouchableOpacity,
    ToastAndroid,
    Alert,
    FlatList,
    ScrollView,
    ActivityIndicator,
}from 'react-native';
import  TouchView from '../../widget/TouchView';
import HoriText from '../../widget/HoriText';
import Swiper from 'react-native-swiper';
import LinearGradient from 'react-native-linear-gradient';
import SplashScreen from 'react-native-splash-screen';

const WHITE = '#FFFFFF';
import {WIDTH, HEIGHT, jumpPage, ds, toastShow} from '../../utils/util';
import {saveLocal, getLocal, queryNowCity, getLocalEvents} from '../../data/storage/RealmManager';

import {Open} from '../routes/Home';

import {data_date, data_swiper} from '../../data/static/function';
import HttpManager from '../../data/http/HttpManager';
import Error from '../../data/http/Error';

const HttpEvent = new HttpManager();

const tab_MARGIN = 14, Hori_MARGIN = 10;
const tabItem_WIDTH = (WIDTH - tab_MARGIN) / (data_date.length);
const tabItem_HEIGHT = 35;

//只请求16条数据  每行显示两条
const event_COUNT = 16, cols = 2;
const item_HEIGHT = 180;

// const MainColor='#b03d29';
const MainColor = '#dc5039';


class Tab extends Component {
    render() {
        return (
            <TouchView
                onPress={this.props.onPress}>
                <View
                    style={this.props.style}
                >
                    <Text>{this.props.date}</Text>
                </View>
            </TouchView>
        );
    }
}

export default class Main extends Component {

    // 构造
    constructor(props) {
        super(props);
        // 初始状态

        let NameAndId = queryNowCity();
        let arr;
        if (NameAndId != null && NameAndId != '') {
            arr = NameAndId.split("##");
        }

        this.state = {
            eventObject: '',
            currentCityName: arr ? arr[0] : '武汉',
            currentCityId: arr ? arr[1] : '118254',
            date: 'future',
            loadingState: '',
            eventsForSwiper: [],
            eventsForList: [],
        };

        //先执行一次数据库查询  有本地事件数据就不需要网络获取
        //  if(getLocalEvents()){
        //      this.freshData(false);
        //  }else{
        //      this.freshData(true);
        //  }
        this.freshData(true);
    }

    componentDidMount() {
        setTimeout(() => {
            SplashScreen.hide()
        }, 100)
    }


    //获取数据
    getData(cityId, date, type, start, count, fresh) {

        // Alert.alert("", "getData触发" + (typeof this.state.currentCityId));

        HttpEvent.getEventAppointed(cityId, date, type, start, count, fresh).then((event) => {

            if (event != null) {
                //将获取的事件数组分隔  给轮播和FlatList不同的数据
                if (event.events.length >= 6) {
                    let eventsForSwiper = event.events.splice(0, 4);
                    this.setState({
                        // eventsForSwiper: eventsForSwiper,
                        // eventsForList: event.events
                        eventObject: event,
                    })
                } else {
                    this.setState({
                        eventObject: event,
                        // eventsForSwiper: event.events,
                        // eventsForList: event.events,
                    });
                }


            } else {
                Alert.alert("", "空數據")
            }
        }).catch((error) => {
            if (error != null && error instanceof Error) {
                // ToastAndroid.show(error.getErrorMsg(), ToastAndroid.SHORT);
                toastShow(error.getErrorMsg())
            } else {
                // ToastAndroid.show('网络错误', ToastAndroid.SHORT);
                toastShow("网络错误");
            }
            this.setState({
                loadingState: "FAIL",
            });
        });
    }

    //通过更新后的 位置  时间 重新请求  刷新
    freshData = (needNet) => {

        //this.togglePosition();

        this.getData(this.state.currentCityId, this.state.date, this.props.eventType, 0, event_COUNT, needNet);
    }

    togglePosition = () => {

        let CityNameAndId = queryNowCity();
        if (CityNameAndId != null) {
            let arr = CityNameAndId.split("##");
            this.setState({
                eventObject: '',
                currentCityName: arr[0],
                currentCityId: arr[1],
                loadingState:'loading'
            });
            //ToastAndroid.show("name" + arr[0] + "Id" + arr[1], ToastAndroid.SHORT);
        }

        //略微延迟再请求数据，（上面state异步操作并未改变）
        setTimeout(() => {
            this.freshData(true);
        }, 50);

    }


    //进入位置页面
    _clickPosition() {
        let {navigate} = this.props.navigation;
        //跳转时将函数传递过去
        jumpPage(navigate, "Position", {position: '青岛', fresh: this.togglePosition})
    }

    _clickDate(date) {

        this.setState({
            date: date,
            eventObject: ''
        })

        // ToastAndroid.show('正在获取date数据' + date, ToastAndroid.SHORT);
        toastShow('正在获取:' + date);
        // this.getData('118281', date, 'music', 0, event_COUNT, true);
        setTimeout(() => {
            this.freshData(true);
        }, 50);

    }

    _clickEvent(item) {
        const {navigate} = this.props.navigation;
        jumpPage(navigate, 'Detail', {item: item});

        // toastShow(typeof this.state.eventObject.events);
    }


    //渲染轮播
    _renderSwiper() {

        let events = this.state.eventObject.events;
        // let events = this.state.eventsForSwiper;

        if (events.length > 4) {
            events = events.slice(-4);
        }

        // Alert.alert("", "方法"  );
        if (events != null && events != '') {
            return (
                <View style={styles.swiper}>
                    <Swiper
                        height={120}
                        autoplay={true}
                        autoplayTimeout={5}
                        dot={<View style={styles.swiper_dot}/>}
                        activeDot={<View style={styles.swiper_activeDot}/>}
                        paginationStyle={styles.swiper_pagination}>

                        {events.map((item, index) => {
                            return (
                                <TouchView
                                    key={index}
                                    onPress={() => this._clickEvent(item)}>
                                    <View style={styles.sItem}>
                                        <Image
                                            source={{uri: item.image}}
                                            style={styles.sItem_image}
                                        />
                                        <View style={styles.sItem_right}>
                                            <Text style={styles.sItem_title}>{item.title}</Text>
                                            <HoriText title="时间：" content={item.time_str}/>
                                            <HoriText title="地点：" content={item.address}/>
                                            <HoriText title="费用：" content={item.fee_str}/>
                                        </View>
                                    </View>
                                </TouchView>
                            );
                        })}
                    </Swiper>
                </View>
            );
        } else {
            return (
                <View style={{width: WIDTH, height: 70, justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{fontSize: 20, color: '#3d64ff'}}>没有相应活动哦！</Text>
                </View>);
        }
    }

    //渲染event
    _renderEvent(item) {
        return (
            <TouchView
                onPress={() => {
                    this._clickEvent(item)
                }}
                style={styles.item}
            >
                <View style={styles.item}>
                    <Image source={{uri: item.image}} style={styles.item_image}/>
                    <Text style={styles.item_text_title} numberOfLines={2}>{item.title}</Text>
                </View>
            </TouchView>

        );
    }

    _getItemLayout(data, index) {
        return {length: item_HEIGHT, offset: item_HEIGHT * index, index}
    }

    _renderLoading() {
        if (this.state.loadingState == "FAIL") {
            return (
                <TouchView onPress={() => {
                    this.freshData(true);
                    this.setState({
                        loadingState: 'loading',
                    })
                }}>
                    <LinearGradient
                        colors={[MainColor, '#ffffff']}
                        // start={{x: 0, y: 0}} end={{x: 1, y: 2}}
                        // locations={[0.1, 0.5, 1]}
                        style={styles.loading_fail}>
                        <Text style={{fontSize: 19, color: '#ffffff'}}>
                            重新连接
                        </Text>
                    </LinearGradient>
                </TouchView>

            );
        } else {
            return (
                <View>
                    <ActivityIndicator
                        animating={true}
                        color={MainColor}
                        size='large'/>
                    <Text style={[styles.loading_text, {color: MainColor}]}>loading</Text>
                </View>
            );
        }
    }

    _renderDate() {
        let date = this.state.date;
        // let DateString = '';
        if (date == 'week') {
            return '一周'
        } else if (date == 'future') {
            return '所有'
        } else if (date == 'today') {
            return '今日'
        } else if (date == 'tomorrow') {
            return '明天'
        }
    }


    _renderMainView() {

        let events = this.state.eventObject.events;

        if (events == [] || events == null) {
            return (
                <LinearGradient
                    colors={[
                        '#ffffff',
                        MainColor,
                        '#ffffff',
                    ]}
                    start={{x: 0, y: 0}} end={{x: 1, y: 2}}
                    locations={[0.1, 0.5, 1]}
                    style={styles.loading_Page}>
                    {this._renderLoading()}
                </LinearGradient>
            );
        } else {
            return (
                <ScrollView>

                    <LinearGradient
                        colors={[
                            '#ffffff',
                            '#ffddbf',
                            '#ffffff',
                        ]}
                    >

                        {this._renderSwiper()}

                        <View style={{justifyContent: 'center', alignItems: 'center', marginVertical: 10}}>
                            <View style={{width: WIDTH / 3, height: 1, backgroundColor: '#1f1f3f'}}/>
                            <Text style={{
                                fontSize: 18,
                                marginVertical: 6,
                                color: "#aa2d17"
                            }}>
                                {this._renderDate()}{this.props.text}活动
                            </Text>
                            <View style={{width: WIDTH / 3, height: 1, backgroundColor: '#1f1f3f'}}/>
                        </View>

                        <FlatList
                            style={{paddingBottom: 20}}
                            data={this.state.eventObject.events}
                            keyExtractor={(item, index) => index}
                            renderItem={
                                ({item}) => this._renderEvent(item)
                            }
                            getItemLayout={(data, index) => this._getItemLayout(data, index)}
                            showsVerticalScrollIndicator={false}
                            numColumns={cols}

                        />

                    </LinearGradient>

                </ScrollView>

            );
        }
    }

    render() {
        return (
            <View style={styles.all}>

                <View style={styles.head}>
                    <TouchableOpacity
                        onPress={() => {
                            this.props.onPressOpen()
                        }}
                    >
                        <Image
                            style={styles.head_left_image}
                            source={require('../../source/Menu.png')}
                        />
                    </TouchableOpacity>

                    <View style={styles.head_middle}>
                        <Text style={styles.head_middle_text}>DCity·{this.props.text}</Text>
                    </View>


                    <TouchView
                        onPress={() => this._clickPosition()}
                    >
                        <View style={styles.head_right}>
                            <Text
                                style={{fontSize: 18, color: '#333333'}}>
                                {this.state.currentCityName}
                            </Text>
                            <Image
                                style={styles.head_right_image}
                                source={require('../../source/position.png')}
                            />
                        </View>
                    </TouchView>
                </View>

                <View style={styles.tab}>

                    <Tab onPress={() => {
                        this._clickDate('future')
                    }}
                         style={this.state.date == 'future' ? styles.tab_item_selected : styles.tab_item_normal}
                         date="所有"/>
                    <Tab onPress={() => {
                        this._clickDate('today')
                    }}
                         style={this.state.date == 'today' ? styles.tab_item_selected : styles.tab_item_normal}
                         date="今日"/>
                    <Tab onPress={() => {
                        this._clickDate('tomorrow')
                    }}
                         style={this.state.date == 'tomorrow' ? styles.tab_item_selected : styles.tab_item_normal}
                         date="明天"/>
                    <Tab onPress={() => {
                        this._clickDate('week')
                    }}
                         styleType='week'
                         style={this.state.date == 'week' ? styles.tab_item_selected : styles.tab_item_normal}
                         date="一周"/>
                </View>

                {/*<View style={{width: WIDTH, height: 5, backgroundColor: "#ffffff"}}></View>*/}

                {this._renderMainView()}

            </View>
        );

    }
}

const styles = StyleSheet.create({
    all: {
        width: WIDTH,
        height: HEIGHT,
        backgroundColor: "#ffffff",
    },
    head: {
        width: WIDTH,
        height: 60,
        backgroundColor: MainColor,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15
    },
    head_right: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',


    },
    head_left_image: {
        marginLeft: 5,
        width: 25,
        height: 25
    },
    head_right_image: {
        marginLeft: 5,
        width: 18,
        height: 18,
    },

    head_middle: {
        width: 180,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        left: WIDTH / 2 - 90
    },
    head_middle_text: {
        fontSize: 24,
        color: '#ffffff'
    },

    tab: {
        width: WIDTH - tab_MARGIN,
        height: 35,
        flexDirection: 'row',
        borderRadius: 5,
        backgroundColor: '#cdcdbf',
        marginLeft: tab_MARGIN / 2,
        marginTop: 5,
    },
    tab_item_normal: {
        width: tabItem_WIDTH,
        height: tabItem_HEIGHT,
        justifyContent: 'center',
        alignItems: 'center',
        borderLeftColor: '#ffffff',
        borderLeftWidth: 1,
    },
    tab_item_selected: {
        width: tabItem_WIDTH,
        height: tabItem_HEIGHT,
        justifyContent: 'center',
        alignItems: 'center',
        borderLeftColor: '#ffffff',
        borderLeftWidth: 1,
        backgroundColor: '#658bbf'
    },
    swiper_dot: {
        backgroundColor: "#999999",
        width: 12,
        height: 2,
        borderRadius: 1,
        marginLeft: 2,
        marginRight: 2,
    }
    ,
    swiper_activeDot: {
        backgroundColor: MainColor,
        width: 12,
        height: 2,
        borderRadius: 1,
        marginLeft: 2,
        marginRight: 2,
    }
    ,
    swiper_pagination: {
        justifyContent: 'flex-end',
        marginRight: 12,
        marginBottom: -20,
    },
    swiper: {
        marginTop: 10,
        height: 180,
    },

    //sItem   轮播图内部样式
    sItem: {
        width: WIDTH,
        height: 180,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',

    },
    sItem_image: {
        width: WIDTH / 4,
        height: 150,
        marginLeft: Hori_MARGIN
    },
    sItem_right: {
        width: WIDTH * 4 / 7,
        height: 140,
        marginLeft: Hori_MARGIN,
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginRight: Hori_MARGIN,
        marginTop: 5,
        marginBottom: 10,
    },
    sItem_title: {
        fontSize: 15,
        color: "#000000"
    },
    sItem_time: {
        fontSize: 13,

    },
    sItem_address: {
        fontSize: 13
    },
    sItem_free: {
        fontSize: 13
    },

    //item FlatList内部item样式
    item: {
        width: WIDTH / 2,
        height: item_HEIGHT,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginVertical: 10
    },
    item_image: {
        width: WIDTH / 4 + 5,
        height: 140,
    },

    item_text_title: {
        width: WIDTH / 2 - 30,
        color: '#3e3e3e',

    },
    loading_Page: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    loading_text: {
        fontSize: 18,
        marginTop: 10
    },
    loading_fail: {
        width: 100,
        height: 60,
        backgroundColor: MainColor,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
    }


})