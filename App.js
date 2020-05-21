import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './react-native-src/navigation/AppNavigator';
import { AppRoute } from './react-native-src/navigation/app-routes';

const isAuthorized = true;

export default class App extends React.Component {

  render() {
    return (

      <NavigationContainer>
        <AppNavigator initialRouteName={ AppRoute.HOME } />
      </NavigationContainer>

    );
  }
};
