/**
 * Created by AA on 2017/11/9.
 *
 * 活动详情
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
}from 'react-native';

import DetailItem from '../../widget/DetailItem';
import LinearGradient from 'react-native-linear-gradient';
import {WIDTH, HEIGHT, jumpPage, toastShow}  from '../../utils/util';
import TouchView from '../../widget/TouchView';
// const MainColor='#b03d29';
const MainColor = '#dc5039';



export default class Detail extends Component {


    // 构造
    constructor(props) {
        super(props);
        // 初始状态

        const {params} = this.props.navigation.state;
        let item = params.item;
        if (item == null || item == '') {
            Alert.alert('', "空");
        }
        this.state = {
            loadingState: 'OK',
            item: item,
        };
    }

    _clickToUser() {
        const {navigate} = this.props.navigation;

        // toastShow('' + this.state.item.owner.id);

        jumpPage(navigate, 'UserEvents', {
            userId: this.state.item.owner.id,
            name: this.state.item.owner.name
        });
    }

    _webHasLoad() {
        this.setState({
            loadingState: 'OK'
        })
        // ToastAndroid.show('详情加载完成', ToastAndroid.SHORT);
        // toastShow("详情加载完成");
    }

    _webIsError() {
        this.setState({
            loadingState: 'error'
        })
        // ToastAndroid.show('加载失败', ToastAndroid.SHORT);
        toastShow('加载失败');
    }

    //根据加载状态返回View？
    renderWebView() {

        let item = this.state.item;

        Alert.alert('', '渲染WebView');

        let HTML = item.content.anchor('myHTML');

        if (this.state.loadingState == 'loading') {
            return (
                <View style={{width: WIDTH, height: 80, justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{fontSize: 20}}>详情正在加载....</Text>
                </View>
            );
        } else if (this.state.loadingState == 'OK') {
            return (
                <WebView
                    style={{width: WIDTH, height: 3 * HEIGHT / 2}}
                    scalesPageToFit={true}
                    source={{html: HTML}}
                    onLoad={() => {
                        this._webHasLoad()
                    }}
                    onError={() => {
                        this._webIsError()
                    }}
                    startInLoadingState={true}
                    domStorageEnabled={true}
                    javaScriptEnabled={true}
                />
            );
        } else if (this.state.loadingState == 'error') {
            return (
                <View style={{width: WIDTH, height: 80, justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{fontSize: 20}}>详情加载失败</Text>
                </View>
            );
        }


    }

    render() {

        let item = this.state.item;

        let HTML = item.content.anchor('myHTML');


        return (
            <View>
                <View style={styles.head}>
                    <Text style={styles.head_text}>同城活动</Text>
                </View>


                <ScrollView>

                    <View
                        style={styles.show_image_view}>
                        <Image style={styles.show_image}
                               source={{uri: item.image_hlarge}}
                        />
                    </View>

                    <View style={{backgroundColor: '#ffffff', paddingLeft: 10, paddingRight: 10}}>
                        <Text style={{fontSize: 20, color: '#000000', marginVertical: 15}}>{item.title}</Text>

                        <View style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}>
                            <Text>{item.wisher_count}人参与 / </Text>
                            <Text>{item.participant_count}人感兴趣</Text>
                        </View>

                        <View style={{width: WIDTH - 20, height: 20, backgroundColor: '#ffffff'}}></View>

                        <DetailItem title='余票' value={item.has_ticket ? "有票" : '无票'}/>
                        <DetailItem title='活动时间' value={item.begin_time}/>
                        <DetailItem title='位置' value={item.address}/>
                        <DetailItem title='费用' value={item.fee_str}/>
                        {/*<DetailItem title='主办者' value={item.owner.name} onPress={() => {*/}
                        {/*this._clickToUser();*/}
                        {/*}}/>*/}

                        <TouchView onPress={() => this._clickToUser()}>
                            <View
                                style={{
                                    width: WIDTH - 20,
                                    height: 60,
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',

                                }}>
                                <Text style={{fontSize: 18, marginLeft: 10, color: '#232323'}}>发起者</Text>
                                <LinearGradient
                                    colors={[MainColor, "#ffa17f"]}
                                    style={{
                                        borderRadius: 10,
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        marginRight: 10,
                                    }}>
                                    <Text style={{fontSize: 18, margin: 5, color: '#233232'}}>{item.owner.name}</Text>
                                    <Image source={require('../../source/arrow.png')}
                                           style={{width: 30, height: 30, margin: 10}}
                                    />
                                </LinearGradient>
                            </View>
                        </TouchView>

                        <View style={{width: WIDTH, height: 1, backgroundColor: '#333333'}}></View>

                        <Text style={{fontSize: 18, margin: 10}}>活动详情：</Text>

                    </View>


                    {/*{this.renderWebView()}*/}

                    <WebView
                        style={{width: WIDTH, height: 3 * HEIGHT / 2}}
                        scalesPageToFit={true}
                        source={{html: HTML}}
                        onLoad={() => {
                            this._webHasLoad()
                        }}
                        onError={() => {
                            this._webIsError()
                        }}
                        startInLoadingState={true}
                        domStorageEnabled={true}
                        javaScriptEnabled={true}
                    />

                    {/*<Text>{item.content}</Text>*/}
                </ScrollView>

            </View>

        );
    }

}

const styles = StyleSheet.create({

    head: {
        width: WIDTH,
        height: 60,
        backgroundColor: MainColor,
        justifyContent: 'center',
        alignItems: 'center'
    },
    head_text: {
        fontSize: 21,
        color: '#ffffff'
    },
    show_image_view: {
        justifyContent: "center",
        alignItems: 'center',
    },
    show_image: {
        width: WIDTH / 2,
        height: 300,
        marginVertical: 20,
    },


})