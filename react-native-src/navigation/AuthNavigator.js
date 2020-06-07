import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {AppRoute} from './app-routes';
import {SignIn, SignInForm} from '../screens/auth/SignIn';
import Header from "../components/Header";
import {View} from "react-native";

const Stack = createStackNavigator();

export const AuthNavigator = () => (
    <Stack.Navigator
        screenOptions={(props) => ({
            animationEnabled: false,
            header: (props) => (<Header {...props} titleMode={'none'}/>)
        })}
        headerMode='float'
    >
        <Stack.Screen options={({}) => ({
            header: () => {
                return (<View/>);
            },

        })} name={AppRoute.SIGN_IN} component={SignIn}/>
        <Stack.Screen name={AppRoute.SIGN_IN_FORM} component={SignInForm}/>
        {/* <Stack.Screen name={AppRoute.SIGN_UP} component={SignUpScreen}/> */}
        {/* <Stack.Screen name={AppRoute.RESET_PASSWORD} component={ResetPasswordScreen}/> */}
    </Stack.Navigator>
);