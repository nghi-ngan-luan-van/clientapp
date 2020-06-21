import React, {useEffect, useState} from 'react';
import {Dimensions, FlatList, Image, Platform, StyleSheet, Text, TouchableOpacity, View,} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {AppRoute} from '../navigation/app-routes';
import {Colors} from '../utils/AppConfig'
import {getUserCameras} from "../utils/ApiUtils";
import {SafeAreaView} from "react-native-safe-area-context";

const WIDTH = Dimensions.get('window').width;

export const Header = ({navigation = {}}) => (
    <View
        style={styles.header}>
        <Text style={styles.title}>Home</Text>
    </View>
);

export default function HomeScreen(props) {
    const [cameras, setCameras] = useState(props.route && props.route.params && props.route.params.result);
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

    const renderCamera = ({item, index}) => (
        <View style={[{backgroundColor: Colors.light,marginBottom:12, borderRadius:12,padding :12,shadowColor:'#000', shadowOffset:{width: 5,height: 5}, shadowOpacity:0.4}]}>
            <Text style={styles.cameraName}>{String(item.name)}</Text>
            <TouchableOpacity key={index} onPress={onPress(item)} >
                <Image
                    source={testThumbnail}
                    resizeMode={'cover'}
                    style={[{height: CARD_HEIGHT - 48, width: CARD_WIDTH - 24, borderRadius: 12, alignSelf:'center'}]}
                />
                <Image
                    source={require('../assets/ic_video_play.png')}
                    style={styles.iconPlay}
                />
            </TouchableOpacity>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <Image
                style={styles.backgroundImg}
                source={require('../assets/background.png')}
            />
            <Header navigation={props.navigation}/>

            <FlatList
                contentContainerStyle={styles.list}
                keyExtractor={(item, index) => 'item' + index}
                data={cameras}
                renderItem={renderCamera}
            />
            <TouchableOpacity
                style={styles.iconAdd}
                onPress={onPressAdd}>
                <Image
                    style={{width: 60, height: 60}}
                    source={require('../assets/plus.png')}
                />
            </TouchableOpacity>
        </SafeAreaView>
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
    header:
        {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
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
        // marginTop: 15,
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
        top: 60,
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
