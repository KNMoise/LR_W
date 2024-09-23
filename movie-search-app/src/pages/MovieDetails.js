import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovies } from '../services/api';

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    fetchMovies(id, 'movie').then((data) => setMovie(data[0]));
  }, [id]);

  if (!movie) {
    return <p>Loading...</p>;
  }

  return (
    <div className="movie-details">
      <img src={movie.Poster} alt={movie.Title} />
      <h1>{movie.Title}</h1>
      <p><strong>Genre:</strong> {movie.Genre}</p>
      <p><strong>Language:</strong> {movie.Language}</p>
      <p><strong>Plot:</strong> {movie.Plot}</p>
    </div>
  );
};

export default MovieDetails;
