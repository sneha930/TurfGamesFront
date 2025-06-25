import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useEffect, useState } from "react";
import { getCurrentUser } from "../../utils/auth";

const DashboardLayout = () => {
  const[role, setRole] = useState("");

  useEffect(() => {
    const currentLoggedInUser = getCurrentUser();
    if(currentLoggedInUser) {
      console.log("current Role: ", currentLoggedInUser);
      setRole(currentLoggedInUser?.role)
    }
  },[])

  // If role is empty, null, or undefined, don’t render anything — just return nothing from the component."
  /*What is return null in React?
  It means: render nothing.
  React will not render any DOM from that component.
  It’s totally valid and commonly used to conditionally skip rendering.
  if(!role) return null;*/
  if (!role) return null;
  
  return (
    <div className="flex">
      <Sidebar role={role} />
      <div className="flex-1 p-6 bg-gray-100 min-h-screen">
        <Outlet /> 
      </div>
    </div>
  );
};

export default DashboardLayout;
