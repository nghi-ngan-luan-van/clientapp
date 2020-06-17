import React, {useEffect, useRef, useState} from 'react';
import {Dimensions, FlatList, Image, Platform, StyleSheet, Text, TouchableOpacity, View,} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {AppRoute} from '../navigation/app-routes';
import {Colors} from '../utils/AppConfig'
import {getUserCameras} from "../utils/ApiUtils";

const WIDTH = Dimensions.get('window').width;

export const Header = ({navigation = {}}) => (
    <View
        style={{
            top: 0,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 12,
            paddingTop:Platform.OS === 'ios' ? 60:0
        }}>
        <Text style={styles.title}>Clomera</Text>
    </View>
);

export default function HomeScreen(props) {
    const [cameras, setCameras] = useState(props.route && props.route.params && props.route.params.result);
    const [link, setLink] = useState('https://vjs.zencdn.net/v/oceans.mp4')
    const vlcref = useRef()
    // paused={this.state.paused}
    // onProgress={this.onProgress.bind(this)}
    // onEnd={this.onEnded.bind(this)}
    // onBuffering={this.onBuffering.bind(this)}
    // onError={this._onError}
    // onStopped={this.onStopped.bind(this)}
    // onPlaying={this.onPlaying.bind(this)}
    // onPaused={this.onPaused.bind(this)}

    useEffect(() => {
        if (!Array.isArray(cameras) || cameras.length === 0) {
            getCameras((response) => {
                if (response && response.result) {
                    setCameras(response.result)
                }
            })
        }

    }, []);

    const getCameras = async (callback) => {
        let userToken = await AsyncStorage.getItem('userToken');
        console.log('getCamera')
        await getUserCameras({userToken}, callback);
    }
    const onPress = (camera) => () => {
        const {navigation} = props || {};
        navigation &&
        navigation.navigate(AppRoute.CAMERA_DETAIL, {
                screen: AppRoute.CAMERA_STREAM,
                params: {
                    camera: camera,
                    cameras: cameras,
                }
            }
        );
    };
    const onPressAdd = () => {
        const {navigation} = props || {};
        navigation && navigation.push(AppRoute.ADD_CAMERA)
    };

    const testThumbnail = require('../assets/test.jpg');
    const url = 'https://clientapp.sgp1.digitaloceanspaces.com/5ed3e22848d6943ed70ec47f/10_6_2020/_002.mp4'
    const url1 = 'https://clientapp.sgp1.digitaloceanspaces.com/5ed3e22848d6943ed70ec47f/10_6_2020/_003.mp4';
    const link2 = "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
    // as pause
    const [pause1, setpause1] = useState(false)
    const [pause2, setpause2] = useState(true)
    const [pause3, setpause3] = useState(true)
    const renderCamera = ({item, index}) => (
        <View>
            <Text style={styles.cameraName}>{String(item.name)}</Text>
            <TouchableOpacity key={index} onPress={onPress(item)} style={styles.cardView}>
                <Image
                    source={testThumbnail}
                    resizeMode={'cover'}
                    style={styles.cardView}
                />
                <Image
                    source={require('../assets/ic_video_play.png')}
                    style={styles.iconPlay}
                />
            </TouchableOpacity>
        </View>
    );
    const onPressTest = () => {
        vlcref.play();
    }
// console.log(vlcref)
// console.log(link)
    return (
        <View style={styles.container}>
            <Image
                style={styles.backgroundImg}
                source={require('../assets/background.png')}
            />
            <Header navigation={props.navigation}/>
            {/*<VLCPlayerView*/}
            {/*    source={{uri:link}}*/}
            {/*/>*/}
            <FlatList
                contentContainerStyle={styles.list}
                keyExtractor={(item, index) => 'item' + index}
                // keyExtractor={({item, index}) => index}
                data={cameras}
                renderItem={renderCamera}
            />
            <TouchableOpacity
                style={styles.iconAdd}
                onPress={onPressAdd}>
                <Image
                    style={{width: 42, height: 42}}
                    source={require('../assets/plus.png')}
                />
            </TouchableOpacity>
        </View>
    );
};

const CARD_WIDTH = (WIDTH - 24);
const CARD_HEIGHT = (CARD_WIDTH / 7) * 4;
const ICON_SIZE = 42;
const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.screen,
        flex: 1,
    },
    list: {
        paddingHorizontal: 12,

    },
    row: {
        flex: 1,
        justifyContent: 'space-between',
    },
    cardView: {
        borderRadius: 16,
        width: CARD_WIDTH,
        marginBottom: 12,
        height: CARD_HEIGHT,

    },
    title: {
        color: Colors.text,
        fontSize: 38,
        fontWeight: 'bold',
    },
    backgroundImg: {
        position: 'absolute',
        top: 0,
        right: 0,
        width: WIDTH,
        overflow: 'hidden',
    },
    camera: {
        overflow: 'hidden',
        flex: 1,
        paddingBottom: 12,
        width: WIDTH,
    },
    cameraName: {
        fontSize: 14,
        color: Colors.text,
        flex: 1,
        marginTop: 15,
        marginBottom: 10,
    },
    iconPlay: {
        position: 'absolute',
        alignContent: 'center',
        tintColor: Colors.white,
        height: ICON_SIZE,
        width: ICON_SIZE,
        opacity: 1,
        top: (CARD_HEIGHT - ICON_SIZE) / 2,
        left: (CARD_WIDTH - ICON_SIZE) / 2,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        // elevation: 5,
    },
    iconAdd: {
        position: 'absolute',
        width: 42,
        height: 42,
        bottom: 40,
        right: 24,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 10,
    }

});
