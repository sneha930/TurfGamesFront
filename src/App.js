import { Outlet, createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardLayout from "./components/pages/admin/DashboardLayout";
import NotFound from "./components/NotFound";
import PlayerTable from "./components/pages/admin/PlayerTable";
import SlotTable from "./components/pages/admin/SlotTable";
import GameTable from "./components/pages/admin/GameTable";
import CreateSlotForm from "./components/pages/admin/CreateSlotForm";
import AddGameForm from "./components/pages/admin/AddGameForm";
import AddTurfForm from "./components/pages/admin/AddTurfForm";
import TurfTable from "./components/pages/admin/TurfTable";
import BookSlotForm from "./components/pages/admin/BookSlotForm";
import React, { Suspense } from "react";
import { Spinner } from "./components/Spinner";

const SignUpForm = React.lazy(() => import("./components/SignUpForm"))
const LandingPage = React.lazy(() => import("./components/LandingPage"));
const SignInForm = React.lazy(() => import("./components/SignInForm"));


// This acts as a layout wrapper.
// It displays the <Navbar /> on all pages.
// <Outlet /> is a placeholder for child components (like landing, sign in, etc.) based on the current route
// Now, any lazy-loaded child component of AppLayout will load smoothly with a spinner. 
const AppLayout = () => {
  return (
    <div className="app">
      <Navbar />
      <Suspense fallback={<Spinner />}>
        <Outlet />
      </Suspense>
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
        element: (
          <Suspense fallback={<Spinner/>}>
            <LandingPage />
          </Suspense>
        )
      },
      {
        path: "/signup",
        element: (
          <Suspense fallback={<Spinner />}>
            <SignUpForm />
          </Suspense>
        )
      },
      {
        path: "/signin",
        element: (
          <Suspense fallback={<Spinner />}>
            <SignInForm />
          </Suspense>
        )
      },

      // PLAYER DASHBOARD
      // Protected Route for Player Dashboard
      {
        path: "player/dashboard",
        element: (
        <ProtectedRoute allowedRole={"PLAYER"}>
          <DashboardLayout />
        </ProtectedRoute>
        ),
        children  : [
          { path: "slots", element: <SlotTable /> },
          { path: "bookslot", element: <BookSlotForm />},
        ]
      },

      // ADMIN DASHBOARD - Parent Route
      // Protected Admin Dashboard (with Nested Routes)
      {
        path: "admin/dashboard",
        element: (
        <ProtectedRoute allowedRole={["ADMIN", "PLAYERADMIN"]}>
          <DashboardLayout />
        </ProtectedRoute>
        ), 
        children : [
          { index:true, element: <PlayerTable /> },
          { path: "players", element: <PlayerTable /> },
          { path: "games", element: <GameTable /> },
          { path: "slots", element: <SlotTable /> },
          { path: "create-slot", element: <CreateSlotForm /> },
          { path: "add-game", element: <AddGameForm />},
          { path: "turfs", element: <TurfTable />},
          { path: "add-turf", element: <AddTurfForm />},
          { path: "bookslot", element: <BookSlotForm />},
          { path: "*", element: <NotFound />}
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
