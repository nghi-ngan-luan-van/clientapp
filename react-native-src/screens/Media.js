import React, {useEffect, useRef, useState} from 'react';
import {Button, Dimensions, StyleSheet, Text, View} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import _ from "lodash";
import {HOST_URL} from "../utils/AppConst";
import VLCPlayer from 'react-native-vlc-media-player/VLCPlayer';
import Timeline from "react-native-beautiful-timeline";
import moment from "moment";

const WIDTH = Dimensions.get('window').width;
export default function Media(props, route) {
    const url = 'https://clientapp.sgp1.digitaloceanspaces.com/5ed3e22848d6943ed70ec47f/5_5/_002.mp4'

    const [camera, setCamera] = useState(_.get(props, 'route.params.camera', {}));
    const [cameras, setCameras] = useState(_.get(props, 'route.params.cameras', {}));
    const [listVideo, setListVideo] = useState([]);
    const [listEvent, setListEvent] = useState([]);
    const [video, setVideo] = useState(url);
    const {_id = ''} = camera || {}
   let vlcref = useRef();

    useEffect( () => {
        fetchData()
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
                setListVideo(result || [])
                setListEvent(formatList(result) || [])
                setVideo(listEvent[0].data[0] || [])


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
    console.log('dfghjjhgfds',video)

    const onPress = (video) => () => {
        const {navigation} = props || {};
        navigation.navigate(
            'MediaDetail',
            {video: video}
        )
    }
    const renderVideo = () => (
        <VLCPlayer
            // ref={el=> vlcref=el}
            source={{uri: "https://clientapp.sgp1.digitaloceanspaces.com/5e9471d6cbeb62504f03bc0b/5ed3e22848d6943ed70ec47f/1591588193850.mp4"}}
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
            <View><Text>no video</Text></View>
        )
    }
    const renderOptions = () => {
        let {timeStart} = video || {}
        // console.log(listEvent)
        let start = moment(Number(timeStart)).format("DD ddd, HH:mm")
        return (
            <View
                style={{flexDirection: 'row'}}
            >
                <Text>{start}</Text>
                <Button title={'Options'} onPress={() => {
                }}/>
                {/*<Text>{listEvent.length} event video</Text>*/}
            </View>
        )
    }
    if (!listVideo || listVideo.length === 0) return renderEmpty();
    else {
        return (
            <View style={styles.container}>
                {/*<Text>{String(video)}</Text>*/}
                {renderVideo()}
                {renderOptions()}
                <Timeline
                    data={listEvent}
                    contentContainerStyle={{marginTop: 12}}
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
        backgroundColor: '#000'
    },
});

