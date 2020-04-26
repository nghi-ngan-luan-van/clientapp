import React, {Component} from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

export default class CreateAccount extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>SignIn</Text>
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

