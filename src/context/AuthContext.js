import React, { createContext, useState, useEffect, useCallback } from 'react';
import { authAPI } from '../api/auth';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const loadUserProfile = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const response = await authAPI.getProfile();
        if (response.data) {
          setUser(response.data);
          return true;
        }
      }
      return false;
    } catch (error) {
      console.error('Failed to load user', error);
      return false;
    }
  }, []);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const isAuthenticated = await loadUserProfile();
        if (!isAuthenticated) {
          logout();
        }
      } catch (error) {
        console.error('Auth check failed', error);
        logout();
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [loadUserProfile]);

  const register = async (userData) => {
    try {
      setLoading(true);
      const response = await authAPI.register(userData);
      if (response.data?.token) {
        localStorage.setItem('token', response.data.token);
        await loadUserProfile();
        navigate('/');
      }
      return response;
    } catch (error) {
      console.error('Registration failed', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    try {
      setLoading(true);
      const response = await authAPI.login(credentials);
      if (response.data?.token) {
        localStorage.setItem('token', response.data.token);
        await loadUserProfile();
        navigate(credentials.from || '/');
      }
      return response;
    } catch (error) {
      console.error('Login failed', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  }, [navigate]);

  useEffect(() => {
    const interval = setInterval(async () => {
      if (user) {
        const isAuthenticated = await loadUserProfile();
        if (!isAuthenticated) {
          logout();
        }
      }
    }, 300000);

    return () => clearInterval(interval);
  }, [user, loadUserProfile, logout]);

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      register, 
      login, 
      logout,
      isAuthenticated: !!user
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);