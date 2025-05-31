import Body from "./components/Body";
import Header from "./components/Header";
import ReactDOM from 'react-dom/client';
import { Outlet, createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/Login";
import Games from "./components/Games";
import Players from "./components/Players";
import GameSlotBooking from "./components/GameSlotBookingForm";

const AppLayout = () => {

  return (
    <div className="app">
      <Header />
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
        path: "/",
        element: <Body />,
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/players",
        element: < Players />
      },
      {
        path: "/games",
        element: < Games />
      },
      {
        path: "/gameSlotBookings",
        element: <GameSlotBooking />
      }
    ],

  },
]);

// ✅ Export a component named App
const App = () => {
  return <RouterProvider router={appRouter} />;
};

export default App;
