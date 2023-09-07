import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useScanHistory } from './ScanHistoryHook';

export default function ScanHistory() {
  const { scanHistory } = useScanHistory();

  const renderItem = ({ item }) => (
    <Text style={styles.scanText}>
      {item.type}: {item.data}
    </Text>
  );

  return (
    <View style={styles.scanContainer}>
      {/* <Text style={styles.scanTitle}> Your Scan's </Text> */}
      <FlatList
        style={styles.scanList}
        data={scanHistory}
        renderItem={renderItem}
        keyExtractor={(_item, index) => index.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  scanContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: "#f0e5d8",
  },
  /* scanTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    margin: 20,
    padding: 5,
    color: '#3d2c29',
    backgroundColor: '#dca78f',
    borderRadius: 10,
    
  }, */
  scanList: {
    width: '90%', 
    margin: 10,
  },
  scanText: {
    fontSize: 16,
    margin: 5, 
    color: '#3d2c29',
  },
});
