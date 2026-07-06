import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function ProtectedRoute({ children, roles }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-brand-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login/student" state={{ from: location }} replace />;
  }

  if (roles && !roles.includes(user.role)) {
    const redirect = { student: '/student', driver: '/driver', admin: '/admin' };
    return <Navigate to={redirect[user.role] || '/'} replace />;
  }

  return children;
}
