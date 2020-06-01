import {Image, Text, TouchableOpacity, View, StyleSheet, Dimensions} from 'react-native';
import React from 'react';
import _ from 'lodash'
const {width} = Dimensions.get('window')
const HEADER_HEIGHT = 60;
const styles = StyleSheet.create({
  container: {
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
    color:'#22215B',
    fontSize:18,
    fontWeight:'bold'
  }
});

//22215B
export default Header = (props) => {
  const {options={}, navigation={}, scene} = props;
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
        style={{width: 36, height: 36}}
        source={require('../assets/back.png')}
      />
    </TouchableOpacity>
  );
  const renderHeaderRight = () => {
    const headerRight = _.get(props,'scene.descriptor.options.headerRight',  <View/>)
    if (!headerRight) return <View />;
    return headerRight;
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.backgroundImg}
        source={require('../assets/background_image.png')}
      />
      {renderHeaderLeft()}
      <Text style={styles.title}>{title}</Text>
      {renderHeaderRight()}
    </View>
  );
};
