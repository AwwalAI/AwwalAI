import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import Dashboard from './pages/Dashboard';
import QuizPage from './pages/QuizPage';
import QuizResult from './pages/QuizResult';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';

const App = () => {
  const location = useLocation(); // get the current route

  // Determine whether to show the Navbar
  const showNavbar = location.pathname !== '/login' && location.pathname !== '/signup';

  return (
    <div className="min-h-screen flex flex-col">
      {showNavbar && <Navbar />} {/* Conditionally render Navbar */}

      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<LandingPage />} /> {/*Landing Page */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Private routes */}
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/quiz/:id" element={<PrivateRoute><QuizPage /></PrivateRoute>} />
          <Route path="/quiz/:id/result" element={<PrivateRoute><QuizResult /></PrivateRoute>} />

          {/* Redirect any unknown paths to the login page */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    </div>
  );
};

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;

