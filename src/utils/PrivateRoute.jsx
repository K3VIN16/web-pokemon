import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { PokemonContext } from "../context/context";

const PrivateRoute = ({ children }) => {
  const context = useContext(PokemonContext);

  // Verifica si el token está presente en localStorage
  const token = localStorage.getItem("token");

  if (!token) {
    context.setIsAuthenticated(false); // Asegúrate de actualizar el contexto si no hay token
    return <Navigate to="/" />;
  }

  // Si está autenticado, renderiza los hijos
  return context.isAuthenticated ? children : <Navigate to="/" />;
};

export default PrivateRoute;
