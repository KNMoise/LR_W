// src/pages/Home.js
import React, { useState, useEffect } from 'react';
import { fetchMovies } from '../services/api';
import MovieCard from '../components/MovieCard';
import SearchBar from '../components/SearchBar';
import './Home.css'; // Import the CSS file for styling

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');

  useEffect(() => {
    fetchMovies().then(setMovies); 
  }, []);

  const handleSearch = (query) => {
    fetchMovies(query, selectedGenre, selectedLanguage).then(setMovies);
  };

  return (
    <div className="home">
      <SearchBar
        onSearch={handleSearch}
        selectedGenre={selectedGenre}
        setSelectedGenre={setSelectedGenre}
        selectedLanguage={selectedLanguage}
        setSelectedLanguage={setSelectedLanguage}
      />

      <div className="movie-grid">
        {movies.length ? (
          movies.map((movie) => <MovieCard key={movie.imdbID} movie={movie} />)
        ) : (
          <p>No movies found.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
