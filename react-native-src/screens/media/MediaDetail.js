import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import Video from 'react-native-video';
export default class CameraDetails extends Component {
    constructor(props) {
        super(props);
        this.url = this.props.route.params.video.name;
    }
    componentDidMount() {
        
    }

    render() {
        let url = this.url;
        return (
            <View style={styles.container}>
                <Text>{url}</Text>
                <Video source={{ uri: url }}   // Can be a URL or a local file.
                    style={styles.backgroundVideo}                                         // Store reference
                />
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#222222",
    },
    body: {
        backgroundColor: Colors.white,
    },
    backgroundVideo:{
        height: 600
    }
});

