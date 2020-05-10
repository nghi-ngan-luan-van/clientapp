import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthState } from '@observer';
/**
 * Import screen container componnents
 */
import Login from './Login';
// import AuthLoading from "./AuthLoading";
// import AuthPhone from './AuthPhone';
// import AuthOTP from './AuthOTP';
// import EnterNewPass from './AuthNewPass';
// import EnterProfile from './AuthProfile';
import Home from '../main/Home';
import SignUp from './SignUp';
import ResetPassword from './ResetPassword';

const Stack = createStackNavigator();

const AuthStacks = {
    SIGNUP: <Stack.Screen name="SignUp" component={SignUp} />,
    NEWPASS: <Stack.Screen name="AuthNewPass" component={ResetPassword} />,
    // PROFILE: <Stack.Screen name="AuthProfile" component={EnterProfile} />,
    LOGIN: <Stack.Screen name="Login" component={Login} />,
    LOGGED: <Stack.Screen name="MainScreen" component={Home} />,
}

export default class AuthStack extends React.Component {
    constructor(props) {
        super(props);
        this.authState = AuthState.getInstance();
        this.listener = this.authState.attach(this.onChangeAuthState);
        this.state = {
            authState: AuthState.LOADING,
            animationState: false
        }
    }

    componentDidMount() {
        this.authState.getData().then((data) => {
            const { authState } = data || {}
            if (authState == AuthState.LOGIN || authState == AuthState.LOGGED) {
                this.authState.setData({ authState: AuthState.LOGIN });
            }
            else {
                this.authState.setData({ authState: AuthState.SIGNUP });
            }
        })
    }

    componentWillUnmount() {
        this.listener && this.listener.remove();
    }

    onChangeAuthState = ({ authState }) => {
        this.setState({ authState });
    }

    render() {
        const { authState, animationState } = this.state;
        return (
            <Stack.Navigator initialRouteName='AuthLoading' headerMode="none" screenOptions={{ animationEnabled: animationState }}>
                {AuthStacks[authState] ? AuthStacks[authState] : AuthStacks.SIGNUP}
            </Stack.Navigator>
        )
    }
}
