import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const navigation = useNavigation();

  const navigateToScanner = () => {
    navigation.navigate('Scanner');
  };

  const navigateToHistory = () => {
    navigation.navigate('ScanHistory');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text} > 🤖 Scan QRcode or Barcode 😼 </Text>
      <TouchableOpacity 
        onPress={navigateToScanner}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Scanner</Text>
      </TouchableOpacity>
      <Text style={styles.text} > 🧞 View History 🧜 </Text>
      <TouchableOpacity 
        onPress={navigateToHistory}
        style={styles.button}
      >
        <Text style={styles.buttonText}>History</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#f0e5d8",
  },
  button: {
    padding: 15,
    backgroundColor: '#dca78f',
    borderRadius: 25,
    marginTop: 10,
    width: 200, 
    alignItems: 'center', 
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold', 
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold', 
    marginTop: 15,
    padding: 5,
  }
});
