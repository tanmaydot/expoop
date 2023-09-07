import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function useScanHistory() {
  const [scanHistory, setScanHistory] = useState([]);

  useEffect(() => {
    AsyncStorage.getItem('scanHistory')
      .then((data) => {
        if (data) {
          const history = JSON.parse(data);
          setScanHistory(history);
        }
      })
      .catch((error) => {
        console.error('Error fetching scan history: ', error);
      });
  }, []);

  const addScanToHistory = (type, data) => {
    const newHistory = [...scanHistory, { type, data }];
    setScanHistory(newHistory);
    AsyncStorage.setItem('scanHistory', JSON.stringify(newHistory))
      .catch((error) => {
        console.error('Error saving scan history: ', error);
      });
  };

  return { scanHistory, addScanToHistory };
}
