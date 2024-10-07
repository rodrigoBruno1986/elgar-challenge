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
  username: string | null;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = sessionStorage.getItem('token');
    const storedRole = sessionStorage.getItem('role');
    const storedUsername = sessionStorage.getItem('username');

    if (storedToken && storedRole && storedUsername) {
      setToken(storedToken);
      setUserRole(storedRole);
      setUsername(storedUsername);
      setIsAuthenticated(true);
    }

    setLoading(false);
  }, []);

  const login = async (username: string, password: string) => {
    const storedUsers = sessionStorage.getItem('users');
    const users = storedUsers ? JSON.parse(storedUsers) : {};

    if (users[username] && users[username].password === password) {
      const role = users[username].role;
      const simulatedToken = `fake-token-for-${username}`;

      sessionStorage.setItem('token', simulatedToken);
      sessionStorage.setItem('role', role);
      sessionStorage.setItem('username', username);

      setIsAuthenticated(true);
      setToken(simulatedToken);
      setUserRole(role);
      setUsername(username);
    } else {
      throw new Error('Credenciales incorrectas');
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserRole(null);
    setToken(null);
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('role');
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        userRole,
        token,
        loading,
        login,
        logout,
        username,
      }}
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
