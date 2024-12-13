import { useRoutes, BrowserRouter } from "react-router-dom";
import Home from "../home/home";
import NotFound from "../notFound/NotFound";
import { PokemonProvider } from "../../context/context";
import "./App.css";

const AppRourtes = () => {
  // Aquí van las rutas de las diferentes paginas de la app
  let routes = useRoutes([
    { path: "/", element: <Home /> },
    { path: "/detail", element: <Home /> },
    { path: "*", element: <NotFound /> },
  ]);

  return routes;
};
function App() {
  return (
    <PokemonProvider>
      <BrowserRouter>
        <AppRourtes />
      </BrowserRouter>
    </PokemonProvider>
  );
}

export default App;
