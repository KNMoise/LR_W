import React, { useState } from 'react';
import '../styles/AdminDashboard.css';

const AdminDashboard = () => {
  const [movieData, setMovieData] = useState({
    title: '',
    genre: '',
    language: '',
    trailer: '',
    fullMovie: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovieData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Call API to save movie details to the database
    console.log('Movie added:', movieData);
  };

  return (
    <div className="dashboard">
      <h2>Add New Movie</h2>
      <form onSubmit={handleSubmit} className="movie-form">
        <input
          type="text"
          name="title"
          placeholder="Movie Title"
          value={movieData.title}
          onChange={handleChange}
        />
        <input
          type="text"
          name="genre"
          placeholder="Genre"
          value={movieData.genre}
          onChange={handleChange}
        />
        <input
          type="text"
          name="language"
          placeholder="Language"
          value={movieData.language}
          onChange={handleChange}
        />
        <input
          type="text"
          name="trailer"
          placeholder="Trailer Link"
          value={movieData.trailer}
          onChange={handleChange}
        />
        <input
          type="text"
          name="fullMovie"
          placeholder="Full Movie Link"
          value={movieData.fullMovie}
          onChange={handleChange}
        />
        <button type="submit">Add Movie</button>
      </form>
    </div>
  );
};

export default AdminDashboard;
