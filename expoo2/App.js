import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import Movie from './components/Movie';

export default function App() {
  return (
    <View style={styles.container}>
      <Movie />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5', // Neutral background color
    alignItems: 'center', // Center horizontally
    justifyContent: 'center', // Center vertically
  },
});
