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
import { SearchBar, Icon } from 'react-native-elements';
import Orientation from 'react-native-orientation';
import { useFocusEffect } from '@react-navigation/native';
import { AuthContext } from '../navigation/AppNavigator';

const testThumbnail = require('../assets/default_thumb.jpg');
const WIDTH = Dimensions.get('window').width;
export default function HomeScreen(props) {
    const { signOut } = React.useContext(AuthContext);
    const initialCameraList = props.route && props.route.params && props.route.params.result;
    const [cameras, setCameras] = useState(initialCameraList);
    const [refresh, setRefresh] = useState(false);
    const [userToken, setuserToken] = useState('');
    const [search, setSearch] = useState('');
    const [isEmpty, setEmpty] = useState(false);

    useFocusEffect(() =>
        Orientation.getOrientation((err, orientation) => {
            if (orientation === 'LANDSCAPE') {
                Orientation.lockToPortrait();
            }
        })
    );

    useEffect(() => {
        getCameras(response => {
            if (response && response.result) {
                setCameras(response.result);
            } else {
                signOut();
            }
        });
    }, []);

    const getCameras = async callback => {
        let userToken = await AsyncStorage.getItem('userToken');
        setuserToken(userToken);
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
    const searchCamera = value => {
        if (!value) {
            setCameras(initialCameraList);
        } else {
            const result =
                Array.isArray(initialCameraList) &&
                initialCameraList.filter(
                    item => item.name && item.name.toLowerCase().indexOf(value.toLowerCase()) !== -1
                );
            console.log(search);
            console.log(result);
            if (result.length == 0) {
                setEmpty(true);
            }
            setCameras(result);
        }
    };
    const updateSearch = value => {
        setSearch(value);
        searchCamera(value);
    };

    const renderCamera = ({ item, index }) => {
        const thumnail = { uri: item.thumbnail };

        return (
            <View style={styles.card}>
                <TouchableOpacity key={index} onPress={onPress(item)}>
                    <Image
                        source={thumnail.uri ? thumnail : testThumbnail}
                        resizeMode={'cover'}
                        style={styles.thumbnail}
                    />
                    <View style={styles.nameRow}>
                        {/*<Image*/}
                        {/*    source={require('../assets/cctv.png')}*/}
                        {/*    style={{ width: 18, height: 18 }}*/}
                        {/*/>*/}
                        <View style={{ flex: 1, marginLeft: 10 }}>
                            <Text style={styles.cameraName}>{String(item.name)}</Text>
                            <Text style={{ fontSize: 10 }}>Live</Text>
                        </View>
                        <Image
                            source={require('../assets/video.png')}
                            style={{ width: 30, height: 30 }}
                        />
                    </View>
                    {/*<Image source={require('../assets/ic_video_play.png')} style={styles.iconPlay} />*/}
                </TouchableOpacity>
            </View>
        );
    };
    return (
        <View style={styles.container}>
            <SearchBar
                focusable={true}
                onBlur={() => {}}
                placeholder="Tìm camera..."
                onChangeText={updateSearch}
                value={search}
                lightTheme
                containerStyle={{ backgroundColor: 'transparent' }}
                inputContainerStyle={{ backgroundColor: Colors.white }}
            />

            <FlatList
                contentContainerStyle={styles.list}
                keyExtractor={(item, index) => 'item' + index}
                data={cameras}
                columnWrapperStyle={{ justifyContent: 'space-between' }}
                numColumns={2}
                renderItem={renderCamera}
                refreshing={refresh}
                onRefresh={async () => {
                    setRefresh(true);
                    await getUserCameras({ userToken }, response => {
                        if (response && response.result) {
                            setCameras(response.result);
                        }
                        setRefresh(false);
                    });
                }}
                ListEmptyComponent={() => (
                    <Image
                        source={require('../assets/empty.gif')}
                        style={{
                            flex: 1,
                            alignSelf: 'center',
                            width: WIDTH,
                            resizeMode: 'contain',
                            overflow: 'hidden',
                        }}
                    />
                )}
            />
            <Icon
                type={'font-awesome'}
                name={'plus-circle'}
                color={Colors.grey}
                onPress={onPressAdd}
                size={50}
            />
            {/*<Image style={{ width: 60, height: 60 }} source={require('../assets/plus.png')} />*/}
            {/*</Icon>*/}
        </View>
    );
}

const CARD_WIDTH = (WIDTH - 36) / 2;
const CARD_HEIGHT = (CARD_WIDTH / 16) * 9;
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
    nameRow: {
        alignContent: 'center',
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
        padding: 12,
    },
    cameraName: {
        fontSize: 16,
        color: Colors.violet,
        flex: 1,
        // margin: 12,
        fontWeight: 'bold',
    },
    card: {
        backgroundColor: Colors.white,
        marginBottom: 12,
        borderRadius: 12,
        shadowColor: Colors.grey,
        shadowOffset: { width: 2, height: 2, right: 2 },
        shadowOpacity: 0.2,
        elevation: 5,
    },
    cardView: {
        borderRadius: 16,
        height: CARD_HEIGHT,
        marginBottom: 12,
        width: CARD_WIDTH,
    },
    thumbnail: {
        height: CARD_HEIGHT,
        width: CARD_WIDTH,
        alignSelf: 'center',
        overflow: 'hidden',
        resizeMode: 'cover',
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
    },
    container: {
        backgroundColor: Colors.whisper,
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
        padding: 12,
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
    empty: {
        alignSelf: 'center',
        width: WIDTH / 2,
    },
});
