import React, { useState } from "react";
import { View, Switch, StyleSheet,Text,Button, Alert } from "react-native";
import {Input } from 'react-native-elements';
import _ from 'lodash';
import AsyncStorage from "@react-native-community/async-storage";
import { AppRoute } from "../../navigation/app-routes";

export default function EditCamera(props) {
  const [camera,setCamera]=useState(_.get(props, 'route.params.camera', {}))
  const [isEnabled, setIsEnabled] = useState(camera.backupMode);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const [newName,setNewName] = useState(camera.name)
  const [newIP,setNewIP] = useState(camera.ip)
  const [newPort,setNewPort] = useState(camera.port)

    const onUpdateCamera = async() =>{
      console.log(newName,newIP,newPort,isEnabled)
      const token= await AsyncStorage.getItem('userToken')
      if (typeof(newPort) !== "number") {
        console.log(typeof(newPort))
        alert("Port must be a number")
        return
      }
    var myHeaders = new Headers();
    myHeaders.append(
      'Authorization',
      `Bearer ${token}`,
    );
    myHeaders.append('Content-Type', 'application/json');

    var raw = JSON.stringify({_id: camera._id,name:newName,rtspUrl:camera.rtspUrl,ip:newIP,port:newPort,backupMode:isEnabled});

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch('http://165.22.98.234/camera/edit', requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log(result)
        let {navigation} = props;
        navigation &&
        navigation.push(AppRoute.HOME, { });
      })
    }
  return (
    <View style={styles.container}>
      <Input
          placeholder="Camera Name"
          leftIcon={{type: 'font-awesome', name: 'camera-retro'}}
          style={{height: '36'}}
          defaultValue={camera.name}
          onChangeText={(value)=>{setNewName(value)}}
        />

        <Input
          disabled
          placeholder="RTSP Url"
          leftIcon={{type: 'font-awesome', name: 'location-arrow'}}
          style={{height: '36'}}
          defaultValue={camera.rtspUrl}
        />
         <Input
          placeholder="IP"
          leftIcon={{type: 'font-awesome', name: 'link'}}
          style={{height: '36'}}
          defaultValue={camera.ip}
          onChangeText={(value)=>{setNewIP(value)}}
        />

        <Input
          placeholder="Port"
          keyboardType='numeric'
          maxLength={10}
          leftIcon={{type: 'font-awesome', name: 'compass'}}
          style={{height: '36'}}
          defaultValue={camera && camera.port && camera.port.toString()}
          onChangeText={(value)=>{setNewPort(Number.parseInt(value))}}
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
    flex:1,
    paddingHorizontal:12,
  },
  switchBtn: {
    paddingBottom:10,
    flexDirection:'row',
    flexWrap:'wrap',
  }

});