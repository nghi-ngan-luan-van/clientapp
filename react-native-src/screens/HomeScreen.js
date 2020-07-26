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

const testThumbnail = require('../assets/camera.gif');
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
        const thumnail = { uri: item.thumbnail };

        return (
            <TouchableOpacity style={styles.card} key={index} onPress={onPress(item)}>
                <Image
                    source={thumnail.uri ? thumnail : testThumbnail}
                    resizeMode={'cover'}
                    style={styles.thumbnail}
                />
                <View style={styles.nameRow}>
                    {!!(item && item.backupMode) && <View style={styles.dot} />}
                    {/*<View style={{ flex: 1 }}>*/}
                    <Text style={styles.cameraName}>{String(item.name)}</Text>
                    {/*<Text style={{ fontSize: 10 }}>Live</Text>*/}
                    {/*</View>*/}
                    {/*<Image*/}
                    {/*    source={require('../assets/video.png')}*/}
                    {/*    style={{ width: 30, height: 30 }}*/}
                    {/*/>*/}
                </View>
            </TouchableOpacity>
        );
    };

    if (loading) {
        return (
            <LinearGradient
                colors={[Colors.brandy_rose, Colors.white, Colors.purple_blue]}
                style={[styles.container, { paddingTop: insets.top }]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            />
        );
    } else {
        return (
            <LinearGradient
                colors={[Colors.brandy_rose, Colors.white, Colors.purple_blue]}
                style={[styles.container, { paddingTop: insets.top }]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            >
                <View style={styles.headerBar}>
                    <Text style={styles.headerTitle}>C L O M E R A</Text>
                    {/*<Icon name={'search'} size={30} onPress={() => {}} />*/}
                    <TouchableOpacity
                        onPress={() => {
                            onPressAdd();
                        }}
                    >
                        <Image style={styles.icon} source={require('../assets/icon_add.png')} />
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
                {/*</Icon>*/}
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
        fontSize: 25,
        color: Colors.purple_blue,
        flex: 1,
        fontWeight: 'bold',
        opacity: 0.8,
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
        height: 10,
        width: 10,
        borderRadius: 5,
        marginRight: 6,
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
});
