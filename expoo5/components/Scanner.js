import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Audio } from 'expo-av';
import { useNavigation } from '@react-navigation/native';
import { useScanHistory } from './ScanHistoryHook';


export default function Scanner() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [scannedData, setScannedData] = useState(null);
  const navigation = useNavigation();
  const { addScanToHistory } = useScanHistory();

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      if (status === 'granted') {
        setHasPermission(true);
      } else {
        setHasPermission(false);
      }
    })();
  }, []);

  const playBeepSound = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require('../assets/audio/beeped.mp3')
    );
    await sound.playAsync();
  };

  const handleScannerScanned = ({ type, data }) => {
    setScanned(true);
    setScannedData({ type, data });
    playBeepSound();
    addScanToHistory(type, data);
  };

  const resetScan = () => {
    setScanned(false);
    setScannedData(null);
  };

  if (hasPermission === null) return <View />;
  if (hasPermission === false) return <Text style={styles.text}>Camera permission not granted</Text>;

  const navigateToHistory = () => {
    navigation.navigate('ScanHistory');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome!</Text>
      <Text style={styles.paragraph}>Scan a code.</Text>
      <View style={styles.cameraContainer}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleScannerScanned}
          style={styles.camera}
        />
      </View>
      {scannedData && (
        <View style={styles.scannedDataContainer}>
          <Text style={styles.scannedDataText}>
            Bar code type: {scannedData.type}, data: {scannedData.data}
          </Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={resetScan}>
              <Text style={styles.buttonText}>Reset</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={navigateToHistory}>
              <Text style={styles.buttonText}>History</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#f0e5d8",
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 2,
    color: '#3d2c29',
  },
  paragraph: {
    fontSize: 16,
    marginBottom: 5,
    color: '#3d2c29',
  },
  cameraContainer: {
    width: '100%',
    height: '70%',
    aspectRatio: 1/2,
    overflow: 'hidden',
  },
  camera: {
    flex: 1,
  },
  scannedDataContainer: {
    alignItems: 'center',
  },
  scannedDataText: {
    fontSize: 16,
    margin: 15,
    color: '#3d2c29',
    textShadowColor: 'rgba(0,0,0,0.6)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 10,
    padding: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#dca78f',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 15,
    marginHorizontal: 10,
    width: 80,
    height: 40,
    textAlign: 'center',
    alignItems: 'center', 
  },  
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 16,
    color: '#3d2c29',
  },
});
