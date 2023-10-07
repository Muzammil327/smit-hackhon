# React + Vite + Firebase

#### Create React App

```bash
npm create vite@latest
```

#### And now install react-router-dom
```bash
npm i react-router-dom
```

#### Updated main.jsx

```bash
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./home/page";
import About from "./about";
import Contact from "./contact";
import Product from "./product/page";

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
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

```
