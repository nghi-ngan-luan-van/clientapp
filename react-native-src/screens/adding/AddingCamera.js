import React, { Component } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import { Input } from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';
import { AppRoute } from '../../navigation/app-routes';
import Loader from '../../components/LoadingModal';

class AddingCamera extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            rtspUrl: '',
            thumbnail: '',
            isTestConnection: false,
            loading: false,
        };
        this.token = null;
    }

    async componentDidMount() {
        this.token = await AsyncStorage.getItem('userToken');
    }

    onTestCamera = async () => {
        const { rtspUrl, name } = this.state;

        this.setState({
            loading: true,
        });

        var myHeaders = new Headers();
        myHeaders.append('Authorization', `Bearer ${this.token}`);
        myHeaders.append('Content-Type', 'application/json');

        const raw = JSON.stringify({
            rtspUrl,
        });

        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow',
        };

        await fetch('http://128.199.211.44/camera/testconnection', requestOptions)
            .then(response => {
                // console.log(response.status)
                if (response.status !== 200) {
                    alert('Test connection: Failed');
                    this.setState({ loading: false });
                } else {
                    return response.text();
                }
            })
            .then(result => {
                // console.log(result)
                if (result) {
                    alert('Test connection: Successful');
                    this.setState(
                        { thumbnail: result.toString(), isTestConnection: true, loading: false },
                        () => {
                            // console.log(this.state.thumbnail)
                        }
                    );
                }
            })
            .catch(error => console.log('error', error));
    };
    onAddCamera = async () => {
        this.setState({
            loading: true,
        });

        //call api get all data of this user
        let { rtspUrl, name, thumbnail } = this.state;

        let token = await AsyncStorage.getItem('userToken');

        var myHeaders = new Headers();
        myHeaders.append('Authorization', `Bearer ${token}`);
        myHeaders.append('Content-Type', 'application/json');

        var raw = JSON.stringify({
            rtspUrl,
            name,
            thumbnail,
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow',
        };

        await fetch('http://128.199.211.44/camera/add', requestOptions)
            .then(response => {
                console.log(response.status);
                if (response.status !== 200) {
                    alert('Adding camera: Failed');
                    this.setState({ loading: false });
                } else {
                    return response.text();
                }
            })
            .then(result => {
                result;
                this.setState({ loading: false });
                const { navigation } = this.props;
                navigation.push(AppRoute.HOME, { reload: true });
            })
            .catch(error => console.log('error', error));
    };

    render() {
        // console.log(this.state)
        // let camera = {
        //     name: '',
        //     rtspUrl: '',
        // }
        return (
            <View>
                <Loader loading={this.state.loading} />
                <Input
                    placeholder="Name"
                    leftIcon={{ type: 'font-awesome', name: 'comment' }}
                    style={{ height: '36' }}
                    onChangeText={name => this.setState({ name })}
                />

                <Input
                    placeholder="Url"
                    leftIcon={{ type: 'font-awesome', name: 'comment' }}
                    style={{ height: '36' }}
                    onChangeText={rtspUrl => this.setState({ rtspUrl })}
                />

                <Button
                    disabled={!this.state.isTestConnection}
                    title={'ADD'}
                    onPress={this.onAddCamera}
                />
                <Button title={'Test Connection'} onPress={this.onTestCamera} />
            </View>
        );
    }
}

export default AddingCamera;
