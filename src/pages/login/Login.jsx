import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { PokemonContext } from "../../context/context";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { setIsAuthenticated } = useContext(PokemonContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setError("Por favor, completa todos los campos.");
      return;
    }

    try {
      // Realiza la solicitud al backend
      const response = await fetch(
        "http://localhost:8080/sasf-ticket/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        }
      );

      // Verifica si la respuesta es exitosa
      if (!response.ok) {
        setError("Usuario o contraseña incorrecta.");
        return;
      }

      // Extrae el token del encabezado de la respuesta
      const token = response.headers.get("Authorization");

      console.log(token);
      if (!token) {
        setError("No se pudo obtener el token de autenticación.");
        return;
      }

      // // Guarda el token en localStorage
      localStorage.setItem("token", token);

      // Actualiza el contexto de autenticación
      setIsAuthenticated(true);

      // Redirige al usuario
      navigate("/home");
    } catch (error) {
      console.error("Error durante el inicio de sesión:", error);
      setError("Ocurrió un error al intentar iniciar sesión.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Iniciar Sesión</h2>
        {error && (
          <div className="text-red-500 text-sm mb-4 text-center">{error}</div>
        )}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Nombre de usuario
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ingresa tu nombre de usuario"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ingresa tu contraseña"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
