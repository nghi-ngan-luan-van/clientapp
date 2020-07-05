import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import { VlCPlayerView } from 'react-native-vlc-media-player';
//import Video from 'react-native-video';
import _ from 'lodash';
import Orientation from 'react-native-orientation';

export default class VideoPlayerScreen extends Component {
  constructor(props) {
    super(props);
    this.state={
        video:_.get(props, 'route.params.video', {})
    };
  }
  componentDidMount() {}

  render() {
      const {video}=this.state
      console.log('video',video)
    return (
        <View style={styles.container}>
        <VlCPlayerView
            autoplay={true}
            url={video.cdnUrl}
            Orientation={Orientation}
            showGG={false}
            showTitle={true}
            title={video.filePath}
            showBack={true}
            onLeftPress={() => {}}
            // startFullScreen={() => {
            //     this.setState({
            //         isFull: true,
            //     });
            // }}
            // closeFullScreen={() => {
            //     this.setState({
            //         isFull: false,
            //     });
            // }}
        />
    </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.black,
    },
  body: {
    backgroundColor: Colors.white,
  },
  backgroundVideo: {
    height: 600,
  },
});
