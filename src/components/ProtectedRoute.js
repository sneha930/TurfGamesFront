import { Navigate } from "react-router-dom";
import { getCurrentUser } from "./utils/auth";

const ProtectedRoute = ({ children, allowedRole }) => {
  const user = getCurrentUser();

  if (!user) return <Navigate to="/signin" />;

  const roles = Array.isArray(allowedRole) ? allowedRole : [allowedRole];

  // Normalize role: remove "ROLE_" prefix
  const userRole = user.role?.replace("ROLE_", "");

  if (!roles.includes(userRole)) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
