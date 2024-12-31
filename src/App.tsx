import { useRoutes } from "react-router-dom";

import { AuthProvider } from "./contexts/authContext";

import Login from "./components/auth/Login";
import Home from "./components/Home";
import Header from "./components/Header";
import Register from "./components/auth/Register";
import { FeedProvider } from "./contexts/feedContext";

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

  const routesElement = useRoutes(routesArray);

  return (
    <>
      <AuthProvider>
        <FeedProvider>
          <Header />
          <div className="w-full h-screen flex flex-col bg-gray-100">
            {routesElement}
          </div>
        </FeedProvider>
      </AuthProvider>
    </>
  );
}

export default App;
