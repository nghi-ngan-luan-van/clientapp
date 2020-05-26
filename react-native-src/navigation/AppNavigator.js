import { StatusBar, View, TextInput, Button } from 'react-native';
import { createStackNavigator } from "@react-navigation/stack";

export const AuthContext = React.createContext();
const Stack = createStackNavigator();
import * as React from 'react';
import { DrawerScreen } from './index';
import Welcome from '../screens/Welcome';
import AsyncStorage from '@react-native-community/async-storage';
import SignIn from '../screens/auth/SignIn';

const ROOT = "http://165.22.98.234"
export default function AppNavigator({ navigation }) {
    const [state, dispatch] = React.useReducer(
        (prevState, action) => {
            switch (action.type) {
                case 'RESTORE_TOKEN':
                    return {
                        ...prevState,
                        userToken: action.token,
                        isLoading: false,
                    };
                case 'SIGN_IN':
                    return {
                        ...prevState,
                        isSignout: false,
                        userToken: action.token,
                    };
                case 'SIGN_OUT':
                    return {
                        ...prevState,
                        isSignout: true,
                        userToken: null,
                    };
            }
        },
        {
            isLoading: true,
            isSignout: false,
            userToken: null,
        }
    );

    React.useEffect(() => {
        const bootstrapAsync = async () => {
            let userToken;
            dispatch({ type: 'RESTORE_TOKEN', token: userToken });
        };

        bootstrapAsync();
    }, []);

    const authContext = React.useMemo(
        () => ({
            signIn: async (data) => {
                let { email, password } = data || {};
                let myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");
                let raw = JSON.stringify(data);
                let requestOptions = {
                    method: 'POST',
                    headers: myHeaders,
                    body: raw,
                    redirect: 'follow'
                };

                fetch(ROOT + "/auth/login", requestOptions)
                    .then(response => response.text())
                    .then(
                        (result) => {
                            console.log(result)
                            let { token } = JSON.parse(result)
                            console.log("t", token)
                            if (!token) alert('Wrong email or password, please try again')
                            AsyncStorage.setItem('userToken', token);
                            dispatch({ type: 'SIGN_IN', token: token });
                        }
                    )
                    .catch((error) => {
                        console.log('error signin 123', error)
                    });



            },
            signOut: () => dispatch({ type: 'SIGN_OUT' }),
            signUp: async data => {
                dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
            },
        }),
        []
    );

    return (
        <AuthContext.Provider value={authContext}>
            <Stack.Navigator headerMode="none">
                {state.userToken == null ?
                    state.isLoading === true ?
                        <Stack.Screen name="Welcome" component={Welcome} /> :
                        <Stack.Screen name="SignIn" component={SignIn} />

                    : (
                        <Stack.Screen
                            name="App"
                            component={DrawerScreen}
                            headerMode='none'
                            options={({ navigation }) => ({
                                animationEnabled: false,
                            })}

                        />
                    )}
            </Stack.Navigator>
        </AuthContext.Provider>
    );
}
