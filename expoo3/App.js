import React from 'react';
import { View, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import CameraComponent from './Components/CameraComponent';

const App = () => {
  return (
    <View style={styles.container}>
      <CameraComponent />
      <StatusBar backgroundColor='red' />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#aaa',
  },
});

export default App;