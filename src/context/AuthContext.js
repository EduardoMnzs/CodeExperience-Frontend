import React, { createContext, useState, useEffect, useCallback, useContext } from 'react';
import { authAPI } from '../api/auth';
import { useNavigate, useLocation } from 'react-router-dom';

export const AuthContext = createContext();

const publicPaths = ['/', '/login', '/register', '/forgot-password', '/reset-password'];

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();

    const logout = useCallback(() => {
        localStorage.removeItem('token');
        setUser(null);
        navigate('/login');
    }, [navigate]);

    const loadUserProfile = useCallback(async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            return null;
        }
        try {
            const response = await authAPI.getProfile();
            if (response.data) {
                setUser(response.data);
                return response.data;
            }
            return null;
        } catch (error) {
            console.error('Failed to load user profile', error);
            logout();
            return null;
        }
    }, [logout]);

    useEffect(() => {
        const checkAuth = async () => {
            const isPublicPath = publicPaths.some(path => location.pathname.startsWith(path));

            try {
                const authenticatedUser = await loadUserProfile();
                if (!authenticatedUser && !isPublicPath) {
                    navigate('/login');
                }
            } catch (error) {
                console.error('Auth check failed', error);
                if (!isPublicPath) {
                    navigate('/login');
                }
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, [location.pathname, loadUserProfile, navigate]);

    const register = async (userData) => {
        try {
            const response = await authAPI.register(userData);
            if (response.data?.token) {
                localStorage.setItem('token', response.data.token);
                await loadUserProfile();
                navigate('/codeexperience');
            }
            return response;
        } catch (error) {
            console.error('Registration failed', error);
            throw error;
        }
    };

    const login = async (credentials) => {
        try {
            const response = await authAPI.login(credentials);
            if (response.data?.token) {
                localStorage.setItem('token', response.data.token);

                const loggedInUser = await loadUserProfile();

                const redirectPath = loggedInUser?.role === 'Admin' ? '/dashboard' : '/codeexperience';
                navigate(redirectPath);
            }
            return response;
        } catch (error) {
            console.error('Login failed', error);
            throw error;
        }
    };

    return (
        <AuthContext.Provider value={{
            user,
            loading,
            register,
            login,
            logout,
            isAuthenticated: !!user
        }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);