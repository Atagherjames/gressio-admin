import { ReactNode } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/authStore';
import { AdminLayout } from './components/layout/AdminLayout';
import { Login } from './pages/Login';
import { Users } from './pages/Users';
import { Marketplace } from './pages/Marketplace';

interface RouteGuardProps {
  children: ReactNode;
}

// Protected Route Guard
const ProtectedRoute = ({ children }: RouteGuardProps) => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated || user?.role !== 'ADMIN') {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

// Public Route Guard (Redirects away from login if already logged in)
const PublicRoute = ({ children }: RouteGuardProps) => {
  const { isAuthenticated, user } = useAuthStore();

  if (isAuthenticated && user?.role === 'ADMIN') {
    return <Navigate to="/users" replace />;
  }

  return <>{children}</>;
};

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Login Route */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        {/* Protected Admin Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/users" replace />} />
          <Route path="dashboard" element={<Navigate to="/users" replace />} />
          <Route path="users" element={<Users />} />
          <Route path="marketplace" element={<Marketplace />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/users" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
