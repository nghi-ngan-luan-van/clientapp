import {Image, Text, TouchableOpacity, View, StyleSheet, Dimensions, Platform} from 'react-native';
import React from 'react';
import _ from 'lodash'
import {Colors} from "../utils/AppConfig";
const {width} = Dimensions.get('window')
const HEADER_HEIGHT = Platform.OS === 'ios' ? 120 :60;

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === 'ios' ? 60 :0,
    height: HEADER_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    // backgroundColor: 'yellow',
  },
  backgroundImg:{
    position:'absolute',
    top:0, 
    right:0,
    width:width,
    height:HEADER_HEIGHT,
    resizeMode:'cover',
    // backgroundColor:''
    backgroundColor:'#fff'
  },
  title:{
    color:Colors.text,
    fontSize:18,
    fontWeight:'bold'
  }
});

//22215B
export default Header = (props) => {
  const {options={}, navigation={}, scene, titleMode} = props;
  const title =
    options.headerTitle !== undefined
      ? options.headerTitle
      : options.title !== undefined
      ? options.title
      : scene.route.name;
      
  const onPressLeft = () => {
    const {onPressLeft} = props;
    if (typeof onPressLeft === 'function') {
      onPressLeft();
    } else {
 
      const {navigation} = props;
      navigation && navigation.goBack();
    }
  };
  const renderHeaderLeft = () => (
    <TouchableOpacity onPress={onPressLeft}>
      <Image
        resizeMode="contain"
        style={{width: 18, height: 18}}
        source={require('../assets/ic_back.png')}
      />
    </TouchableOpacity>
  );
  const renderHeaderRight = () => {
    const headerRight = _.get(props,'scene.descriptor.options.headerRight',  <View/>)
    if (!headerRight) return <View />;
    return headerRight;
  };

  const renderTitle = () => {
    if(titleMode === 'none') return <View/>
    else return <Text style={styles.title}>{title}</Text>
  }

  return (
    <View style={styles.container}>
      <Image
        style={styles.backgroundImg}
        source={require('../assets/background_image.png')}
      />
      {renderHeaderLeft()}
      {renderTitle()}
      {renderHeaderRight()}
    </View>
  );
};
