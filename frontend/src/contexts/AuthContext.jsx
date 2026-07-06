import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { authAPI } from '../services/api';
import { connectSocket, disconnectSocket } from '../services/socket';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('ctms_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('ctms_token');
    if (token) {
      authAPI.me()
        .then(({ data }) => {
          setUser(data.data);
          localStorage.setItem('ctms_user', JSON.stringify(data.data));
          connectSocket();
        })
        .catch(() => {
          localStorage.removeItem('ctms_token');
          localStorage.removeItem('ctms_user');
          setUser(null);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = useCallback(async (email, password, role, remember = false) => {
    const { data } = await authAPI.login({ email, password, role, remember });
    localStorage.setItem('ctms_token', data.data.token);
    localStorage.setItem('ctms_user', JSON.stringify(data.data.user));
    setUser(data.data.user);
    connectSocket();
    return data.data.user;
  }, []);

  const logout = useCallback(async () => {
    try {
      await authAPI.logout();
    } catch { /* ignore */ }
    localStorage.removeItem('ctms_token');
    localStorage.removeItem('ctms_user');
    setUser(null);
    disconnectSocket();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, setUser, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
