import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/AuthStore";

type ProtectedRouteProps = {
  children: React.ReactNode;
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated } = useAuthStore((state) => state);

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }
  return children;
};

export default ProtectedRoute;
