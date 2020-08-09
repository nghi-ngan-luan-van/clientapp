import React, { Component, useContext } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Input, Button } from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';
import { AppRoute } from '../../navigation/app-routes';
import Loader from '../../components/Loader';
import { Colors } from '../../utils/AppConfig';
import LinearGradient from 'react-native-linear-gradient';
import { testConnection } from '../../utils/ApiUtils';
import { AuthContext } from '../../navigation/AppNavigator';
import { HOST_URL } from '../../utils/AppConst';
class AddingCameraComp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: 'Camera',
            rtspUrl: '',
            // rtspUrl: 'rtsp://172.16.3.134:8080/h264_ulaw.sdp',
            thumbnail: 'nothing',
            isTestConnection: false,
            loading: false,
        };
        this.addtoken = null;
    }

    async componentDidMount() {}

    onTestCamera = async () => {
        const { signOut } = this.props;
        // const rtspUrl = 'rtsp://85.214.56.86/live/Autobahn/Quickborn-Schnellsen_Nord?vcodecs=h264';
        const { rtspUrl } = this.state;
        const { navigaton } = this.props;
        console.log('navigator', navigator);
        this.setState({
            loading: true,
        });

        const userToken = await AsyncStorage.getItem('userToken');
        // console.log('token', token);
        try {
            await testConnection({ rtspUrl, userToken }, result => {
                console.log('result', result);
                if (!result) {
                    console.log('fail');
                    this.setState({ loading: false });
                } else {
                    console.log(result);
                    this.setState(
                        { thumbnail: result.toString(), isTestConnection: true, loading: false },
                        () => {
                            this.setState({ loading: false });

                            // console.log(this.state.thumbnail)
                        }
                    );
                }
            });
        } catch (e) {
            typeof signOut === 'function' && signOut();
        }
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

        await fetch(HOST_URL + 'camera/add', requestOptions)
            .then(response => {
                console.log(response.status);
                if (response.status !== 200) {
                    alert('Adding camera: Failed');
                    this.setState({ loading: false });
                } else {
                    return response;
                }
            })
            .then(result => {
                this.setState({ loading: false });
                const { navigation } = this.props;
                navigation.push(AppRoute.HOME, { reload: true });
            })
            .catch(error => console.log('error', error));
    };

    render() {
        return (
            <LinearGradient
                style={{ flex: 1, padding: 12 }}
                colors={[Colors.purple_blue, Colors.pigeon_post, Colors.screen]}
                start={{ x: 1, y: 1 }}
                end={{ x: 0, y: 0 }}
            >
                <Loader loading={this.state.loading} />
                <Input
                    labelStyle={styles.label}
                    label={'Tên camera'}
                    placeholder="Tên camera"
                    inputContainerStyle={styles.inputRow}
                    onChangeText={name => this.setState({ name })}
                />

                <Input
                    labelStyle={styles.label}
                    label={'URL'}
                    placeholder="Nhập link RTSP URL từ camera của "
                    value={this.state.rtspUrl}
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
            </LinearGradient>
        );
    }
}

export default function AddingCamera() {
    const { signOut } = useContext(AuthContext);
    return <AddingCameraComp signOut={signOut} />;
}

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
