import React, {Component, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Switch,
  Picker,
  Alert,
  Button,
  Image,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import _ from 'lodash';
import {AppRoute} from '../../navigation/app-routes';
import AsyncStorage from '@react-native-community/async-storage';
import Orientation from "react-native-orientation";
import {VlCPlayerView} from "react-native-vlc-media-player";

// Icon.loadFont();
export default function CameraStream(props) {
  const [camera, setCamera] = useState(_.get(props, 'camera', {}));

  const goToMedia = () => {
    let {navigation} = props;
    navigation &&
      navigation.navigate(AppRoute.MEDIA, {
        cameraId: camera && camera._id,
      });
  };

  const renderAlertDelete = () => {
    return Alert.alert(
      'Warning',
      'Do you want to permanently delete this camera ?',
      [
        {
          text: 'OK',
          onPress: async () => {
            const token = await AsyncStorage.getItem('userToken');
            let myHeaders = new Headers();
            myHeaders.append('Authorization', `Bearer ${token}`);
            myHeaders.append('Content-Type', 'application/json');

            let raw = JSON.stringify({_id: camera._id});

            let requestOptions = {
              method: 'POST',
              headers: myHeaders,
              body: raw,
              redirect: 'follow',
            };

            fetch('http://165.22.98.234/camera/delete', requestOptions)
              .then((response) => response.text())
              .then((result) => {
                let {navigation} = props;
                navigation && navigation.push(AppRoute.HOME, {});
              });
          },
        },
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
      ],
      {cancelable: false},
    );
  };
  console.log(camera)
  return ( !!camera &&
    <View style={styles.container}>
      {/*<VlCPlayerView*/}
      {/*    autoplay={false}*/}
      {/*    url={camera.rtspUrl}*/}
      {/*    Orientation={Orientation}*/}
      {/*    showGG={false}*/}
      {/*    showTitle={true}*/}
      {/*    title={camera.name}*/}
      {/*    showBack={true}*/}
      {/*    onLeftPress={() => {}}*/}
      {/*    startFullScreen={() => {*/}
      {/*      this.setState({*/}
      {/*        isFull: true,*/}
      {/*      });*/}
      {/*    }}*/}
      {/*    closeFullScreen={() => {*/}
      {/*      this.setState({*/}
      {/*        isFull: false,*/}
      {/*      });*/}
      {/*    }}*/}
      {/*/>*/}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black,
  },
  selectMenu: {
    height: 50,
    width: '70%',
  },
  options: {
    right: 20,
    top: 20,
  },
  iconSetting: {
    // padding: 15,
  },
  rightButton: {
    width: 37,
    height: 37,
    // position: 'absolute',
    // bottom: 7,
    // right: 2,
    // padding: 10,
    // color: 'black',
  },
  top: {
    backgroundColor: 'white',
    flexDirection: 'row',
    flexWrap: 'wrap',
    top: 0,
    height: 40,
    right: 0,
    left: 0,
    position: 'relative',
  },
  video: {
    backgroundColor: Colors.black,
    height: '70%',
    width: '100%',
  },
  body: {
    backgroundColor: Colors.white,
  },
});
