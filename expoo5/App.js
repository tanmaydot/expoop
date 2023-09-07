import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './components/Home';
import Scanner from './components/Scanner';
import ScanHistory from './components/ScanHistory';
import { View, StyleSheet } from 'react-native';
import * as Font from 'expo-font';

const Stack = createNativeStackNavigator();

export default function App() {
  useEffect(() => {
    Font.loadAsync({
      'poppins-regular': require('./assets/fonts/Poppins-Regular.ttf'),
      'poppins-bold': require('./assets/fonts/Poppins-Bold.ttf'),
    });
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerStyle: {
              backgroundColor: "#f0e5d8",
            },
          }}
        >
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Scanner" component={Scanner} />
          <Stack.Screen name="ScanHistory" component={ScanHistory} />
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar backgroundColor='#dca78f' />
    </View>
  );
}
