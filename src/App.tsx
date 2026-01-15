import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { Home } from './pages/Home';
import { Search } from './pages/Search';
import { Browse } from './pages/Browse';
import { DrugDetail } from './pages/DrugDetail';
import './index.css';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/drug/:drugId" element={<DrugDetail />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
