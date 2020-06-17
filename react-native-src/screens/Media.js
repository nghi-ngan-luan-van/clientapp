import React, {Component, useEffect, useRef, useState} from 'react';
import {Button, Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {HOST_URL} from "../utils/AppConst";
import VLCPlayer from 'react-native-vlc-media-player/VLCPlayer';
import Timeline from "../components/TimeLine/Timeline";
import moment from "moment";
// import CameraVideos from "./details/CameraVideos";
//
// export default function Media (props){
//     return <CameraVideos {...props}/>
// }
//
// export default class Media  extends Component{
//     constructor(props) {
//         super(props);
//         let {camera} = this.props;
//         this.state = {
//             camera: camera,
//             listVideo:null,
//             listEvent:null,
//             displayVideo: null
//         }
//         this.vlcRef = null;
//     }
//    //  const [camera, setCamera] = useState(_.get(props, 'camera', {}));
//    //  const [listVideo, setListVideo] = useState([]);
//    //  const [listEvent, setListEvent] = useState([]);
//    //  const [video, setVideo] = useState();
//    //  const [loaded, setloaded] = useState(true);
//    //  const {_id = ''} = camera || {}
//    //
//    // let vlcref = useRef();
//
//     // useEffect( () => {
//     //     fetchData()
//     //     const data= formatList(listVideo);
//     //     console.log(listVideo)
//     //     setListEvent(data)
//     //     setVideo( listEvent && listEvent[0]|| [])
//     // }, []);
//
//      fetchData = async () => {
//         let token = await AsyncStorage.getItem('userToken')
//
//         let myHeaders = new Headers();
//         myHeaders.append("Content-Type", "application/json");
//         myHeaders.append("Authorization", `Bearer ${token}`);
//
//         let raw = JSON.stringify({"_id": _id});
//
//         let requestOptions = {
//             method: 'POST',
//             headers: myHeaders,
//             body: raw,
//             redirect: 'follow'
//         };
//         await fetch(HOST_URL + "camera/savedvideo", requestOptions)
//             .then(response => response.json())
//             .then(result => {
//                 setloaded(false)
//                 setListVideo(result || [])
//             })
//             .catch(error => console.log('error', error));
//
//     }
//     const formatList = (listVideo) => {
//         let eventVideoArray = [];
//         if (Array.isArray(listVideo) && listVideo.length > 0) {
//             for (let i = 0; i < listVideo.length; i++) {
//                 let {timeStart, timeEnd, cdnUrl} = listVideo[i]
//                 if (cdnUrl !== null) {
//                     //format data: [{date: '...', data:[{...}]}]
//                     let date = moment(Number(timeStart)).startOf('day')
//                     let indexDate = eventVideoArray.findIndex(item => date.isSame(Number(item.date),'day'));
//
//                     let element = listVideo[i] || {};
//                     element.title= camera && camera.name + 'event' + i;
//                     element.subtitle= 'abc';
//                     element.date= Number(timeStart);
//                     if (indexDate === -1) {
//                         eventVideoArray.push({
//                             date: date,
//                             data: [listVideo[i]]
//                         })
//                     } else {
//
//                         eventVideoArray[indexDate] &&
//                         eventVideoArray[indexDate].data &&
//                         eventVideoArray[indexDate].data.push(listVideo[i])
//                     }
//
//                 }
//             }
//         }
//         return eventVideoArray
//     }
//
//      onPress = (video) => {
//         console.log('I am hewew')
//         setVideo(video)
//     }
//      renderVideo = () => (
//         !!video  && !!video.cdnUrl &&
//         <VLCPlayer
//             ref={vlcref}
//             source={{uri: video.cdnUrl}}
//             style={styles.backgroundVideo}
//             videoAspectRatio="16:9"
//         />
//
//     )
//
//      renderItem = ({item, index}) => {
//         let {timeStart, timeEnd} = item;
//
//         let start = new Date(Number(timeStart));
//         let end = new Date(Number(timeEnd));
//         // console.log(timeStart, )
//         return (
//             <View>
//                 {/*<Text>{String(start.getDate())} - {start.getMonth()} - {start.getFullYear()}</Text>*/}
//                 {/*<Text>{String(start.getHours())} : {start.getMinutes()} : {start.getSeconds()}</Text>*/}
//                 {/*<Text>{String(end.getDate())} - {end.getMonth()} - {end.getFullYear()}</Text>*/}
//                 {/*<Text>{String(end.getHours())} : {end.getMinutes()} : {end.getSeconds()}</Text>*/}
//
//
//             </View>
//
//         )
//     }

//      renderEmpty = () => {
//         return (
//             <View style={{alignContent:'center', backgroundColor:'#fff'}}>
//                 <Image source={require('../assets/camera_animate.gif')}/>
//                 <Text style={{color: '#22215B', textAlign:'center', fontSize:14}}>This camera does not contain any event. Turn up your back up mode to experiment movenment detecting</Text>
//             </View>
//         )
//     }
//      renderOptions = () => {
//         let {timeStart} = video || {}
//         let start = moment(Number(timeStart)).format("DD ddd, HH:mm")
//         return (
//             <View
//                 style={{flexDirection: 'row', justifyContent:'space-between'}}
//             >
//                 <Text>{start}</Text>
//                 <Button title={'Options'} onPress={() => {
//                 }}/>
//                 {/*<Text>{listEvent.length} event video</Text>*/}
//             </View>
//         )
//     }
//     render() {
//
//         if (!loaded && (!listVideo || listVideo.length === 0)) return renderEmpty();
//         else {
//             return (
//                 <View style={styles.container}>
//                     {renderVideo()}
//                     {renderOptions()}
//                     <Timeline
//                         data={listEvent}
//                         contentContainerStyle={{marginTop: 12}}
//                         onPress={onPress}
//                         // isCard={false}
//                     />
//                     {/*<FlatList*/}
//                     {/*    data={listVideo}*/}
//                     {/*    keyExtractor={(item, index) => index.toString()}*/}
//                     {/*    renderItem={renderItem}*/}
//                     {/*/>*/}
//                 </View>
//             );
//         }
//     }
// };
//
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         // alignItems:'center',
//         backgroundColor: '#fdfdfd',
//         // padding: 12,
//         // width: '100%'
//     },
//     backgroundVideo: {
//         height: 200,
//         marginBottom: 12,
//         // backgroundColor: '#000'
//     },
// });
//
