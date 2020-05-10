import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { light, mapping } from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import AppNavigator from './react-native-src/navigation/AppNavigator';
import { AppRoute } from './react-native-src/navigation/app-routes';

const isAuthorized = true;

export default class App extends React.Component {

  render() {
    return (
      <React.Fragment>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider
          mapping={mapping}
          theme={light}>
          <SafeAreaProvider>
            <NavigationContainer>
              <AppNavigator initialRouteName={isAuthorized ? AppRoute.HOME : AppRoute.AUTH} />
            </NavigationContainer>
          </SafeAreaProvider>
        </ApplicationProvider>
      </React.Fragment>
    );
  }
};
