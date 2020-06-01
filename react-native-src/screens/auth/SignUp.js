import React, { Component } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { AuthContext } from '../../navigation/AppNavigator'

function SignUp() {
    const [email, setEmail] = React.useState('nghinguyen.170498@gmail.com');
    const [password, setPassword] = React.useState('123456');

    const { signUp } = React.useContext(AuthContext);
    return (
        
    );
}

module.exports = SignIn;
const styles = StyleSheet.create({

});