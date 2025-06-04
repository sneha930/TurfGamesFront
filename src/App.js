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
import BookingTable from "./components/pages/admin/BookingTable";
import GameTable from "./components/pages/admin/GameTable";
import CreateSlotForm from "./components/pages/admin/CreateSlotForm";
import AddGameForm from "./components/pages/admin/AddGameForm";

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
    path: "/",
    element: <AppLayout />,
    children: [
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
      {
        path: "player/dashboard",
        element: 
        <ProtectedRoute allowedRole={"PLAYER"}>
          <PlayerDashboard />
        </ProtectedRoute>
      },

      // ADMIN DASHBOARD - Parent Route
      {
        path: "admin/dashboard",
        element: (
        <ProtectedRoute allowedRole={"ADMIN"}>
          <AdminDashboard />
        </ProtectedRoute>
        ), 
        children : [
          { path: "players", element: <PlayerTable /> },
          { path: "games", element: <GameTable /> },
          { path: "slots", element: <SlotTable /> },
          { path: "bookings", element: <BookingTable /> },
          { path: "create-slot", element: <CreateSlotForm /> },
          { path: "add-game", element: <AddGameForm />}
        ]
      },
      { path: "*", element: <NotFound /> }
    ],

  },
]);

// ✅ Export a component named App
const App = () => {
  return <RouterProvider router={appRouter} />;
};

export default App;
