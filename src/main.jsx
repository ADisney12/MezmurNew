import * as React from "react";
import App from "./App.jsx";
import Login from "./login.jsx";
import SignUp from "./SignUp.jsx";
import Search from "./NewSearch.jsx";
import Home from "./home.jsx";
import Playlist from "./playlist.jsx";
import { GlobalProvider } from "./GlobalData.jsx";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

// Your Router Configuration
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/home/:id",
    element: <App />,
  },
  {
    path: "/:id/Playlist/:name",
    element: <Playlist />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/SignUp",
    element: <SignUp />,
  },
  {
    path: ":id/Search/:SearchQuery",
    element: <Search />,
  },
]);

const AppWrapper = () => {
  return (
    <GlobalProvider> {/* No need to pass value prop */}
      <RouterProvider router={router} />
    </GlobalProvider>
  );
};

createRoot(document.getElementById("root")).render(<AppWrapper />);
