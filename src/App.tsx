import { createBrowserRouter,
redirect,
RouterProvider,
} from "react-router-dom";
import Liste from "./pages/liste/Liste";
import Accueil from "./pages/accueil/Accueil";




// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

const router = createBrowserRouter([

  {
    path : "",
    loader: () => redirect("/accueil"),
  },

  {
    path : "/accueil",
    element : <Accueil />
  },

  {
    path : "/liste",
    element : <Liste />
  },
])

function App() {
  return <RouterProvider router = {router} />;
}

export default App;
