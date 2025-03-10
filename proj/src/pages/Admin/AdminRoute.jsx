import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const AdminRoute = () => {
  const { user } = useAuth();
  return user?.isAdmin ? <Outlet /> : <Navigate to="/" />;
};

export default AdminRoute;
