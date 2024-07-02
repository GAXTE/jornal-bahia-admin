import { Navigate, Outlet } from "react-router-dom";
import { useUserContext } from "../../providers/UserContext";

export const PrivateRoutes = () => {
  const { user } = useUserContext();
  console.log(user);
  return user ? <Outlet /> : <Navigate to="/" />;
};
