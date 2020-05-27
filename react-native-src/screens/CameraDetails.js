import React, {Component} from 'react';
import {StyleSheet, View, Text, Switch, Picker, Alert} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import RtspVideoPlayer from '../components/RtspVideoPlayer';
import _ from 'lodash';
import {Icon} from 'react-native-elements';
import MenuButton from 'react-native-menu-button';
import PropTypes from 'prop-types';

import {AppRoute} from '../navigation/app-routes';
import {TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

export default class CameraDetails extends Component {
  constructor(props) {
    super(props);
    this.camera = _.get(this.props, 'route.params.camera', {});
    this.state = {
      cameraList: _.get(this.props, 'route.params.cameras', {}),
      isEnabled: false,
      selectedCamera: this.camera.name,
    };
  }
  
  _handleOnSelect = (value) => {
    console.log('valueee', value);
    if (value === '0') {
      let {navigation} = this.props;
      console.log('this camera', this.camera);
      navigation &&
        navigation.push(AppRoute.CAMERA_EDIT, {
          camera: this.camera,
        });
    }
  };

  goToMedia = () => {
    let {navigation} = this.props;
    navigation &&
      navigation.push(AppRoute.MEDIA, {
        cameraId: this.camera && this.camera._id,
      });
  };
  goToEditCamera = () => {
    let {navigation} = this.props;
    navigation &&
      navigation.push(AppRoute.CAMERA_EDIT, {
        camera: this.camera,
      });
  };

  renderAlertDelete = () => {
    return Alert.alert(
      'Warning',
      'Do you want to permanently delete this camera ?',
      [
        {
          text: 'OK',
          onPress: async () => {
            const token= await AsyncStorage.getItem('userToken')
              console.log("token", token, "camid",this.camera._id)
            //   const result = await fetch('http://165.22.98.234/camera/delete', {
            //     method:"POST",
            //     headers: {
            //       "Authorization": `Bearer ${this.state.token}`,
            //       "Content-Type" : "application/json"
            //     },
            //     body: JSON.stringify({"_id":this.camera._id})
            //   })
            //  console.log(result.text())
            var myHeaders = new Headers();
            myHeaders.append(
              'Authorization',
              `Bearer ${token}`,
            );
            myHeaders.append('Content-Type', 'application/json');

            var raw = JSON.stringify({_id: this.camera._id});

            var requestOptions = {
              method: 'POST',
              headers: myHeaders,
              body: raw,
              redirect: 'follow',
            };

            fetch('http://165.22.98.234/camera/delete', requestOptions)
              .then((response) => response.text())
              .then((result) => {
                let {navigation} = this.props;
            navigation &&
             navigation.push(AppRoute.HOME, { });
              })
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
  render() {
    let {rtspUrl, name} = this.camera;
    const {isEnabled, selectedCamera, cameraList} = this.state;
    console.log('litsttsat', selectedCamera);
    return (
      <View style={styles.container}>
        <View style={styles.top}>
          <Picker
            selectedValue={selectedCamera}
            style={styles.selectMenu}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({selectedCamera: itemValue})
            }>
            {cameraList.map((cam) => (
              <Picker.Item key={cam._id} label={cam.name} value={cam.name} />
            ))}
          </Picker>
          <TouchableOpacity onPress={this.goToEditCamera}>
            <Icon
              style={styles.iconSetting}
              name="edit"
              type="font-awesome"
              color="black"
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={this.renderAlertDelete}>
            <Icon
              style={styles.iconSetting}
              name="trash"
              type="font-awesome"
              color="black"
            />
          </TouchableOpacity>
        </View>
        <RtspVideoPlayer style={styles.video} url={rtspUrl} />
        {/* <TouchableOpacity styles={{ height: 24 }} onPress={this.goToMedia}>
                         <Text> Xem lại video </Text>
                </TouchableOpacity> */}
      </View>
    );
  }
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
    padding: 15,
  },
  rightButton: {
    width: 37,
    height: 37,
    position: 'absolute',
    bottom: 7,
    right: 2,
    padding: 10,
    color: 'black',
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
