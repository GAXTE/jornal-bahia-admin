import { Navigate, Outlet } from "react-router-dom";
import { useUserContext } from "../../providers/UserContext";

export const PublicRoutes = () => {
  const { user } = useUserContext();
  return !user ? <Outlet /> : <Navigate to="/dashboard" />;
};
