import { Navigate } from "react-router-dom";
// You're importing a utility function that gets the logged-in user's info (probably from localStorage).
import { getCurrentUser } from "./utils/auth";

// children → This is the component you want to show if the user is allowed.
// allowedRole → This tells which role is allowed.
// Example: "ADMIN" or "PLAYER".
const ProtectedRoute = ({ children, allowedRole }) => {
  const user = getCurrentUser()

  // Navigate is a component that redirects the user to another route.
  if (!user) return <Navigate to="/signin" />;
  
  const roles = Array.isArray(allowedRole) ? allowedRole : [allowedRole];

  if (!roles.includes(user.role)) {
    return <Navigate to="/" />;
  }

  // If allowedRole = "ADMIN" and the user is PLAYER, they'll be denied access and sent back to /.
  return children;
};

export default ProtectedRoute;
