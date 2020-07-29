import React, { Component } from 'react';
import { Image, StyleSheet, Dimensions, View } from 'react-native';
import { Colors } from '../utils/AppConfig';
const WIDTH = Dimensions.get('window').width;
export default class Welcome extends Component {
    render() {
        return (
            <View style={styles.container}>
                {/*<Image*/}
                {/*    source={require('../assets/preview.gif')}*/}
                {/*    resizeMode={'contain'}*/}
                {/*    style={{ width: WIDTH }}*/}
                {/*/>*/}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.white },
});
