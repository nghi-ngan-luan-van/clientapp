import React, { Component } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    Image,
    TouchableOpacity,
    FlatList,
    Dimensions,
    AsyncStorage
} from 'react-native';
import _ from 'lodash';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const WIDTH_SCREEN = Dimensions.get('window').width;

export default class Media extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listVideo: []
        }
        this.cameraId = _.get(this.props, 'route.params.cameraId', '0');
    }

    async componentDidMount() {
        //call api get all data of this user
        let token = await AsyncStorage.getItem('userToken')
        // console.log(this.cameraId);
        // var raw = JSON.stringify({ "_id": "5ea51d2b907fa122b48a1853" });

        // const response = await fetch("http://206.189.34.187/camera/savedvideo",
        //     {
        //         method: 'POST',
        //         body: raw,
        //         redirect: 'follow',
        //         headers: {
        //             'Authorization': `Bearer ${token}`
        //         },
        //     })
        //     .then(response => response.text())
        //     .then(result => console.log('dddddd', result))
        //     .catch(error => console.log('error MEDIA', error));
        // console.log('aaa', response)
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", `Bearer ${token}`);

        var raw = JSON.stringify({ "_id": this.cameraId });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        await fetch("http://165.22.98.234/camera/savedvideo", requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                this.setState({
                    listVideo: result || []
                })
            })
            .catch(error => console.log('error', error));
       
    }

    onPress = (video) => () => {
        const { navigation } = this.props || {};
        navigation.navigate(
            'MediaDetail',
            { video: video }
        )
    }

    renderEmpty() {
        return (
            <View><Text>no video</Text></View>
        )
    }

    render() {
        const { listVideo } = this.state;
        console.log("listvideo", listVideo)
        if (listVideo.length === 0) return this.renderEmpty();
        return (
            <View style={styles.container}>
                <FlatList
                    style={{ flex: 1, width: WIDTH_SCREEN - 24 }}
                    data={listVideo}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity
                            style={{ flex: 1, paddingHorizontal: 6 }}
                            onPress={this.onPress(item)}
                        >
                            <Text numberOfLines={1}>{item.name}</Text>
                            <Image
                                style={{ height: (WIDTH_SCREEN / 2 - 24) / 251 * 130, width: '100%', resizeMode: 'contain' }}
                                source={{ uri: item.name }}
                            />
                        </TouchableOpacity>
                    )}
                />
            </View>
        );
    }
};

const styles = StyleSheet.create({
    gridView: {
        flex: 1,
    },
    container: {
        flex: 1,
        // alignItems:'center',
        backgroundColor: Colors.lighter,
        padding: 12,
        width: '100%'
    },
    body: {
        backgroundColor: Colors.white,
    },
    itemContainer: {
        justifyContent: 'flex-end',
        borderRadius: 5,
        padding: 10,
        height: 150,
    }
});

