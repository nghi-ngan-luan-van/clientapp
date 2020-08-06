import React, { useEffect, useState, useRef } from 'react';
import {
    Dimensions,
    FlatList,
    Image,
    Animated,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { AppRoute } from '../navigation/app-routes';
import { Colors } from '../utils/AppConfig';
import { getUserCameras } from '../utils/ApiUtils';
import { SearchBar, Icon } from 'react-native-elements';
import Orientation from 'react-native-orientation';
import { useFocusEffect } from '@react-navigation/native';
import { AuthContext } from '../navigation/AppNavigator';
import { useSafeArea } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';

// const testThumbnail = require('../assets/camera.gif');
const testThumbnail = require('../assets/security_camera.png');
const WIDTH = Dimensions.get('window').width;
const FadeInView = props => {
    const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0

    React.useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
        }).start();
    }, [fadeAnim]);

    return (
        <Animated.View // Special animatable View
            style={{
                ...props.style,
                opacity: fadeAnim, // Bind opacity to animated value
            }}
        >
            {props.children}
        </Animated.View>
    );
};

export default function HomeScreen(props) {
    const insets = useSafeArea();
    const { signOut } = React.useContext(AuthContext);
    const [cameras, setCameras] = useState([]);
    const [initialCameraList, setInitCameras] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const [userToken, setuserToken] = useState('');
    const [search, setSearch] = useState('');
    const [isEmpty, setEmpty] = useState(false);
    const [loading, setLoading] = useState(true);
    const [searchLoad, setSearchLoading] = useState(false);
    const [isShowName, setShow] = useState(true);
    const { navigation = {} } = props;
    const fadeAnim = useRef(new Animated.Value(1)).current; // Initial value for opacity: 0
    const searchAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0
    const translateX = searchAnim.interpolate({ inputRange: [0, 1], outputRange: ['10%', '100%'] });
    useFocusEffect(() => {
        Orientation.getOrientation((err, orientation) => {
            if (orientation === 'LANDSCAPE') {
                Orientation.lockToPortrait();
            }
        });
    });
    const onSearchIcon = () => {
        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 1000,
        }).start(() => {
            Animated.timing(searchAnim, {
                toValue: 1,
                duration: 1000,
            }).start();
            setShow(false);
        });
    };

    const onOutSearch = () => {
        Animated.timing(searchAnim, {
            toValue: 0,
            duration: 1000,
        }).start(() => {
            setShow(true);
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 1000,
            }).start();
        });
    };

    useEffect(() => {
        getCameras(response => {
            if (response && response.result) {
                const { result } = response;
                setCameras(result);
                setInitCameras(result);
                setLoading(false);
            } else {
                signOut();
            }
        });
    }, [props]);

    const getCameras = async callback => {
        let userToken = await AsyncStorage.getItem('userToken');
        setuserToken(userToken);
        await getUserCameras({ userToken }, callback);
    };

    const onPress = camera => () => {
        // const { navigation } = props || {};
        navigation &&
            navigation.navigate(AppRoute.CAMERA_DETAIL, {
                screen: AppRoute.CAMERA_STREAM,
                params: {
                    camera: camera,
                    reload: () => getCameras(),
                },
            });
    };

    const searchCamera = value => {
        if (!value || value.length == 0) {
            setCameras(initialCameraList);
        } else {
            const result =
                Array.isArray(initialCameraList) &&
                initialCameraList.filter(
                    item => item.name && item.name.toLowerCase().indexOf(value.toLowerCase()) !== -1
                );
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

    const onPressAdd = () => {
        navigation && navigation.navigate(AppRoute.ADD_CAMERA);
    };

    const renderCamera = ({ item, index }) => {
        const { backupMode } = item;
        const thumnail = { uri: item.thumbnail };
        const thumnailSource = thumnail.uri ? thumnail : testThumbnail;
        const customStyle = thumnail.uri ? {} : { width: 40, height: 40 };

        return (
            <TouchableOpacity style={[styles.card]} key={index} onPress={onPress(item)}>
                <View style={[styles.thumbnail]}>
                    <Image
                        source={thumnailSource}
                        resizeMode={'cover'}
                        style={[styles.thumbnail, customStyle]}
                    />
                </View>
                <View style={styles.nameRow}>
                    <Text style={styles.cameraName}>{String(item.name)}</Text>
                    {!!backupMode && (
                        // <View style={styles.dot} />
                        <Image
                            source={require('../assets/ic_rec.png')}
                            resizeMode={'contain'}
                            style={styles.dot}
                        />
                    )}
                </View>
            </TouchableOpacity>
        );
    };
    const renderLoading = () => {
        return (
            <LinearGradient
                colors={[Colors.purple_blue, Colors.white]}
                style={[styles.container, { paddingTop: insets.top }]}
                start={{ x: 1, y: 0 }}
                end={{ x: 1, y: 1 }}
            >
                <Text style={styles.headerTitle}>C L O M E R A</Text>
                <ActivityIndicator animating={true} />
            </LinearGradient>
        );
    };

    if (loading) {
        return renderLoading();
    } else {
        return (
            <LinearGradient
                colors={[Colors.purple_blue, Colors.white]}
                style={[styles.container, { paddingTop: insets.top }]}
                start={{ x: 1, y: 0 }}
                end={{ x: 1, y: 1 }}
            >
                <View style={styles.headerBar}>
                    {isShowName && (
                        <Animated.Text style={[styles.headerTitle, { opacity: fadeAnim }]}>
                            C L O M E R A
                        </Animated.Text>
                    )}
                    {isShowName && (
                        <Icon
                            // style={{ flex: 1 }}
                            name={'search'}
                            size={30}
                            onPress={onSearchIcon}
                            color={Colors.white}
                        />
                    )}
                    {!isShowName && (
                        <Animated.View style={{ opacity: searchAnim, flex: 1, width: translateX }}>
                            <SearchBar
                                autoFocus
                                onBlur={onOutSearch}
                                // inputStyle={{ flex: 1, width: '100%' }}
                                style={{
                                    backgroundColor: 'white',
                                    width: '100%',
                                    flex: 1,
                                }}
                                // inputStyle={{ backgroundColor: 'red' }}
                                round={true}
                                // rightIconContainerStyle={{ padding: 5 }}
                                clearTextOnFocus
                                // showCancel={true}
                                // showLoading={!searchLoad}
                                clearButtonMode={'never'}
                                placeholder="Tìm camera..."
                                onChangeText={updateSearch}
                                value={search}
                                lightTheme
                                containerStyle={{
                                    backgroundColor: 'transparent',
                                    borderWidth: 0, //no effect
                                    // shadowColor: 'white', //no effect
                                    borderBottomColor: 'transparent',
                                    borderTopColor: 'transparent',
                                }}
                                inputContainerStyle={{
                                    backgroundColor: Colors.white,
                                    opacity: 0.9,
                                }}
                            />
                        </Animated.View>
                    )}
                    <Icon
                        name={'plus'}
                        raised={true}
                        type={'antdesign'}
                        color={Colors.purple_blue}
                        onPress={onPressAdd}
                    />
                </View>

                <FlatList
                    showsVerticalScrollIndicator={false}
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
                        <Image source={require('../assets/empty.gif')} style={styles.emptyGif} />
                    )}
                />
            </LinearGradient>
        );
    }
}

const RADIUS = 10;
const CARD_WIDTH = (WIDTH - 36) / 2;
const CARD_HEIGHT = (CARD_WIDTH / 16) * 9;
const styles = StyleSheet.create({
    headerBar: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
    },
    headerTitle: {
        fontSize: 27,
        color: Colors.white,
        flex: 1,
        fontWeight: 'bold',
        // opacity: 0.8,
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
        padding: 10,
        backgroundColor: Colors.white,
        borderBottomLeftRadius: RADIUS,
        borderBottomRightRadius: RADIUS,
    },
    cameraName: {
        fontSize: 16,
        color: Colors.purple_blue,
        flex: 1,
        fontWeight: 'bold',
    },
    card: {
        marginBottom: 12,
    },
    dot: {
        height: 16,
        width: 16,
        borderRadius: 6,
        // marginRight: 6,
        // backgroundColor: Colors.alert,
    },
    thumbnail: {
        height: CARD_HEIGHT,
        width: CARD_WIDTH,
        alignSelf: 'center',
        overflow: 'hidden',
        justifyContent: 'center',
        resizeMode: 'cover',
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        backgroundColor: Colors.white,
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
    icon: { margin: 12, width: 30, height: 30 },

    list: {
        paddingHorizontal: 12,
        paddingBottom: 120,
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
    emptyGif: {
        flex: 1,
        alignSelf: 'center',
        width: WIDTH - 50,
        resizeMode: 'contain',
        overflow: 'hidden',
    },
});
