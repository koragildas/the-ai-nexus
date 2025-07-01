
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Loading } from '@/components/Loading';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'user' | 'admin' | 'superadmin';
  requireSuperAdmin?: boolean;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requiredRole,
  requireSuperAdmin 
}) => {
  const { isAuthenticated, user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loading text="Vérification de l'authentification..." />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check for super admin requirement
  if (requireSuperAdmin && user?.role !== 'superadmin') {
    return <Navigate to="/" replace />;
  }

  if (requiredRole) {
    const roleHierarchy = { user: 0, admin: 1, superadmin: 2 };
    const userLevel = roleHierarchy[user?.role || 'user'];
    const requiredLevel = roleHierarchy[requiredRole];

    if (userLevel < requiredLevel) {
      return <Navigate to="/" replace />;
    }
  }

  return <>{children}</>;
};
