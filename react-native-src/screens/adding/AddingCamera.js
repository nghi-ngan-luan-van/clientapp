import React, { Component } from 'react';
import { View, Text, Alert, Image, StyleSheet } from 'react-native';
import { Input, Button } from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';
import { AppRoute } from '../../navigation/app-routes';
import Loader from '../../components/LoadingModal';
import { HOST_URL } from '../../utils/AppConst';
import { Colors } from '../../utils/AppConfig';
import LinearGradient from 'react-native-linear-gradient';

class AddingCamera extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            rtspUrl: '',
            thumbnail: 'nothing',
            isTestConnection: false,
            loading: false,
        };
        this.token = null;
        this.addtoken = null;
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

        await fetch(HOST_URL + 'camera/testconnection', requestOptions)
            .then(response => {
                // console.log(response.status)
                if (response.status !== 200) {
                    // alert('Test connection: Failed');
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

        const raw = JSON.stringify({
            rtspUrl,
            name,
            thumbnail,
        });

        const requestOptions = {
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
            <LinearGradient
                style={{ flex: 1, padding: 12 }}
                colors={[Colors.brandy_rose, Colors.pigeon_post, Colors.screen]}
                start={{ x: 1, y: 1 }}
                end={{ x: 0, y: 0 }}
            >
                {/*<View style={{ flex: 1, backgroundColor: Colors.white }}>*/}
                <Loader loading={this.state.loading} />
                <Input
                    labelStyle={styles.label}
                    label={'Tên camera'}
                    placeholder="Tên camera"
                    // leftIcon={{ type: 'font-awesome', name: 'home' }}
                    inputContainerStyle={styles.inputRow}
                    // style={{ marginBottom: -24 }}
                    onChangeText={name => this.setState({ name })}
                />

                <Input
                    labelStyle={styles.label}
                    label={'URL'}
                    placeholder="Nhập Url"
                    // leftIcon={{ type: 'font-awesome', name: 'comment' }}
                    // style={styles.inputRow}
                    inputContainerStyle={styles.inputRow}
                    onChangeText={rtspUrl => this.setState({ rtspUrl })}
                />
                <View style={styles.buttonRow}>
                    <Button
                        disabled={!this.state.isTestConnection}
                        title={'Thêm camera'}
                        onPress={this.onAddCamera}
                        style={styles.button}
                    />
                    <Button style={styles.button} title={'Kiểm tra'} onPress={this.onTestCamera} />
                </View>
                <Image
                    style={{
                        height: 200,
                        width: 200,
                        opacity: this.state.thumbnail !== '' ? 1 : 0,
                    }}
                    source={{ uri: this.state.thumbnail }}
                />
                {/*</View>*/}
            </LinearGradient>
        );
    }
}

export default AddingCamera;
const styles = StyleSheet.create({
    inputRow: {
        // height: 50,
        borderRadius: 12,
        backgroundColor: Colors.white,
        // marginTop: 12,
        padding: 6,
        borderBottomWidth: 0,
    },
    label: { color: Colors.grey, marginBottom: 5 },
    buttonRow: {
        justifyContent: 'space-around',
        flexDirection: 'row',
    },
    button: {
        padding: 12,
        // marginBottom: 12,
        borderRadius: 5,
    },
});
