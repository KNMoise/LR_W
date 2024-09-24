import axios from 'axios';

const API_KEY = process.env.REACT_APP_OMDB_API_KEY;
const BASE_URL = 'http://www.omdbapi.com/';

export const fetchMovies = async (query = 'popular', genre = '', language = '') => {
  const genreFilter = genre ? `&genre=${genre}` : '';
  const languageFilter = language ? `&language=${language}` : '';
  
  try {
    const response = await axios.get(
      `${BASE_URL}?s=${query}&apikey=${API_KEY}${genreFilter}${languageFilter}`
    );
    return response.data.Search || [];
  } catch (error) {
    console.error('Error fetching movies:', error);
    return [];
  }
};
