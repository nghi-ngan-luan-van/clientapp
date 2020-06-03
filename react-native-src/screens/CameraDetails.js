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
import RtspVideoPlayer from '../components/RtspVideoPlayer';
import _ from 'lodash';
import {AppRoute} from '../navigation/app-routes';
import {TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {Icon, Input} from 'react-native-elements';

export default function CameraDetails(props) {
  const [camera, setCamera] = useState(_.get(props, 'route.params.camera', {}));
  const navigation_parent = _.get(props, 'route.params.navigation', {});
  console.log('1234567',props)
  console.log('123456789',navigation_parent)
  const {navigation} = props;
  // React.useLayoutEffect(() => {
  //   navigation_parent.setOptions({
  //     headerRight: <TouchableOpacity onPress={goToEditCamera}>
  //     <Image
  //       source={require('../assets/ic_settings.png')}
  //       style={styles.rightButton}
  //     />
  //   </TouchableOpacity>,
  //   }),
  //     [props, goToEditCamera];
  // });

 
  const goToMedia = () => {
    let {navigation} = props;
    navigation &&
      navigation.push(AppRoute.MEDIA, {
        cameraId: camera && camera._id,
      });
  };
  const goToEditCamera = () => {
    let {navigation} = props;
    navigation &&
    navigation.navigate(AppRoute.CAMERA_EDIT, {
      camera: camera,
    });
    //navigation.toggleDrawer();
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
  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Text>{camera.name}</Text>
        <TouchableOpacity onPress={goToEditCamera}>
          <Icon
            style={styles.iconSetting}
            name="edit"
            type="font-awesome"
            color="black"
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={renderAlertDelete}>
          <Icon
            style={styles.iconSetting}
            name="trash"
            type="font-awesome"
            color="black"
          />
        </TouchableOpacity>
      </View>
      <RtspVideoPlayer style={styles.video} url={camera.rtspUrl} />
      {/* <TouchableOpacity styles={{ height: 24 }} onPress={this.goToMedia}>
                         <Text> Xem lại video </Text>
                </TouchableOpacity> */}
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
