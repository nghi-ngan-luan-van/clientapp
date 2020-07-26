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
import { useSafeArea } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';

const testThumbnail = require('../assets/default_thumb.jpg');
const WIDTH = Dimensions.get('window').width;

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
    const { navigation = {} } = props;

    useFocusEffect(() => {
        navigation.setOptions({
            header: () => <View />,
        });

        Orientation.getOrientation((err, orientation) => {
            if (orientation === 'LANDSCAPE') {
                Orientation.lockToPortrait();
            }
        });
    });
    useEffect(() => {
        getCameras(response => {
            if (response && response.result) {
                const { result } = response;
                setCameras(result);
                setInitCameras(result);
                setLoading(false);
                // console.log(response.result);
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
        // const { navigation } = props || {};
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

    const searchCamera = value => {
        console.log('aaaa', value);
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
        navigation && navigation.push(AppRoute.ADD_CAMERA);
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
                        <View style={{ flex: 1, marginLeft: 10 }}>
                            <Text style={styles.cameraName}>{String(item.name)}</Text>
                            <Text style={{ fontSize: 10 }}>Live</Text>
                        </View>
                        <Image
                            source={require('../assets/video.png')}
                            style={{ width: 30, height: 30 }}
                        />
                    </View>
                </TouchableOpacity>
            </View>
        );
    };

    if (loading) {
        return (
            <View style={{ flex: 1, backgroundColor: Colors.white }}>
                <Image
                    source={require('../assets/preview.gif')}
                    resizeMode={'contain'}
                    style={{ width: WIDTH }}
                />
            </View>
        );
    } else {
        return (
            <LinearGradient
                colors={[Colors.brandy_rose, Colors.white, Colors.purple_blue]}
                style={[styles.container, { paddingTop: insets.top }]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            >
                <View>
                    <View style={styles.headerBar}>
                        <Text style={styles.headerTitle}>C L O M E R A</Text>
                        {/*<Icon name={'search'} size={30} onPress={() => {}} />*/}
                        <TouchableOpacity
                            onPress={() => {
                                onPressAdd();
                            }}
                        >
                            <Image
                                style={{ margin: 12, width: 30, height: 30 }}
                                source={require('../assets/icon_add.png')}
                            />
                        </TouchableOpacity>
                    </View>
                    <SearchBar
                        onBlur={() => {
                            // console.log('34252', value);
                            setSearchLoading(false);
                        }}
                        round={true}
                        // rightIconContainerStyle={{ padding: 5 }}
                        clearTextOnFocus
                        // showCancel={true}
                        // showLoading={!searchLoad}
                        clearButtonMode={'while-editing'}
                        // clearIcon=<Icon name={'clean'} type={'font-awesome'} size={20} />
                        placeholder="Tìm camera..."
                        onChangeText={updateSearch}
                        value={search}
                        lightTheme
                        containerStyle={{ backgroundColor: 'transparent', borderWidth: 0 }}
                        inputContainerStyle={{ backgroundColor: Colors.white, opacity: 0.6 }}
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
                                    width: WIDTH - 50,
                                    resizeMode: 'contain',
                                    overflow: 'hidden',
                                }}
                            />
                        )}
                    />
                    {/*<Icon*/}
                    {/*    type={'font-awesome'}*/}
                    {/*    name={'plus-circle'}*/}
                    {/*    color={Colors.grey}*/}
                    {/*    onPress={onPressAdd}*/}
                    {/*    size={50}*/}
                    {/*/>*/}
                    {/*<Image style={{ width: 60, height: 60 }} source={require('../assets/plus.png')} />*/}
                    {/*</Icon>*/}
                </View>
            </LinearGradient>
        );
    }
}

const CARD_WIDTH = (WIDTH - 36) / 2;
const CARD_HEIGHT = (CARD_WIDTH / 16) * 9;
const ICON_SIZE = 42;
const styles = StyleSheet.create({
    headerBar: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
    },
    headerTitle: {
        fontSize: 25,
        color: Colors.white,
        flex: 1,
        fontWeight: 'bold',
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
        // shadowColor: Colors.grey,
        // shadowOffset: { width: 2, height: 2, right: 2 },
        // shadowOpacity: 0.2,
        // elevation: 5,
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
});
