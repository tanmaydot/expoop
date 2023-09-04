import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, SafeAreaView } from 'react-native';
import Lists from './List'; 
import FavList from './Fav'; 

const Movie = () => { 
  const [newMovie, setNewMovie] = useState('');
  const [movies, setMovies] = useState([]);

  const addMovie = () => {
    if (newMovie.trim() !== '') {
      const newMovieItem = {
        id: Date.now(),
        text: newMovie,
        favorite: false,
      };
      console.log('Adding movie:', newMovieItem);
      setMovies([...movies, newMovieItem]);
      setNewMovie('');
    }
  };

  const toggleFavorite = (id) => {
    const updatedMovies = movies.map((movie) => {
      if (movie.id === id) {
        return { ...movie, favorite: !movie.favorite };
      }
      return movie;
    });
    setMovies(updatedMovies);
  };

  const deleteMovie = (id) => {
    const updatedMovies = movies.filter((movie) => movie.id !== id);
    setMovies(updatedMovies);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.centerContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter a new movie"
          value={newMovie}
          onChangeText={(text) => setNewMovie(text)}
        />
        <Button title="Add" onPress={addMovie} />
      </View>
      <View style={styles.listsContainer}>
        <Lists movies={movies} toggleFavorite={toggleFavorite} deleteMovie={deleteMovie} />
        <FavList movies={movies} onToggleFavorite={toggleFavorite} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  input: {
    marginBottom: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    width: '80%', // Adjust the width as needed
  },
  listsContainer: {
    flex: 1,
    flexDirection: 'row',
  },
});

export default Movie;
