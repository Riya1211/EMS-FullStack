import { ReactElement } from "react";
import { Navigate, Outlet } from "react-router-dom";

interface Props {
  element: ReactElement;
  isAuthenticated: boolean;
  role?: string; // Role can be 'admin' or 'employee'
  requiredRole?: string; // Role required to access the route
}

const ProtectedRoute = ({ element, isAuthenticated, role, requiredRole }: Props) => {
  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    return <Navigate to="/" />;
  }

  if (requiredRole && role !== requiredRole) {
    // Redirect to the user's own dashboard if they try to access an unauthorized route
    return <Navigate to={role === "admin" ? "/admin/dashboard" : "/employee/dashboard"} />;
  }

  return element; // Render the provided element
};

export default ProtectedRoute;