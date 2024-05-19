import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Login from './components/Login';
import ProtectedRoute from './ProtectedRoute'; // Import your ProtectedRoute component

function App() {
  const isAuthenticated = true; // Replace with actual authentication logic

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          {/* other protected routes */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
