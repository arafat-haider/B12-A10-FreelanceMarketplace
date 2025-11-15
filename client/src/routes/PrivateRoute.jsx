// Private Route component to protect routes that require authentication
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  // If user is authenticated, render the children
  if (user) {
    return children;
  }

  // If not authenticated, redirect to login page
  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRoute;
