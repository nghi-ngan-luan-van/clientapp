import React, {Component} from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    Button,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Navigation from '../navigation';
import {AuthContext} from '../navigation/context';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginVertical: 10,
        borderRadius: 5,
    },
});
export default class SignIn extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isSignIn: true,
        };

    }

    _signIn() {

        this.setState({isSignIn: true});

        // const { signIn } = React.useContext(AuthContext);
        // typeof signIn == 'function' && signIn();
    }

    _onPressSignUp = () => {
        let {navigation} = this.props;
        navigation.push('CreateAccount');
    };

    render() {
        return (
            <View style={styles.container}>
                <Text>SignIn</Text>
                <Button title="Sign In" onPress={() => this._signIn()}/>
                <Button
                    title="Create Account"
                    onPress={this._onPressSignUp}
                />
            </View>
        );
    }
};


