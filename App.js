import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './react-native-src/navigation/AppNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';
function App() {
    return (
        <SafeAreaProvider>
            <NavigationContainer>
                <AppNavigator />
            </NavigationContainer>
        </SafeAreaProvider>
    );
}

export default App;
