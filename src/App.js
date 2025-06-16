import { Outlet, createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./components/Navbar";
import LandingPage from "./components/LandingPage";
import SignUpForm from "./components/SignUpForm";
import SignInForm from "./components/SignInForm";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminDashboard from "./components/pages/admin/AdminDashboard";
import PlayerDashboard from "./components/pages/player/PlayerDashboard";
import NotFound from "./components/NotFound";
import PlayerTable from "./components/pages/admin/PlayerTable";
import SlotTable from "./components/pages/admin/SlotTable";
import GameTable from "./components/pages/admin/GameTable";
import CreateSlotForm from "./components/pages/admin/CreateSlotForm";
import AddGameForm from "./components/pages/admin/AddGameForm";
import AddTurfForm from "./components/pages/admin/AddTurfForm";
import TurfTable from "./components/pages/admin/TurfTable";
import BookSlotForm from "./components/pages/admin/BookSlotForm";


// This acts as a layout wrapper.
// It displays the <Navbar /> on all pages.
// <Outlet /> is a placeholder for child components (like landing, sign in, etc.) based on the current route
const AppLayout = () => {

  return (
    <div className="app">
      <Navbar />
      <Outlet />
    </div>
  );

};


const appRouter = createBrowserRouter([
  {
    // This means: for every route inside this, use the AppLayout layout (Navbar + Outlet).
    path: "/",
    element: <AppLayout />,
    children: [
      // Public Routes: These are open to everyone.
      {
        index: true, 
        element: <LandingPage />
      },
      {
        path: "/signup",
        element: <SignUpForm />
      },
      {
        path: "/signin",
        element: <SignInForm />
      },

      // PLAYER DASHBOARD
      // Protected Route for Player Dashboard
      {
        path: "player/dashboard",
        element: 
        <ProtectedRoute allowedRole={"PLAYER"}>
          <PlayerDashboard />
        </ProtectedRoute>
      },

      // ADMIN DASHBOARD - Parent Route
      // Protected Admin Dashboard (with Nested Routes)
      {
        path: "admin/dashboard",
        element: (
        <ProtectedRoute allowedRole={["ADMIN", "PLAYERADMIN"]}>
          <AdminDashboard />
        </ProtectedRoute>
        ), 
        children : [
          { path: "players", element: <PlayerTable /> },
          { path: "games", element: <GameTable /> },
          { path: "slots", element: <SlotTable /> },
          { path: "create-slot", element: <CreateSlotForm /> },
          { path: "add-game", element: <AddGameForm />},
          { path: "turfs", element: <TurfTable />},
          { path: "add-turf", element: <AddTurfForm />},
          { path: "bookslot", element: <BookSlotForm />}
        ]
      },

      // Any route not matched above will show the NotFound page.
      { path: "*", element: <NotFound /> }
    ],

  },
]);

// RouterProvider is like the engine that runs your defined appRouter.
const App = () => {
  return <RouterProvider router={appRouter} />;
};

export default App;
