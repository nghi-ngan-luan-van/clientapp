import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import { Input } from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';

class AddingCamera extends Component {
    constructor(props) {
        super(props);
        this.state = {
            camera: {}

        };
        this.token = null;
    }

    async componentDidMount() {
        this.token = await AsyncStorage.getItem('userToken');

    }




    onAddCamera = async (cam) => {
        //call api get all data of this user
        // let { rtspUrl, name } = this.state;
        let camera = {
            "camera": cam
        }

        // camera = JSON.stringify(camera)
        console.log("cam", camera)


        let token = await AsyncStorage.getItem('userToken');
        var requestOptions = {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: camera,
            // redirect: 'follow'
        };
        console.log('camera', requestOptions)


        await fetch("http://206.189.34.187/camera/add", requestOptions)
            .then(response => response.text())
            .then(result => {
                console.log(result)
            })
            .catch(error => console.log('error', error));


    }

    render() {
        let camera = {
            name: '',
            rtspUrl: '',
        }
        return (
            <View>
                <Input
                    placeholder="Name"
                    leftIcon={{ type: 'font-awesome', name: 'comment' }}
                    style={{ height: '36' }}
                    onChangeText={name => camera.name = name}
                />

                <Input
                    placeholder="Url"
                    leftIcon={{ type: 'font-awesome', name: 'comment' }}
                    style={{ height: '36' }}
                    onChangeText={rtspUrl => camera.rtspUrl = rtspUrl}
                />

                <Button title={'ADD'} onPress={() => this.onAddCamera(camera)} />
            </View>
        );
    }
}

export default AddingCamera;
