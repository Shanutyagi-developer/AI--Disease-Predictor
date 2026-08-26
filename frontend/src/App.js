import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Diabetes from './pages/Diabetes';
import Liver from './pages/Liver';
import './App.css';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/"         element={<Home />} />
        <Route path="/diabetes" element={<Diabetes />} />
        <Route path="/liver"    element={<Liver />} />
      </Routes>
    </Router>
  ); 
}

export default App; 