import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import MovieDetails from './pages/MovieDetails';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/best-movies" element={<Home category="best" />} />
        <Route path="/free" element={<Home category="free" />} />
        <Route path="/genres" element={<Home category="genre" />} />
        <Route path="/languages" element={<Home category="language" />} />
      </Routes>
    </Router>
  );
}

export default App;
