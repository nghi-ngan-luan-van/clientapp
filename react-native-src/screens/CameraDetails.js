import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import RtspVideoPlayer from '../components/RtspVideoPlayer'
import _ from "lodash";
export default class CameraDetails extends Component {
    constructor(props) {
        super(props);
        this.camera = this.props.route.params.camera;
    }
    componentDidMount(){
        // alert('isDidmount')
    }

    render() {
        let {rtspUrl} = this.camera;
        return (
            <View style={styles.container}>
                <Text>CameraDetails</Text>
                <RtspVideoPlayer
                    url={rtspUrl}
                />
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: Colors.lighter,
    },
    body: {
        backgroundColor: Colors.white,
    },
});

