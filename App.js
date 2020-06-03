import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AppNavigator from './react-native-src/navigation/AppNavigator';

function App() {
  return (
    <NavigationContainer independent={true}>
      <AppNavigator />
    </NavigationContainer>
  );
}

export default App;
