import React, { useState, useEffect } from 'react';
import { Button, TextField, Grid, Typography, Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { fetchMovies, addMovie, updateMovie, deleteMovie } from '../services/api';
import Sidebar from '../components/Sidebar';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [movies, setMovies] = useState([]);
  const [movieData, setMovieData] = useState({
    title: '',
    genre: '',
    language: '',
    trailer: '',
    fullMovie: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [currentMovieId, setCurrentMovieId] = useState(null);

  useEffect(() => {
    loadMovies();
  }, []);

  const loadMovies = async () => {
    const data = await fetchMovies();
    setMovies(data);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovieData({ ...movieData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditing) {
      await updateMovie(currentMovieId, movieData);
      setIsEditing(false);
      setCurrentMovieId(null);
    } else {
      await addMovie(movieData);
    }
    setMovieData({
      title: '',
      genre: '',
      language: '',
      trailer: '',
      fullMovie: '',
    });
    loadMovies();
  };

  const handleEdit = (movie) => {
    setIsEditing(true);
    setCurrentMovieId(movie.id);
    setMovieData({
      title: movie.title,
      genre: movie.genre,
      language: movie.language,
      trailer: movie.trailer,
      fullMovie: movie.fullMovie,
    });
  };

  const handleDelete = async (id) => {
    await deleteMovie(id);
    loadMovies();
  };

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>
      
      {/* Movie Form */}
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Movie Title"
              name="title"
              value={movieData.title}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Genre"
              name="genre"
              value={movieData.genre}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Language"
              name="language"
              value={movieData.language}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Trailer Link"
              name="trailer"
              value={movieData.trailer}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Full Movie Link"
              name="fullMovie"
              value={movieData.fullMovie}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" type="submit" fullWidth>
              {isEditing ? 'Update Movie' : 'Add Movie'}
            </Button>
          </Grid>
        </Grid>
      </form>

      {/* Movie List */}
      <Typography variant="h5" gutterBottom style={{ marginTop: '40px' }}>
        Movie List
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Genre</TableCell>
              <TableCell>Language</TableCell>
              <TableCell>Trailer</TableCell>
              <TableCell>Full Movie</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {movies.map((movie) => (
              <TableRow key={movie.id}>
                <TableCell>{movie.title}</TableCell>
                <TableCell>{movie.genre}</TableCell>
                <TableCell>{movie.language}</TableCell>
                <TableCell>
                  <a href={movie.trailer} target="_blank" rel="noopener noreferrer">
                    Trailer
                  </a>
                </TableCell>
                <TableCell>
                  <a href={movie.fullMovie} target="_blank" rel="noopener noreferrer">
                    Watch
                  </a>
                </TableCell>
                <TableCell>
                  <Button variant="contained" color="primary" onClick={() => handleEdit(movie)} style={{ marginRight: '10px' }}>
                    Edit
                  </Button>
                  <Button variant="contained" color="secondary" onClick={() => handleDelete(movie.id)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
    </div>
  );
};

export default AdminDashboard;
