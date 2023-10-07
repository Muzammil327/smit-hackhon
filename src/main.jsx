import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./assets/styles/common.scss";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./home/page";
import About from "./about";
import Contact from "./contact";
import Product from "./product/page";
import Login from "./auth/login";
import Register from "./auth/register/page";
import Dashboard from "./auth/dashboard";
import AuthProvider from "./assets/context/UserContext";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "about",
    element: <About />,
  },
  {
    path: "contact",
    element: <Contact />,
  },
  {
    path: "product",
    element: <Product />,
  },
  {
    path: "auth/login",
    element: <Login />,
  },
  {
    path: "auth/register",
    element: <Register />,
  },
  {
    path: "auth/dashboard",
    element: <Dashboard />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
