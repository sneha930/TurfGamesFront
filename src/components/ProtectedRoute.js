import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRole }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) return <Navigate to="/signin" />;
  if (user.role !== allowedRole) return <Navigate to="/" />;

  return children;
};

export default ProtectedRoute;
