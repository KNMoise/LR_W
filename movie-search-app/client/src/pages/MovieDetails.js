import { useParams } from 'react-router-dom';
import '../styles/MovieDetails.css';

const MovieDetails = ({ movies }) => {
  const { id } = useParams();
  const movie = movies.find((m) => m.id === id);

  if (!movie) {
    return <p>Movie not found</p>;
  }

  return (
    <div className="movie-details">
      <h2>{movie.title}</h2>
      <p>{movie.genre} | {movie.language}</p>
      <div className="movie-links">
        <a href={movie.trailer} target="_blank" rel="noopener noreferrer">Watch Trailer</a>
        <a href={movie.fullMovie} target="_blank" rel="noopener noreferrer">Watch Full Movie</a>
      </div>
    </div>
  );
};

export default MovieDetails;
