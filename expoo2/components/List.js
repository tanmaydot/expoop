import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { Icon } from 'react-native-elements';

const Lists = ({ movies, toggleFavorite, deleteMovie }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Movie List</Text>
      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.movie}>
            <Text style={styles.movieText}>{item.text}</Text>
            <TouchableOpacity onPress={() => toggleFavorite(item.id)}>
              <Icon
                name={item.favorite ? 'heart' : 'heart-outline'}
                type="ionicon"
                color={item.favorite ? 'red' : 'gray'}
                size={24}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => deleteMovie(item.id)}>
              <Icon
                name="trash-bin"
                type="ionicon"
                color="red"
                size={22}
              />
            </TouchableOpacity>
          </View>
        )}
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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  movie: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 8,
    elevation: 2,
  },
  movieText: {
    fontSize: 18,
    color: '#333',
  },
});

export default Lists;
