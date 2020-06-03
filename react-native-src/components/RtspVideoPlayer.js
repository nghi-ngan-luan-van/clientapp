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
// import {LivePlayer} from 'react-native-live-stream';
// import { VlcSimplePlayer, VLCPlayer } from 'react-native-yz-vlcplayer';
import {VLCPlayer, VlCPlayerView} from 'react-native-vlc-media-player';

import {TouchableOpacity} from 'react-native-gesture-handler';
const WIDTH_SCREEN = Dimensions.get('window').width;
import Orientation from 'react-native-orientation';

export default class RtspVideoPlayer extends Component {
  constructor(props) {
    super(props);
    (this.state = {
      rtspUrl: '',
      name: '',
      isFull:true
    }),
      (this.numColums = this.props.numColums || 1);
  }

  componentDidMount() {}

  renderView(vs){
    return <VlCPlayerView
    // style={{ backgroundColor:'red'}}
      autoplay={true}
      url={vs}
      Orientation={Orientation}
      //BackHandle={BackHandle}
      // ggUrl={vs}
      showGG={false}
      showTitle={true}
      title="VIDEO TEST"
      showBack={true}
      onLeftPress={() => {}}
      startFullScreen={() => {
        this.setState({
          isFull: true,
        });
      }}
      closeFullScreen={() => {
        this.setState({
          isFull: false,
        });
      }}
    />
  }
  renderSecondView(vs){
    return <ScrollView contentContainerStyle={styles.container}>

    <TouchableOpacity
      style={{
        width: WIDTH_SCREEN / this.numColums,
        height: 200,
        alignItems: 'center',
        backgroundColor:'#fff'
      }}>
      <VLCPlayer
        // ref={(ref) => (this.vlcPlayer = ref)}
        style={styles.video}
        videoAspectRatio="16:9"
        // paused={this.state.paused}
        // source={{uri: rtspUrl}}
        source={{uri: nc}}
        // onProgress={this.onProgress.bind(this)}
        // onEnd={this.onEnded.bind(this)}
        // onBuffering={this.onBuffering.bind(this)}
        // onError={this._onError}
        // onStopped={this.onStopped.bind(this)}
        // onPlaying={this.onPlaying.bind(this)}
        // onPaused={this.onPaused.bind(this)}
      />
    </TouchableOpacity>
    <VLCPlayer 
          ref={(ref) => (this.vlcPlayer = ref)}
          style={{width: '100%', height: 200}}
          videoAspectRatio="16:9"
          source={{
            uri:
              // 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
            vs // camera rtsp tests
          }}
        />
  </ScrollView>
  }
  render() {
    let {rtspUrl} = this.state;
    let nc =
      'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';
    let vs = 'rtsp://wowzaec2demo.streamlock.net/vod/mp4:BigBuckBunny_115k.mov';
    return this.renderView(vs);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    // backgroundColor: '#000',
    justifyContent: 'center',
  },
  body: {
    backgroundColor: Colors.white,
  },
  video: {
    height: 200,
    width: WIDTH_SCREEN - 24,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.black,
  },
});
