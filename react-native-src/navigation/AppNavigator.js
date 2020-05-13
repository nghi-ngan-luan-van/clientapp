import { StatusBar, View, TextInput, Button } from 'react-native';
import { createStackNavigator } from "@react-navigation/stack";

export const AuthContext = React.createContext();
const Stack = createStackNavigator();
import * as React from 'react';
import { DrawerScreen } from './index'
import AsyncStorage from '@react-native-community/async-storage';
import Home from '../screens/HomeScreen';
import SignIn from '../screens/auth/SignIn';
import HomeNavigator from './HomeNavigator';
import Welcome from '../screens/Welcome';
import { AppRoute } from './app-routes'
const ROOT = "http://206.189.34.187"
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
        // Fetch the token from storage then navigate to our appropriate place
        const bootstrapAsync = async () => {
            let userToken;

            try {
                // userToken = await AsyncStorage.getItem('userToken');
            } catch (e) {
                // Restoring token failed
            }

            // After restoring token, we may need to validate it in production apps



            // This will switch to the App screen or Auth screen and this loading
            // screen will be unmounted and thrown away.
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
                            // re = JSON.parse(result)
                            console.log(result)
                            let { token } = JSON.parse(result)
                            console.log("t", token)
                            if (!token) alert('Wrong email or password, please try again')
                            AsyncStorage.setItem('userToken', token);
                            dispatch({ type: 'SIGN_IN', token: token });
                        }
                    )
                    .catch((error) => {
                        console.log('error signin', error)
                        // dispatch({ type: 'SIGN_IN', token: null })
                    });



            },
            signOut: () => dispatch({ type: 'SIGN_OUT' }),
            signUp: async data => {
                dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
            },
        }),
        []
    );

    // return (
    //     <AuthContext.Provider value={authContext}>
    //         <Stack.Navigator headerMode="none">
    //             {state.userToken == null ?
    //                 state.isLoading === true ?
    //                     <Stack.Screen name="Welcome" component={Welcome} /> :
    //                     <Stack.Screen name="SignIn" component={SignIn} />

    //                 : (
    //                     <Stack.Screen
    //                         name="App"
    //                         component={DrawerScreen}
    //                         headerMode='none'
    //                         options={({ navigation }) => ({
    //                             headerLeft: () => (
    //                                 <MenuButton navigation={navigation} />
    //                             ),
    //                             animationEnabled: false,


    //                         })}

    //                     />
    //                 )}
    //         </Stack.Navigator>
    //     </AuthContext.Provider>
    // );
    if (state.isLoading) {
        // We haven't finished checking for the token yet
        return <View />;
    }

    return (
        <Stack.Navigator>
            {state.userToken == null ? (
                // No token found, user isn't signed in
                <Stack.Screen
                    name="SignIn"
                    component={SignIn}
                    options={{
                        title: 'Sign in',
                        // When logging out, a pop animation feels intuitive
                        // You can remove this if you want the default 'push' animation
                        animationTypeForReplace: state.isSignout ? 'pop' : 'push',
                    }}
                />
            ) : (
                    // User is signed in
                    <Stack.Screen name="App" component={DrawerScreen} />
                )}
        </Stack.Navigator>
    );
}
