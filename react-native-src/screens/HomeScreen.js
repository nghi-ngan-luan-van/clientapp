import React, { useEffect, useState } from 'react';
import {
    Dimensions,
    FlatList,
    Image,
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { AppRoute } from '../navigation/app-routes';
import { Colors } from '../utils/AppConfig';
import { getUserCameras } from '../utils/ApiUtils';
import { Icon } from 'react-native-elements';

const WIDTH = Dimensions.get('window').width;

export default function HomeScreen(props) {
    const [cameras, setCameras] = useState(
        props.route && props.route.params && props.route.params.result
    );
    useEffect(() => {
        if (!Array.isArray(cameras) || cameras.length === 0) {
            getCameras(response => {
                if (response && response.result) {
                    setCameras(response.result);
                }
            });
        }
    }, [cameras]);

    const getCameras = async callback => {
        let userToken = await AsyncStorage.getItem('userToken');
        console.log('getCamera');
        await getUserCameras({ userToken }, callback);
    };
    const onPress = camera => () => {
        const { navigation } = props || {};
        navigation &&
            navigation.navigate(AppRoute.CAMERA_DETAIL, {
                screen: AppRoute.CAMERA_STREAM,
                params: {
                    camera: camera,
                    // cameras: cameras,
                    // userToken: userToken,
                },
            });
    };
    const onPressAdd = () => {
        const { navigation } = props || {};
        navigation && navigation.push(AppRoute.ADD_CAMERA);
    };

    const testThumbnail = require('../assets/test.jpg');

    const renderCamera = ({ item, index }) => (
        <View
            style={[
                {
                    backgroundColor: Colors.light,
                    marginBottom: 12,
                    borderRadius: 12,
                    padding: 12,
                    shadowColor: Colors.grey,
                    shadowOffset: { width: 2, height: 2, right: 2 },
                    shadowOpacity: 0.2,
                },
            ]}
        >
            <Text style={styles.cameraName}>{String(item.name)}</Text>
            <TouchableOpacity key={index} onPress={onPress(item)}>
                <Image
                    source={testThumbnail}
                    resizeMode={'cover'}
                    style={[
                        {
                            height: CARD_HEIGHT - 48,
                            width: CARD_WIDTH - 24,
                            borderRadius: 12,
                            alignSelf: 'center',
                        },
                    ]}
                />
                <Image source={require('../assets/ic_video_play.png')} style={styles.iconPlay} />
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                contentContainerStyle={styles.list}
                keyExtractor={(item, index) => 'item' + index}
                data={cameras}
                renderItem={renderCamera}
            />
            <Icon
                type={'font-awesome'}
                name={'plus-circle'}
                color={Colors.grey}
                onPress={onPressAdd}
                size={50}
                // raised={true}
                // style={{ position: 'absolute', top: 100, bottom: 0, elevation: 99 }}
            />
            {/*<Image style={{ width: 60, height: 60 }} source={require('../assets/plus.png')} />*/}
            {/*</Icon>*/}
        </View>
    );
}

const CARD_WIDTH = WIDTH - 24;
const CARD_HEIGHT = (CARD_WIDTH / 7) * 4;
const ICON_SIZE = 42;
const styles = StyleSheet.create({
    backgroundImg: {
        position: 'absolute',
        right: 0,
        top: -50,
        width: WIDTH,
        // overflow: 'hidden',
    },
    camera: {
        flex: 1,
        overflow: 'hidden',
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
    cardView: {
        borderRadius: 16,
        height: CARD_HEIGHT,
        marginBottom: 12,
        width: CARD_WIDTH,
    },
    container: {
        backgroundColor: Colors.screen,
        flex: 1,
    },
    header: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    iconAdd: {
        elevation: 10,
        position: 'absolute',
        right: 24,
        shadowColor: '#000',
        shadowOffset: {
            width: 10,
            height: 10,
        },
        shadowOpacity: 0.4,
        shadowRadius: 3.84,
        top: 0,
    },
    iconPlay: {
        alignContent: 'center',
        height: ICON_SIZE,
        left: (CARD_WIDTH - ICON_SIZE) / 2,
        opacity: 1,
        position: 'absolute',
        shadowColor: '#000',
        shadowOffset: {
            width: 5,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        tintColor: Colors.white,
        top: (CARD_HEIGHT - ICON_SIZE) / 2 - 20,
        width: ICON_SIZE,
        // elevation: 5,
    },
    list: {
        paddingHorizontal: 12,
    },
    row: {
        flex: 1,
        justifyContent: 'space-between',
    },
    title: {
        color: Colors.text,
        fontSize: 38,
        fontWeight: 'bold',
    },
});
