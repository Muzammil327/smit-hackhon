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

#### Setup React with Tailwind CSS
```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

updated tailwind.config.js
```bash
 content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
```

updated .css
```bash
@tailwind base;
@tailwind components;
@tailwind utilities;
```


#### Setup with SCSS
```bash
npm add -D sass
```


#### Setup with Firebase
```bash
npm install firebase
```

config/firebase-config.js
```bash
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import {getAuth} from 'firebase/auth'

const firebaseConfig = {
  apiKey: import.meta.env.REACT_APP_FIREBASE_APIKEYS,
  authDomain: import.meta.env.REACT_APP_FIREBASE_AUTHDOMAIN,
  projectId: import.meta.env.REACT_APP_FIREBASE_PROJECTID,
  storageBucket: import.meta.env.REACT_APP_FIREBASE_STORAGEBUCKET,
  messagingSenderId: import.meta.env.REACT_APP_FIREBASE_MESSAGINGSENDERID,
  appId: import.meta.env.REACT_APP_FIREBASE_APPID,
}

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export default db;


export const auth =  getAuth(app);
```

.env
```bash
REACT_APP_FIREBASE_APIKEYS = 
REACT_APP_FIREBASE_AUTHDOMAIN =
REACT_APP_FIREBASE_PROJECTID = 
REACT_APP_FIREBASE_STORAGEBUCKET = 
REACT_APP_FIREBASE_MESSAGINGSENDERID = 
REACT_APP_FIREBASE_APPID = 
```

