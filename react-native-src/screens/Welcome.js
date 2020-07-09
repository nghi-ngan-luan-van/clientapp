import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class Welcome extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Welcome to NN Application</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        textAlign: 'center',
    },
});
