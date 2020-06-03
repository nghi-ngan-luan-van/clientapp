import React, {Component, useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {AppRoute} from '../navigation/app-routes';
const WIDTH = Dimensions.get('window').width;
import {HOST_URL} from '../utils/AppConst';
export const Header = ({navigation}) => (
  <View
    style={{
      top: 0,
      height: 100,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 12,
    }}>
    <TouchableOpacity
      style={{width: 42, height: 42}}
      onPress={() => navigation && navigation.toggleDrawer()}>
      <Image
        style={{width: 36, height: 36}}
        source={require('../assets/menu.png')}
      />
    </TouchableOpacity>

    <Text style={styles.title}>Clomera</Text>
    <View />
  </View>
);

export default HomeScreen = (props) => {
  const [cameras, setCameras] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    let token = await AsyncStorage.getItem('userProfileToken');
    console.log(await AsyncStorage.getItem('userProfileToken'))
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
    // params: { user: 'jane' },

    const {navigation} = props || {};
    navigation &&
      navigation.push(AppRoute.CAMERA_DETAIL, {
        screen: 'Settings',
        params: {
          camera: camera,
          cameras: cameras,
        },
      });
  };

  const renderEmpty = () => {
    return (
      <View>
        <Text></Text>
      </View>
    );
  };

  const testThumbnail = require('../assets/test.jpg');

  const renderCamera = ({item, index}) => (
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

      <View style={styles.nameContainer}>
        <Text style={styles.cameraName}>{String(item.name)}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Image
        style={styles.backgroundImg}
        source={require('../assets/background.png')}
      />
      <Header navigation={props.navigation} />
      <FlatList
        contentContainerStyle={styles.list}
        columnWrapperStyle={styles.row}
        numColumns={2}
        keyExtractor={({item, index}) => index}
        data={cameras}
        renderItem={(cam) => renderCamera(cam)}
      />
      <TouchableOpacity
        style={{
          position: 'absolute',
          width: 42,
          height: 42,
          bottom: 40,
          right: 24,
        }}
        onPress={() => navigation && navigation.push(AppRoute.ADD_CAMERA)}>
        <Image
          style={{width: 42, height: 42}}
          source={require('../assets/plus.png')}
        />
      </TouchableOpacity>
    </View>
  );
};

const CARD_WIDTH = (WIDTH - 36) / 2;

const CARD_HEIGHT = (CARD_WIDTH / 7) * 4;
const ICON_SIZE = 42;
const styles = StyleSheet.create({
  nameContainer: {
    opacity: 0.7,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 0.2,
    position: 'absolute',
    borderTopLeftRadius: 16,
    padding: 5,
  },
  container: {
    backgroundColor: '#fff',
    flex: 1,
    // paddingHorizontal:12
  },
  list: {
    paddingHorizontal:12,
   
  },
  row: {
    flex: 1,
    // alignItems: 'flex-start',
    justifyContent: 'space-between',
    // alignContent:'flex-start'
  },
  cardView: {
    borderRadius: 16,
    width: CARD_WIDTH,
    marginBottom: 12,
    height: CARD_HEIGHT,
    borderWidth:2,
    borderStartColor:'#000',
    borderEndColor:"#fff"
  },
  title: {
    color: '#38369e',
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
    color: '#fff',
    flex: 1,
  },
  iconPlay: {
    position: 'absolute',
    alignContent: 'center',
    height: ICON_SIZE,
    width: ICON_SIZE,
    opacity: 0.7,
    top: (CARD_HEIGHT - ICON_SIZE) / 2,
    left: (CARD_WIDTH - ICON_SIZE) / 2,
  },
});
