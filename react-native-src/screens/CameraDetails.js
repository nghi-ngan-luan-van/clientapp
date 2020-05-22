import React, {Component} from 'react';
import {StyleSheet, View, Text, Switch} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import RtspVideoPlayer from '../components/RtspVideoPlayer';
import _ from 'lodash';
import {Icon} from 'react-native-elements';
import MenuButton from 'react-native-menu-button';
import PropTypes from 'prop-types';

import {AppRoute} from '../navigation/app-routes';
import {TouchableOpacity} from 'react-native';

export default class CameraDetails extends Component {
  constructor(props) {
    super(props);
    this.camera = _.get(this.props, 'route.params.camera', {});
    this.state = {
      isEnabled: false,
      selectData: '',
    };
  }
  _handleOnSelect = (value) => {
    console.log('valueee', value)
    if (value === "0") {
      let {navigation} = this.props;
      console.log('this camera', this.camera)
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

  
  render() {
    let {rtspUrl, name} = this.camera;
    const {isEnabled} = this.state;
    const menuGroup = [
      {
        key: '0',
        value: '0',
        text: `Edit camera information`,
      },
    ];
    return (
      <View style={styles.container}>
        <View style={styles.top}>
          <MenuButton
            buttonStyle={[styles.rightButton]}
            menuGroup={menuGroup}
            onSelect={this._handleOnSelect}
            optionSelectedStyle={{backgroundColor: 'red'}}
            optionsStyle={styles.options}
          />
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
    backgroundColor: Colors.white,
  },
  options:{
    right:20,
    top:20
  },
  iconSetting: {
    padding: 15,
    alignItems: 'flex-end',
  },
  rightButton: {
    width: 37,
    height: 37,
    position: 'absolute',
    bottom: 7,
    right: 2,
    padding: 10,
    color: 'white'
  },
  top: {
    backgroundColor: 'white',
    top: 0,
    height: 40,
    right: 0,
    left: 0,
    borderBottomWidth: 0.5,
    borderBottomColor: '#828287',
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
