import { Navigate, Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { useAuth } from "../AuthProvider";

export const ProtectedRoute = () => {
  const { isAuthenticated, userRol } = useAuth();
  if (isAuthenticated && userRol === "ADMIN") {
    return (
      <>
        <Navbar />
        <Outlet />
      </>
    );
  }
  return <Navigate to={"/"} />;
};
