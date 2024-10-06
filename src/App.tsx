import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import UserPage from './pages/UserPage';
import AdminPage from './pages/AdminPage';
import UnauthorizedPage from './pages/UnauthorizedPage';
import RegisterPage from './pages/RegisterPage';
import ProtectedRoute from './components/ProtectedRoute';
import MainLayout from './pages/MainLayout'; // Importamos MainLayout

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Rutas públicas (sin MainLayout) */}
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />

          {/* Rutas protegidas */}
          <Route
            path='/user'
            element={
              <ProtectedRoute roleRequired='user'>
                <MainLayout>
                  <UserPage /> {/* Página del usuario */}
                </MainLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path='/admin'
            element={
              <ProtectedRoute roleRequired='admin'>
                <MainLayout>
                  <AdminPage /> {/* Página del admin */}
                </MainLayout>
              </ProtectedRoute>
            }
          />

          {/* Página de acceso denegado */}
          <Route path='/unauthorized' element={<UnauthorizedPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
