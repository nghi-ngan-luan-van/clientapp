import React, {useEffect, useRef, useState} from 'react';
import {Button, Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import _ from "lodash";
import {HOST_URL} from "../utils/AppConst";
import VLCPlayer from 'react-native-vlc-media-player/VLCPlayer';
import Timeline from "../components/TimeLine/Timeline";
import moment from "moment";
const WIDTH = Dimensions.get('window').width;
const test = [[{"__v": 0, "_id": "5edcf8b634bc7c0e5ca99f40", "cameraUrl": "rtsp://192.168.1.104:7777/h264_ulaw.sdp", "cdnUrl": null, "filePath": null, "timeEnd": "1591539894879", "timeStart": "1591539889201", "user": "5e9471d6cbeb62504f03bc0b"}, {"__v": 0, "_id": "5edcfd0635cf360faadbaecc", "cameraUrl": "rtsp://192.168.1.104:7777/h264_ulaw.sdp", "cdnUrl": null, "filePath": null, "timeEnd": "1591540998484", "timeStart": "1591540994193", "user": "5e9471d6cbeb62504f03bc0b"}, {"__v": 0, "_id": "5eddb56c824e490d2cf6daee", "cameraUrl": "rtsp://192.168.1.104:7777/h264_ulaw.sdp", "cdnUrl": "https://clientapp.sgp1.digitaloceanspaces.com/5e9471d6cbeb62504f03bc0b/5ed3e22848d6943ed70ec47f/1591588193850.mp4", "date": 1591588193850, "filePath": "1591588193850.mp4", "subtitle": "abc", "timeEnd": "1591588204005", "timeStart": "1591588193850", "title": "camera testevent2", "user": "5e9471d6cbeb62504f03bc0b"}, {"__v": 0, "_id": "5eddb592824e490d2cf6daef", "cameraUrl": "rtsp://192.168.1.104:7777/h264_ulaw.sdp", "cdnUrl": "https://clientapp.sgp1.digitaloceanspaces.com/5e9471d6cbeb62504f03bc0b/5ed3e22848d6943ed70ec47f/1591588229691.mp4", "date": 1591588229691, "filePath": "1591588229691.mp4", "subtitle": "abc", "timeEnd": "1591588242919", "timeStart": "1591588229691", "title": "camera testevent3", "user": "5e9471d6cbeb62504f03bc0b"}]
]
export default function Media(props, route) {
    const url = 'https://clientapp.sgp1.digitaloceanspaces.com/5ed3e22848d6943ed70ec47f/5_5/_002.mp4'
    const [camera, setCamera] = useState(_.get(props, 'camera', {}));
    const [listVideo, setListVideo] = useState([]);
    const [listEvent, setListEvent] = useState([]);
    const [video, setVideo] = useState();
    const [loading, setLoading] = useState(true);
    const {_id = ''} = camera || {}

   let vlcref = useRef();

    useEffect( () => {
        fetchData()
        const data= formatList(listVideo);
        console.log(listVideo)
        setListEvent(data)
        setVideo( listEvent && listEvent[0]|| [])
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
                setLoading(false)
                setListVideo(result || [])
            })
            .catch(error => console.log('error', error));

    }
    const formatList = (listVideo) => {
        let eventVideoArray = [];
        if (Array.isArray(listVideo) && listVideo.length > 0) {
            for (let i = 0; i < listVideo.length; i++) {
                let {timeStart, timeEnd, cdnUrl} = listVideo[i]
                if (cdnUrl !== null) {
                    //format data: [{date: '...', data:[{...}]}]
                    let date = moment(Number(timeStart)).startOf('day')
                    let indexDate = eventVideoArray.findIndex(item => date.isSame(Number(item.date),'day'));

                    let element = listVideo[i] || {};
                    element.title= camera && camera.name + 'event' + i;
                    element.subtitle= 'abc';
                    element.date= Number(timeStart);
                    if (indexDate === -1) {
                        eventVideoArray.push({
                            date: date,
                            data: [listVideo[i]]
                        })
                    } else {

                        eventVideoArray[indexDate] &&
                        eventVideoArray[indexDate].data &&
                        eventVideoArray[indexDate].data.push(listVideo[i])
                    }

                }
            }
        }
        return eventVideoArray
    }

    const onPress = (video) => {
        console.log('I am hewew')
        setVideo(video)
    }
    const renderVideo = () => (
        !!video  && !!video.cdnUrl &&
        <VLCPlayer
            ref={vlcref}
            source={{uri: video.cdnUrl}}
            style={styles.backgroundVideo}
            videoAspectRatio="16:9"
        />

    )

    const renderItem = ({item, index}) => {
        let {timeStart, timeEnd} = item;

        let start = new Date(Number(timeStart));
        let end = new Date(Number(timeEnd));
        // console.log(timeStart, )
        return (
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
            <View style={{alignContent:'center', backgroundColor:'#fff'}}>
                <Image source={require('../assets/camera_animate.gif')}/>
                <Text style={{color: '#22215B', textAlign:'center', fontSize:14}}>This camera does not contain any event. Turn up your back up mode to experiment movenment detecting</Text>
            </View>
        )
    }
    const renderOptions = () => {
        let {timeStart} = video || {}
        let start = moment(Number(timeStart)).format("DD ddd, HH:mm")
        return (
            <View
                style={{flexDirection: 'row', justifyContent:'space-between'}}
            >
                <Text>{start}</Text>
                <Button title={'Options'} onPress={() => {
                }}/>
                {/*<Text>{listEvent.length} event video</Text>*/}
            </View>
        )
    }
    if ( !loading && (!listVideo || listVideo.length === 0)) return renderEmpty();
    else {
        return (
            <View style={styles.container}>
                {renderVideo()}
                {renderOptions()}
                <Timeline
                    data={listEvent}
                    contentContainerStyle={{marginTop: 12}}
                    onPress={onPress}
                    // isCard={false}
                />
                {/*<FlatList*/}
                {/*    data={listVideo}*/}
                {/*    keyExtractor={(item, index) => index.toString()}*/}
                {/*    renderItem={renderItem}*/}
                {/*/>*/}
            </View>
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
        marginBottom: 12,
        // backgroundColor: '#000'
    },
});

