import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { Icon } from 'react-native-elements';

const Fav = ({ movies, onToggleFavorite }) => {
  const renderItem = ({ item }) => {
    return (
      <View style={styles.favContainer}>
        <Text style={styles.favText}>{item.text}</Text>
        <TouchableOpacity onPress={() => onToggleFavorite(item.id)}>
          <Icon
            name={item.favorite ? 'trash-bin' : 'trash-bin-outline'}
            type="ionicon"
            color={item.favorite ? 'red' : 'gray'}
            size={24}
          />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favorite List</Text>
      <FlatList
        data={movies.filter((movie) => movie.favorite)}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f4f4f4',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  favContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginBottom: 10,
    backgroundColor: 'white',
    padding: 1,
    borderRadius: 8,
    elevation: 2,
  },
  favText: {
    flex: 1,
    marginRight: 10,
    fontSize: 18,
    color: '#333',
  },
});

export default Fav;
