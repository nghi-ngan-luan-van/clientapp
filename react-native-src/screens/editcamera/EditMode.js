import React, { useState } from "react";
import { View, Switch, StyleSheet,Text,Button, Alert } from "react-native";
import {Input } from 'react-native-elements';
import _ from 'lodash';
import AsyncStorage from "@react-native-community/async-storage";
import { AppRoute } from "../../navigation/app-routes";

export default function EditMode(props) {
  const [camera,setCamera]=useState(_.get(props, 'route.params.camera', {}))
  const [isEnabled, setIsEnabled] = useState(camera.backupMode);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
 

    const onUpdateMode = async() =>{
      console.log(isEnabled)
      const token= await AsyncStorage.getItem('userToken')
    
    }
  return (
    <View style={styles.container}>
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
       <Button title={'Save'} onPress={onUpdateMode} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    padding:20,
  },
  switchBtn: {
    paddingBottom:10,
    flexDirection:'row',
    flexWrap:'wrap',
  }

});