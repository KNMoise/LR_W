import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Import styles for the navbar

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1>🎬 Movie Platform</h1>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/best-movies">Best Movies</Link></li>
        <li><Link to="/free">Free Movies</Link></li>
        <li><Link to="/genres">Genres</Link></li>
        <li><Link to="/languages">Languages</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
