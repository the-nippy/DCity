/**
 * 用户发起 参加 感兴趣的活动
 */

import React, {Component} from 'react';
import {
    Text,
    View,
    Alert,
    WebView,
    ScrollView,
    StyleSheet,
    Image,
    ToastAndroid,
    ListView,
    ActivityIndicator,
}from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

import {WIDTH, HEIGHT, ds, toastShow, jumpPage}  from '../../utils/util';
import HoriText from '../../widget/HoriText';
import TouchView from '../../widget/TouchView';
import HttpManager from '../../data/http/HttpManager';
import Error from '../../data/http/Error'
const httpManager = new HttpManager();
const MainColor = '#dc5039';

const CREATED = 'user_created', PARTICIPATED = 'user_participated', WISHED = 'user_wished';

var userId = '', userName = '';

const Hori_MARGIN = 10;

export default class UserEvents extends Component {

    // 构造
    constructor(props) {
        super(props);
        // 初始状态

        this.state = {
            eventsObject: '',
            //用户发起的还是参加的还是感兴趣的
            typeOfUser: CREATED,
            // userId: '',
            loadingState: ''
        };

        const {params} = this.props.navigation.state;
        userId = params.userId;
        userName = params.name;

        this.getData(CREATED);
    }

    // componentWillMount() {
    //     this.getData();
    // }

    getData(typeOfUser) {

        httpManager.getUserEvents(typeOfUser, userId).then(
            (eventsString) => {
                if (eventsString != null && eventsString != '') {
                    this.setState({
                        eventsObject: eventsString,
                        //userId: userId
                    })
                } else {
                    this.setState({loadingState: 'NO_DATA'});
                }
            }
        ).catch((error) => {
            if (error != null && error instanceof Error) {
                toastShow(error.getErrorMsg());
                this.setState({loadingState: 'FAIL'});
            }
        })
    }

    _toggleType(typeOfUser) {
        this.setState({
            typeOfUser: typeOfUser,
            eventsObject: '',
        })

        setTimeout(() => {
            this.getData(typeOfUser);
        }, 200)
    }

    _renderEventRow = (rowData, sectionId, rowId) => {

        return (
            <TouchView
                onPress={() => {
                    const {navigate} = this.props.navigation;
                    jumpPage(navigate, 'Detail', {item: rowData});

                }}
            >
                <View style={styles.sItem}>
                    <Image style={styles.sItem_image}
                           source={{uri: rowData.image}}
                    />
                    <View style={styles.sItem_right}>
                        <Text style={styles.sItem_title}>{rowData.title}</Text>
                        <HoriText title='时间：' content={rowData.begin_time} style={styles.sItem_time}/>
                        <HoriText title='地点：' content={rowData.address}/>
                        <HoriText title='标签：' content={rowData.category_name + " / " + rowData.tags}/>
                    </View>
                </View>
            </TouchView>
        );
    }

    _renderLoading() {
        if (this.state.loadingState == "FAIL") {
            return (
                <TouchView onPress={() => {
                    this.setState({
                        loadingState: 'loading',
                    })
                    this.getData(this.state.typeOfUser);
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

    renderList() {
        let events = this.state.eventsObject.events;
        if (events == null || events == []) {
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
            if (events.length > 0) {
                return (
                    <View>
                        <ListView
                            enableEmptySections={true}
                            dataSource={ds.cloneWithRows(this.state.eventsObject.events)}
                            renderRow={this._renderEventRow}
                        ></ListView>
                    </View>

                );
            } else {
                return (
                    <View><Text style={{fontSize: 21, margin: 30}}>没有相关数据</Text></View>
                );
            }


        }
    }

    render() {

        return (
            <View>

                <View style={{
                    width: WIDTH, height: 60, backgroundColor: '#cdcdbf',
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    alignItems: 'center',
                }}>
                    <Text style={{fontSize: 20, marginLeft: 10, color: "#333333", width: WIDTH / 3}}>{userName}</Text>
                    <View
                        style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginRight: 5}}>
                        <TouchView onPress={() => this._toggleType(CREATED)}>
                            <View style={this.state.typeOfUser == CREATED ? styles.tab_selected : styles.tab_normal}>
                                <Text>他发起的</Text></View>
                        </TouchView>
                        <TouchView onPress={() => this._toggleType(PARTICIPATED)}>
                            <View
                                style={this.state.typeOfUser == PARTICIPATED ? styles.tab_selected : styles.tab_normal}>
                                <Text>他参加的</Text></View>
                        </TouchView>
                        <TouchView onPress={() => this._toggleType(WISHED)}>
                            <View style={this.state.typeOfUser == WISHED ? styles.tab_selected : styles.tab_normal}>
                                <Text>他感兴趣的</Text></View></TouchView>
                    </View>
                </View>

                {this.renderList()}
            </View>
        );


    }
}

const
    styles = StyleSheet.create({
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
        tab_normal: {
            marginHorizontal: 2,
            width: WIDTH / 5,
            height: 36,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#ffffff',
            borderRadius: 8,
        },
        tab_selected: {
            marginHorizontal: 2,
            width: WIDTH / 5,
            height: 36,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: MainColor,
            borderRadius: 8,
        },
        loading_Page: {
            // flex: 1,
            width: WIDTH, height: HEIGHT - 80,
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