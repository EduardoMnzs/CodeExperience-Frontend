import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Header';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Dashboard from './pages/Dashboard';
import CodeExperience from './pages/codeexperience';
import PrivateRoute from './components/PrivateRoute';
import ResetPassword from './pages/ResetPassword';
import ForgotPassword from './pages/ForgotPassword';
import About from './pages/About';
import GlobalStyle from './assets/style/global.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<><Layout /> <Home /></>} />
        <Route path="/about" element={<><Layout /> <About /></>} />
        <Route path="/contact" element={<><Layout /></>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/codeexperience"
          element={
            <PrivateRoute>
              <CodeExperience />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute requiredRole="Admin">
              <Dashboard />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;