import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, ScrollView, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  const apiUrl = 'https://dummyjson.com/products';

  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchData = () => {
    setLoading(true);
    setError('');

    fetch(apiUrl + '?limit=0', {
      method: 'GET',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((responseData) => {
        setData(responseData);
      })
      .catch((err) => {
        setError('Error fetching data. Please try again.');
        console.error('Error fetching data:', err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const addData = () => {
    setLoading(true);
    setError('');

    fetch(apiUrl + '/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: 'BMW Pen',
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((responseData) => {
        setData(responseData);
      })
      .catch((err) => {
        setError('Error adding data. Please try again.');
        console.error('Error adding data:', err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const updateData = () => {
    setLoading(true);
    setError('');

    fetch(apiUrl + '/1', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: 'iPhone Galaxy 11',
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((responseData) => {
        setData(responseData);
      })
      .catch((err) => {
        setError('Error updating data. Please try again.');
        console.error('Error updating data:', err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const removeData = () => {
    setLoading(true);
    setError('');

    fetch(apiUrl + '/1', {
      method: 'DELETE',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((responseData) => {
        setData(responseData);
      })
      .catch((err) => {
        setError('Error deleting data. Please try again.');
        console.error('Error deleting data:', err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const resetData = () => {
    setData(null);
    setError('');
    setLoading(false);
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.container}>
        <TouchableOpacity onPress={fetchData} style={styles.button}>
          <Text>Get Data</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={addData} style={styles.button}>
          <Text>Add Data</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={updateData} style={styles.button}>
          <Text>Update Data</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={removeData} style={styles.button}>
          <Text>Delete Data</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={resetData} style={styles.button}>
          <Text>Home</Text>
        </TouchableOpacity>
        {loading ? (
          <ActivityIndicator size="small" color="orange" />
        ) : null}
        {data !== null ? (
          <ScrollView style={styles.scrollView}>
            <Text style={styles.dataText}>{JSON.stringify(data, null, 1)}</Text>
          </ScrollView>
        ) : null}
        {error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : null}
      </View>
      <StatusBar backgroundColor="orange" />
    </SafeAreaView>
  );
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  safeAreaView: {
    flex: 1,
  },
  button: {
    width: 150,
    height: 40,
    backgroundColor: 'orange',
    borderRadius: 25,
    marginTop: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dataText: {
    flex: 1,
    marginTop: 20,
    fontSize: 16,
  },
  errorText: {
    marginTop: 20,
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
  },
  scrollView: {
    marginTop: 20,
    width: '100%',
    height: 'auto',
  },
});