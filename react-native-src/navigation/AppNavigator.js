import { createStackNavigator } from '@react-navigation/stack';
import HomeNavigator from './HomeNavigator';
import * as React from 'react';
import Welcome from '../screens/Welcome';
import AsyncStorage from '@react-native-community/async-storage';
import { AuthNavigator } from './AuthNavigator';
import { AppRoute } from './app-routes';
import { getUserCameras, signIn, signInGG } from '../utils/ApiUtils';
// import notifee from '@notifee/react-native';
const Stack = createStackNavigator();
import { AuthContext } from './context';
export default function AppNavigator() {
    const [state, dispatch] = React.useReducer(
        (prevState, action) => {
            switch (action.type) {
                case 'RESTORE_TOKEN':
                    return {
                        ...prevState,
                        userToken: action && action.token,
                        isLoading: false,
                        isSignout: false,
                        data: action.data,
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
            data: [],
        }
    );

    React.useEffect(() => {
        const bootstrapAsync = async () => {
            let userToken;
            try {
                userToken = await AsyncStorage.getItem('userToken');
                await getUserCameras({ userToken }, response => {
                    if (response) {
                        state.isLoading = false;
                        dispatch({ type: 'RESTORE_TOKEN', token: userToken, data: response });
                    } else {
                        dispatch({ type: 'RESTORE_TOKEN', token: null });
                    }
                });
            } catch (e) {
                // Restoring token failed
                console.warn('Restoring token failed');
            }
        };

        bootstrapAsync();
    }, []);

    const authContext = React.useMemo(
        () => ({
            signIn: async (data, callback) => {
                try {
                    await signIn(data, async result => {
                        let { token } = result || {};
                        if (!token) {
                            alert(result);
                            callback && callback();
                            // alert('Wrong email or password, please try again');
                        } else {
                            await AsyncStorage.setItem('userToken', token);
                            dispatch({ type: 'SIGN_IN', token: token });
                        }
                    });
                } catch (e) {
                    console.warn('Signin Error');
                }
            },

            googleSignIn: async (data, callback) => {
                try {
                    await signInGG(data, async result => {
                        let { token } = result || {};
                        if (!token) {
                            callback && callback();
                            alert('Wrong email or password, please try again');
                        } else {
                            await AsyncStorage.setItem('userToken', token);
                            // await AsyncStorage.setItem('userData', data);
                            dispatch({ type: 'SIGN_IN', token: token });
                        }
                    });
                } catch (e) {
                    console.warn('Signin GG Error');
                }
            },

            signOut: async () => {
                try {
                    await AsyncStorage.setItem('userToken', 'null');
                    dispatch({ type: 'SIGN_OUT' });
                } catch (e) {}
            },
        }),
        []
    );

    return (
        <AuthContext.Provider value={authContext}>
            <Stack.Navigator headerMode="none">
                {state.userToken == null ? (
                    state.isLoading === true ? (
                        <Stack.Screen name="Welcome" component={Welcome} />
                    ) : (
                        <Stack.Screen name={AppRoute.SIGN_IN} component={AuthNavigator} />
                    )
                ) : (
                    <Stack.Screen
                        name="App"
                        component={HomeNavigator}
                        options={{
                            animationEnabled: false,
                        }}
                        initialParams={state.data}
                    />
                    // <Stack.Screen name={AppRoute.SIGN_IN} component={AuthNavigator} />
                )}
            </Stack.Navigator>
        </AuthContext.Provider>
    );
}
