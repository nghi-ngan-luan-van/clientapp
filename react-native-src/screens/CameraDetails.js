import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import RtspVideoPlayer from '../components/RtspVideoPlayer'
import _ from "lodash";
import { AppRoute } from '../navigation/app-routes';
import { TouchableOpacity } from 'react-native';
export default class CameraDetails extends Component {
    constructor(props) {
        super(props);
        this.camera = _.get(this.props, 'route.params.camera', {});
    }

    goToMedia = () => {
        let { navigation } = this.props;
        navigation && navigation.push(AppRoute.MEDIA, { cameraId: this.camera && this.camera._id })
    }
    render() {
        let { rtspUrl } = this.camera;
        return (
            <View style={styles.container}>

                <TouchableOpacity styles={{ height: 24 }} onPress={this.goToMedia}>
                    <Text>acb</Text>
                </TouchableOpacity>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.lighter,
    },
    body: {
        backgroundColor: Colors.white,
    },
});

