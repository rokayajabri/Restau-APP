import { createContext, useContext, useState } from 'react';
import { api } from '../config/axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    try {
      const response = await api.post('/api/login', { email, password });
      if (response.data.access_token) {
        setUser(response.data);  // Stocker les données de l'utilisateur
      }
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await api.post('/api/logout');
    } finally {
      setUser(null);  // Supprimer l'utilisateur du contexte
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};