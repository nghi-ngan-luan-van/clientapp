import React, { Component, useContext } from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';
import { Input, Button } from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';
import { AppRoute } from '../../navigation/app-routes';
import Loader from '../../components/Loader';
import { Colors } from '../../utils/AppConfig';
import LinearGradient from 'react-native-linear-gradient';
import { testConnection } from '../../utils/ApiUtils';
import { AuthContext } from '../../navigation/context';
import { HOST_URL } from '../../utils/AppConst';
class AddingCameraComp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: 'Camera',
            rtspUrl: '',
            thumbnail: 'nothing',
            isTestConnection: false,
            loading: false,
        };
        this.addtoken = null;
        console.log('afafs', this.props);
    }

    async componentDidMount() {}

    onTestCamera = async () => {
        const { signOut } = this.props;
        // const rtspUrl = 'rtsp://85.214.56.86/live/Autobahn/Quickborn-Schnellsen_Nord?vcodecs=h264';
        const { rtspUrl } = this.state;
        const { navigator } = this.props;
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
                // console.log(response.status);
                if (response.status !== 200) {
                    this.setState({ loading: false });

                    alert('Adding camera: Failed');
                } else {
                    return response;
                }
            })
            .then(result => {
                this.setState({ loading: false });

                const { navigation } = this.props;
                if (result) {
                    navigation.navigate(AppRoute.HOME, { params: { reload: true } });
                }
            })
            .catch(error => console.log('error', error));
    };

    render() {
        let { thumbnail } = this.state;
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
                    dd
                    placeholder="Nhập link RTSP URL từ camera của "
                    value={this.state.rtspUrl}
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
                <Text style={styles.text}>Hình ảnh từ camera:</Text>
                {thumbnail !== 'nothing' && (
                    <Image
                        style={[styles.thumbnail, { opacity: this.state.thumbnail !== '' ? 1 : 0 }]}
                        source={{ uri: thumbnail }}
                    />
                )}
            </LinearGradient>
        );
    }
}

export default function AddingCamera(props) {
    const { signOut } = useContext(AuthContext);
    return <AddingCameraComp signOut={signOut} {...props} />;
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
    text: {
        color: Colors.text,
        fontSize: 20,
        fontWeight: 'bold',
    },
    thumbnail: {
        alignSelf: 'center',
        height: 200,
        width: 200,
    },
});
