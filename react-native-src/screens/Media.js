import React, {useEffect, useState} from 'react';
import {Dimensions, StyleSheet, TouchableOpacity, FlatList, Text, View, Image, Button, ScrollView} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import _ from "lodash";
import {HOST_URL} from "../utils/AppConst";
import VLCPlayer from 'react-native-vlc-media-player/VLCPlayer';
import Timeline from "react-native-beautiful-timeline";
const WIDTH = Dimensions.get('window').width;
export default function Media(props, route) {
    const url='https://clientapp.sgp1.digitaloceanspaces.com/5ed3e22848d6943ed70ec47f/5_5/_002.mp4'

    const [camera, setCamera] = useState(_.get(props, 'route.params.camera', {}));
    const [cameras, setCameras] = useState(_.get(props, 'route.params.cameras', {}));
    const [listVideo, setListVideo] = useState( []);
    const [video, setVideo] = useState( url);
    const {_id = ''} = camera || {}
    const data=[
        {
            "date": 1574342522000,
            "data": [
                {
                    "title": "React Native Beautiful Timeline",
                    "subtitle": "Sed at justo eros. Phasellus.",
                    "date": Number(listVideo[0].timeStart)
                },
                {
                    "title": "React Native",
                    "subtitle": "Sed viverra. Nam sagittis.",
                    "date": Number(listVideo[0].timeStart)
                }
            ]
        },
        {
            "date": 1574248261000,
            "data": [
                {
                    "title": "Timeline",
                    "subtitle": "Morbi magna orci, consequat in.",
                    "date": Number(listVideo[0].timeStart)
                }
            ]
        },
        {
            "date": 1574125621000,
            "data": [
                {
                    "title": "Beauty Timeline",
                    "subtitle": "Nulla a eleifend urna. Morbi. Praesent.",
                    "date": Number(listVideo[0].timeStart)
                }
            ]
        }
    ];
    useEffect( () => {
        fetchData();
    }, []);
    const fetchData = async () => {
        let token = await AsyncStorage.getItem('userToken')
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", `Bearer ${token}`);

        let raw = JSON.stringify({"_id": _id});

        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        await fetch(HOST_URL + "camera/savedvideo", requestOptions)
            .then(response => response.json())
            .then(result => {
                 console.log(result)
                setListVideo(result || [])
                setVideo(result[0] || [])
            })
            .catch(error => console.log('error', error));

    }

    const onPress = (video) => () => {
        const {navigation} = props || {};
        navigation.navigate(
            'MediaDetail',
            {video: video}
        )
    }
const renderVideo=()=>(
    <VLCPlayer
        source={{
            uri: video.url || '',
        }}
        style={styles.backgroundVideo}
        videoAspectRatio="16:9"
    />

)
    const renderItem = ({item, index}) => {
        let {timeStart,timeEnd} = item;

        let start = new Date(Number(timeStart));
        let end = new Date(Number(timeEnd));
        // console.log(timeStart, )
        return(
            <View>
                {/*<Text>{String(start.getDate())} - {start.getMonth()} - {start.getFullYear()}</Text>*/}
                {/*<Text>{String(start.getHours())} : {start.getMinutes()} : {start.getSeconds()}</Text>*/}
                {/*<Text>{String(end.getDate())} - {end.getMonth()} - {end.getFullYear()}</Text>*/}
                {/*<Text>{String(end.getHours())} : {end.getMinutes()} : {end.getSeconds()}</Text>*/}


            </View>

        )
    }

    const renderEmpty = () => {
        return (
            <View><Text>no video</Text></View>
        )
    }
    const renderOptions=()=>{
        let {timeStart} = video||{}
        let start=new Date(Number(timeStart));
        return(
            <View
            style={{flexDirection:'row'}}
            >
                <Text>{String(start.getDate())} - {start.getMonth()} - {start.getFullYear()}</Text>
                <Button title={'Options'} onPress={()=>{}}/>
                <Text>{listVideo.length} video</Text>
            </View>
        )
    }
    if(!listVideo || listVideo.length=== 0) return renderEmpty();
    else{
    return (
        <ScrollView style={styles.container}>
            {/*<Text>{String(props.route.params)}</Text>*/}
            {renderVideo()}
            {renderOptions()}
            <Timeline data={data} contentContainerStyle={{marginTop:12}}/>
            {/*<FlatList*/}
            {/*    data={listVideo}*/}
            {/*    keyExtractor={(item, index) => index.toString()}*/}
            {/*    renderItem={renderItem}*/}
            {/*/>*/}
        </ScrollView>
    );
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems:'center',
        backgroundColor: '#fdfdfd',
        // padding: 12,
        // width: '100%'
    },
    backgroundVideo: {
        height: 200,
        marginBottom:12
    },
});

