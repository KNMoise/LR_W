// server/routes/movies.js
const express = require('express');
const { Movie } = require('../models');
const authenticate = require('../middleware/authenticate');
const router = express.Router();

// Get All Movies
router.get('/', async (req, res) => {
  try {
    const movies = await Movie.findAll();
    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch movies', details: error.message });
  }
});

// Add a New Movie (Protected)
router.post('/', authenticate('admin'), async (req, res) => {
  const { title, genre, language, trailer, fullMovie } = req.body;
  try {
    const movie = await Movie.create({ title, genre, language, trailer, fullMovie });
    res.status(201).json(movie);
  } catch (error) {
    res.status(400).json({ error: 'Failed to add movie', details: error.message });
  }
});

// Update a Movie (Protected)
router.put('/:id', authenticate('admin'), async (req, res) => {
  const { id } = req.params;
  const { title, genre, language, trailer, fullMovie } = req.body;
  try {
    const movie = await Movie.findByPk(id);
    if (!movie) {
      return res.status(404).json({ error: 'Movie not found' });
    }
    await movie.update({ title, genre, language, trailer, fullMovie });
    res.json(movie);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update movie', details: error.message });
  }
});

// Delete a Movie (Protected)
router.delete('/:id', authenticate('admin'), async (req, res) => {
  const { id } = req.params;
  try {
    const movie = await Movie.findByPk(id);
    if (!movie) {
      return res.status(404).json({ error: 'Movie not found' });
    }
    await movie.destroy();
    res.json({ message: 'Movie deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete movie', details: error.message });
  }
});

module.exports = router;
