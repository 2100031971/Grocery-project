import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth"; // ✅ Adjust path if needed

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user || !user.isAdmin) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
