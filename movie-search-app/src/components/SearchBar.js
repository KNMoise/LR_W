import React, { useState } from 'react';
import './SearchBar.css'; 


const genres = ['All', 'Action', 'Comedy', 'Drama', 'Horror', 'Romance'];
const languages = ['All', 'English', 'French', 'Spanish', 'German', 'Chinese'];

const SearchBar = ({ onSearch, selectedGenre, setSelectedGenre, selectedLanguage, setSelectedLanguage }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <form onSubmit={handleSubmit} className="search-bar">
      <input
        type="text"
        placeholder="Search movies..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      
      {/* Genre Filter */}
      <select value={selectedGenre} onChange={(e) => setSelectedGenre(e.target.value)}>
        {genres.map((genre) => (
          <option key={genre} value={genre === 'All' ? '' : genre}>
            {genre}
          </option>
        ))}
      </select>

      {/* Language Filter */}
      <select value={selectedLanguage} onChange={(e) => setSelectedLanguage(e.target.value)}>
        {languages.map((lang) => (
          <option key={lang} value={lang === 'All' ? '' : lang}>
            {lang}
          </option>
        ))}
      </select>

      <button type="submit">Search</button>
    </form>
  );
};

export default SearchBar;
