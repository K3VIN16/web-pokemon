import { useRoutes, BrowserRouter } from "react-router-dom";
import Login from "../login/login";
import Home from "../home/home";
import NotFound from "../notFound/NotFound";
import { PokemonProvider } from "../../context/context";
import PrivateRoute from "../../utils/PrivateRoute.jsx";
import "./App.css";

const AppRoutes = () => {
  let routes = useRoutes([
    { path: "/", element: <Login /> },
    {
      path: "/home",
      element: (
        <PrivateRoute>
          <Home />
        </PrivateRoute>
      ),
    },
    { path: "*", element: <NotFound /> },
  ]);

  return routes;
};

function App() {
  return (
    <PokemonProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </PokemonProvider>
  );
}

export default App;
