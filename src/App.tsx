import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import UserPage from './pages/UserPage';
import AdminPage from './pages/AdminPage';
import UnauthorizedPage from './pages/UnauthorizedPage';
import RegisterPage from './pages/RegisterPage';
import ProtectedRoute from './components/ProtectedRoute';

const RequireAuth = () => {
  const { isAuthenticated, userRole, loading } = useAuth();

  if (loading) return <div>Cargando...</div>;

  if (!isAuthenticated) return <Navigate to='/login' />;

  if (userRole === 'admin') {
    return <Navigate to='/admin' />;
  } else if (userRole === 'user') {
    return <Navigate to='/user' />;
  }

  return <Navigate to='/login' />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path='/' element={<RequireAuth />} />

          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />

          <Route element={<ProtectedRoute roleRequired='user' />}>
            <Route path='/user' element={<UserPage />} />
          </Route>
          <Route element={<ProtectedRoute roleRequired='admin' />}>
            <Route path='/admin' element={<AdminPage />} />
          </Route>

          <Route path='/unauthorized' element={<UnauthorizedPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
