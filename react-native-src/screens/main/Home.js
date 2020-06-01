import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  Dimensions,
  TouchableOpacity
} from 'react-native';

const Header = ({navigation}) => (
  <View
    style={{
    top:0,
    //   height: 60,
      flexDirection: 'row',
      alignItems:'center',
      justifyContent: 'space-between',
      padding: 12,

    }}>
    <TouchableOpacity
      style={{width: 42, height: 42}}
      onPress={() => navigation && navigation.toggleDrawer()}>
      <Image
        style={{width: 36, height: 36}}
        source={require('../../assets/menu.png')}
      />
    </TouchableOpacity>
    <Text style={styles.title}>clomera</Text>
    <Image/>
  </View>
);
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderCameraComp() {
    return (
      <ImageBackground>
        <View>
          <Text>camera name</Text>
          {/* <Image source={require('../../assets/ic_next')}/> */}
        </View>
      </ImageBackground>
    );
  }

  render() {
    return (
      <View style={styles.container}>
          <Image
          style={styles.backgroundImg}
          source={require('../../assets/background.png')}
        />
          <Header navigation={this.props.navigation}/>
        <Text> Home </Text>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  title:{
      color:'#22215B',
      fontSize:38,
      fontWeight:'bold',

  },
  backgroundImg: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: WIDTH,
    // height:80,
    overflow:"hidden"
  },
});

export default Home;
