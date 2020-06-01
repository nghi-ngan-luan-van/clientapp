import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Dimensions,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {LivePlayer} from 'react-native-live-stream';
// import { VlcSimplePlayer, VLCPlayer } from 'react-native-yz-vlcplayer';
import { VLCPlayer, VlCPlayerView } from 'react-native-vlc-media-player';

import {TouchableOpacity} from 'react-native-gesture-handler';
const WIDTH_SCREEN = Dimensions.get('window').width;
import Orientation from 'react-native-orientation';

export default class RtspVideoPlayer extends Component {
  constructor(props) {
    super(props);
    (this.state = {
      rtspUrl: '',
      name: '',
    }),
      (this.numColums = this.props.numColums || 1);
  }

  componentDidMount() {}

  render() {
    let {rtspUrl} = this.state;
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={{
            width: WIDTH_SCREEN / this.numColums,
            height: 200,
            alignItems: 'center',
          }}>
          {/* <VlcSimplePlayer
                        autoplay={false}
                        Orientation={Orientation}
                        url={this.props.url}
                        initType={2}
                        isLive={true}
                        autoReloadLive={true}
                        // hwDecoderEnabled={1}
                        // hwDecoderForced={1}
                        // initOptions={[
                        //     "--no-audio",
                        //     "--rtsp-tcp",
                        //     "--network-caching=" + 150,
                        //     "--rtsp-caching=" + 150,
                        //     "--no-stats",
                        //     "--tcp-caching=" + 150,
                        //     "--realrtsp-caching=" + 150,
                        // ]}
                    />  */}
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#000',
    justifyContent: 'center',
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.black,
  },
});

// //
// <LivePlayer
// source={{uri: rtspUrl}}
// style={styles.video}
// paused={false}
// muted={false}
// bufferTime={300}
// maxBufferTime={1000}
// resizeMode={"contain"}
// onLoading={() => {
//     console.log('LivePlayer_onLoading....')
// }}
// onLoad={() => {
//     console.log('LivePlayer_onLoad')
// }}
// onEnd={() => {
//     console.log('LivePlayer_onEnd')
// }}
// />
