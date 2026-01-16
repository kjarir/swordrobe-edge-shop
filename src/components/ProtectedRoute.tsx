import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Layout from '@/components/layout/Layout';

interface ProtectedRouteProps {
  children: ReactNode;
}

// Admin email that is allowed to access the admin panel
const ADMIN_EMAIL = 'nidachaudhary730@gmail.com';

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <Layout>
        <div className="min-h-[80vh] flex items-center justify-center">
          <div className="text-center">
            <p className="body-lg text-muted-foreground">Loading...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Check if the logged-in user is the admin
  if (user.email?.toLowerCase() !== ADMIN_EMAIL.toLowerCase()) {
    return (
      <Layout>
        <div className="min-h-[80vh] flex items-center justify-center">
          <div className="text-center">
            <h2 className="heading-lg mb-4">Access Denied</h2>
            <p className="body-md text-muted-foreground">
              You do not have permission to access the admin panel.
            </p>
          </div>
        </div>
      </Layout>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;

