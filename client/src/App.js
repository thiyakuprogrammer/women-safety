import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import NeedHelp from './pages/NeedHelp';
import SOS from './pages/SOS';
import SafeRoute from './pages/SafeRoute';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/need-help" element={<NeedHelp />} />
            <Route path="/sos" element={<SOS />} />
            <Route path="/safe-route" element={<SafeRoute />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
