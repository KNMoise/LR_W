import React from 'react';
import { Link } from 'react-router-dom';
import './MovieCard.css'; // Import the CSS file for styling

const MovieCard = ({ movie }) => {
  return (
    <div className="movie-card">
      <Link to={`/movie/${movie.imdbID}`}>
        <img src={movie.Poster} alt={movie.Title} />
        <div className="movie-info">
          <h3>{movie.Title}</h3>
          <p>{movie.Year}</p>
        </div>
      </Link>
    </div>
  );
};

export default MovieCard;
