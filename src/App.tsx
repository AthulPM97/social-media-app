import { useState } from "react";
import { useRoutes } from "react-router-dom";

// import "./App.css";

import Login from "./components/auth/Login";

type Route = {
  path: string;
  element: JSX.Element;
};

function App() {

  const routesArray: Route[] = [
    {
      path: "*",
      element: <Login />,
    },
    {
      path: "/login",
      element: <Login />,
    },
  ];

  let routesElement = useRoutes(routesArray);

  return (
    <>
      <div>{routesElement}</div>
    </>
  );
}

export default App;
