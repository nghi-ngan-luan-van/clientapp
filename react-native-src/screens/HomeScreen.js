import React, {useEffect, useState} from 'react';
import {Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View,} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {AppRoute} from '../navigation/app-routes';
import {HOST_URL} from '../utils/AppConst';
import {Colors} from '../utils/AppConfig'

const WIDTH = Dimensions.get('window').width;
export const Header = ({navigation = {}}) => (
    <View
        style={{
            top: 0,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 12,
        }}>
        <Text style={styles.title}>Clomera</Text>
    </View>
);

export default HomeScreen = (props) => {
    const [cameras, setCameras] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);
    const fetchData = async () => {
        let token = await AsyncStorage.getItem('userToken');
        const requestOptions = {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
            redirect: 'follow',
        };
        const fetchUrl = HOST_URL + 'camera/listcam';

        await fetch(fetchUrl, requestOptions)
            .then((response) => response.text())
            .then((result) => {

                if (result && result.statusCode == 403) {
                }
                setCameras(JSON.parse(result).result);
                console.log(result)
            })
            .catch((error) => console.log('error', error));
    };

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

    return (
        <View style={styles.container}>
            <Image
                style={styles.backgroundImg}
                source={require('../assets/background.png')}
            />
            <Header navigation={props.navigation}/>
            <FlatList
                contentContainerStyle={styles.list}
                keyExtractor={({item, index}) => index}
                data={cameras}
                renderItem={(cam) => renderCamera(cam)}
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
        elevation: 5,
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
