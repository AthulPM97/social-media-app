import { useRoutes } from "react-router-dom";

import { AuthProvider } from "./contexts/authContext";

import Login from "./components/auth/Login";
import Home from "./components/Home";
import Header from "./components/Header";
import Register from "./components/auth/Register";

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
    { path: "/register", element: <Register /> },
    {
      path: "/home",
      element: <Home />,
    },
  ];

  let routesElement = useRoutes(routesArray);

  return (
    <>
      <AuthProvider>
        <Header />
        <div className="w-full h-screen flex flex-col">{routesElement}</div>
      </AuthProvider>
    </>
  );
}

export default App;
