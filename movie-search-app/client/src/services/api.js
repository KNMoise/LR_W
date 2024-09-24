// client/src/services/api.js
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

// Fetch Movies
export const fetchMovies = async () => {
  try {
    const response = await axios.get(`${API_URL}/movies`);
    return response.data;
  } catch (error) {
    console.error('Error fetching movies:', error);
    return [];
  }
};

// Add Movie
export const addMovie = async (movieData) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(`${API_URL}/movies`, movieData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error adding movie:', error);
    throw error.response.data;
  }
};

// Update Movie
export const updateMovie = async (id, movieData) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.put(`${API_URL}/movies/${id}`, movieData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating movie:', error);
    throw error.response.data;
  }
};

// Delete Movie
export const deleteMovie = async (id) => {
  try {
    const token = localStorage.getItem('token');
    await axios.delete(`${API_URL}/movies/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    console.error('Error deleting movie:', error);
    throw error.response.data;
  }
};

// Login
export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, { email, password });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Signup
export const signup = async (username, email, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth/signup`, { username, email, password, role: 'admin' });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
