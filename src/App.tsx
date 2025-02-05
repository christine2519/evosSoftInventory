import { createBrowserRouter,
redirect,
RouterProvider,
} from "react-router-dom";
import Liste from "./pages/liste/Liste";
import Inventaire from "./pages/inventaire/Inventaire";
import "./App.css";




// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

const router = createBrowserRouter([

  {
    path : "",
    loader: () => redirect("/liste"),
  },

  {
    path : "/liste",
    element : <Liste />
  },

  {
    path : "/inventaire",
    element : <Inventaire />
  },
])

function App() {
  return <RouterProvider router = {router} />;
}

export default App;
