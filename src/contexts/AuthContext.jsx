import { createContext, useState, useEffect, useContext } from 'react';
import { loadFromStorage, saveToStorage, removeFromStorage } from '../utils/storage';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => loadFromStorage('auth_user', null));
  const [isAuthenticated, setIsAuthenticated] = useState(() => !!loadFromStorage('auth_user', null));
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated && user) {
      saveToStorage('auth_user', user);
    } else {
      removeFromStorage('auth_user');
    }
  }, [isAuthenticated, user]);

  const login = async ({ username, password }) => {
    setLoading(true);
    try {
      await new Promise(res => setTimeout(res, 500));
      if (!username || !password) {
        throw new Error('Credenciales inválidas');
      }
      const loggedUser = { username, name: username };
      setUser(loggedUser);
      setIsAuthenticated(true);
      return { ok: true };
    } catch (err) {
      setUser(null);
      setIsAuthenticated(false);
      return { ok: false, message: err.message || 'Error' };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    removeFromStorage('auth_user');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
