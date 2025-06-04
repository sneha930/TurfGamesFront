import { Navigate } from "react-router-dom";
import { getCurrentUser } from "./utils/auth";

const ProtectedRoute = ({ children, allowedRole }) => {
  const user = getCurrentUser();

  if (!user) return <Navigate to="/signin" />;
  if (user.role !== allowedRole) return <Navigate to="/" />;

  return children;
};

export default ProtectedRoute;
