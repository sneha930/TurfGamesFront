import { createContext, useContext, useEffect, useState } from "react";

// This creates a container to hold our data (user, login, logout) and make it available across the app.Think of it like a global memory box.
const AuthContext = createContext();

// This is a component that:
// Holds the data (user info).
// Provides functions (login/logout).
// Makes everything available to all children using the <AuthContext.Provider>.
// This means: "Wrap my whole app with this provider so all components inside it can use the AuthContext."
export const AuthProvider = ({ children }) => {

  // This creates a state variable called user. Initially it's null (no user is logged in).
  const [user, setUser] = useState(null);

  // This effect runs only once on mount ([] means "run once").
  // It checks:
  // "Hey, is there a saved user in localStorage?"
  // If yes, restore the user into state so the app still knows who is logged in even after a page refresh.
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // When a user logs in:
  // You save their data to localStorage → so it survives page reloads.
  // You call setUser() → so the app knows someone is logged in now.
  const login = (userData) => {
    console.log("Logged-in user data from auth:", userData);
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  // On logout:
  // You remove the saved user from localStorage.
  // You set user to null.
  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  // This is where we actually make the user data and functions available to any child component.
  // So now, any component inside <AuthProvider> can use:
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
