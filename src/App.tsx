import { createBrowserRouter,
redirect,
RouterProvider,
} from "react-router-dom";
import Liste from "./pages/liste/Liste";
import Inventaire from "./pages/inventaire/Inventaire";
import "./App.css";



const router = createBrowserRouter([

  {
    path : "/",
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

  // {
  //   path: "*", 
  //   element: <NotFound />
  // },

])

function App() {
  return <RouterProvider router = {router} />;
}

export default App;
