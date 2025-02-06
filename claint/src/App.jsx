import React, { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/home";
import Sell from "./components/sell";
import Profile from "./components/profile";
import Navbar from "./components/navbar.jsx";
import Foot_nav from "./components/foot_nav";
import Create_ac from "./components/Create_ac.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Navbar /> <Home />
        <Foot_nav />
      </>
    ),
  },
  {
    path: "/sell",
    element: (
      <>
        <Navbar />
        <Sell />
        <Foot_nav />
      </>
    ),
  },
  {
    path: "/profile",
    element: (
      <>
        <Navbar />
        <Profile />
        <Foot_nav />
      </>
    ),
  },
]);

function App() {
  const [bolean_visit, setbolean_visit] = useState();
  

  useEffect(() => {
    if (localStorage.getItem("visited") == "visited") {
      setbolean_visit(true);
      
    } else {
      setbolean_visit(false);
      
    }
  }, []);

  
  return (
    <>{!bolean_visit ? <Create_ac /> : <RouterProvider router={router} />}</>
  );
}
export default App;
