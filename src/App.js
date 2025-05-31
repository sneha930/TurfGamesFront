import { Outlet, createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./components/Navbar";
import LandingPage from "./components/LandingPage";
import SignUpForm from "./components/SignUpForm";
import SignInForm from "./components/SignInForm";

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
      }
    ],

  },
]);

// ✅ Export a component named App
const App = () => {
  return <RouterProvider router={appRouter} />;
};

export default App;
