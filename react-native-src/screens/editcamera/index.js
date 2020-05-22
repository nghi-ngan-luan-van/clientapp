import React, { useState } from "react";
import { View, Switch, StyleSheet,Text,Button } from "react-native";
import {Input } from 'react-native-elements';
import _ from 'lodash';

export default function EditCamera(props) {
  const [camera,setCamera]=useState(_.get(props, 'route.params.camera', {}))
  const [isEnabled, setIsEnabled] = useState(camera.backupMode);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
   

    const onUpdateCamera =() =>{
      alert('doing')
    }
  return (
    <View style={styles.container}>
      <Input
          placeholder="Camera Name"
          leftIcon={{type: 'font-awesome', name: 'camera-retro'}}
          style={{height: '36'}}
          value={camera.name}
        />

        <Input
          disabled
          placeholder="RTSP Url"
          leftIcon={{type: 'font-awesome', name: 'location-arrow'}}
          style={{height: '36'}}
          value={camera.rtspUrl}
        />
         <Input
          placeholder="IP"
          leftIcon={{type: 'font-awesome', name: 'link'}}
          style={{height: '36'}}
          value={camera.ip}

        />

        <Input
          placeholder="Port"
          leftIcon={{type: 'font-awesome', name: 'compass'}}
          style={{height: '36'}}
          value={camera.port}

        />
        <View style={styles.switchBtn}>
        <Text> Back-up Mode : </Text> 
        <Switch
         style={{marginTop:-3}}
        trackColor={{ false: "#767577", true: "green" }}
        thumbColor={isEnabled ? "#f4f3f4" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
        </View>   
       <Button title={'Save'} onPress={onUpdateCamera} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1
  },
  switchBtn: {
    paddingBottom:10,
    flexDirection:'row',
    flexWrap:'wrap',
  }

});