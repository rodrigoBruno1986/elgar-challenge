import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from 'react';

type AuthContextType = {
  isAuthenticated: boolean;
  userRole: string | null;
  token: string | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedRole = localStorage.getItem('role');

    if (storedToken && storedRole) {
      setToken(storedToken);
      setUserRole(storedRole);
      setIsAuthenticated(true);
    }

    setLoading(false);
  }, []);

  const login = async (username: string, password: string) => {
    const storedUsers = localStorage.getItem('users');
    const users = storedUsers ? JSON.parse(storedUsers) : {};

    if (users[username] && users[username].password === password) {
      const role = users[username].role;
      const simulatedToken = `fake-token-for-${username}`;

      localStorage.setItem('token', simulatedToken);
      localStorage.setItem('role', role);

      setIsAuthenticated(true);
      setToken(simulatedToken);
      setUserRole(role);
    } else {
      throw new Error('Credenciales incorrectas');
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserRole(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('role');
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, userRole, token, loading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};
