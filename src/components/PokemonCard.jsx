import React, { useState, useEffect } from "react";
import imagenNoDisponible from "../assets/img/pikachuTriste.png"; // Ruta de la imagen
import pokeballLoading from "../assets/img/pokeballLoading.png"; // Ruta de la imagen

// Mapeo de tipos a colores
const typeColors = {
  grass: "bg-green-300",
  fire: "bg-red-300",
  water: "bg-blue-300",
  electric: "bg-yellow-300",
  bug: "bg-green-400",
  normal: "bg-gray-400",
  poison: "bg-purple-300",
  ground: "bg-yellow-400",
  flying: "bg-blue-200",
  psychic: "bg-pink-300",
  rock: "bg-yellow-500",
  ice: "bg-blue-200",
  dragon: "bg-indigo-400",
  dark: "bg-gray-800 text-white",
  fairy: "bg-pink-400",
  fighting: "bg-red-400",
  ghost: "bg-purple-500",
  steel: "bg-gray-500",
};

function PokemonCard({ name, image, types, onClick }) {
  const [isLoading, setIsLoading] = useState(true); // Estado para manejar la carga de la imagen
  const [hasError, setHasError] = useState(false); // Estado para manejar el error si la imagen no carga
  const mainType = types[0]?.type.name;
  const bgColor = typeColors[mainType] || "bg-white";

  useEffect(() => {
    // Temporizador para mostrar la imagen de error después de 3 segundos si no carga
    const timer = setTimeout(() => {
      if (isLoading) setHasError(true); // Si carga después de 10 segundos, mostrar img alterna
    }, 10000);

    return () => clearTimeout(timer); // Limpiar el temporizador si el componente se desmonta
  }, [isLoading]);

  const handleImageLoad = () => setIsLoading(false);
  const handleImageError = () => setHasError(true); // Manejo del error si la imagen no existe o no carga

  return (
    <div
      onClick={onClick}
      className={`border ${bgColor} border-gray-300 rounded-lg p-4 m-4 text-center shadow-md hover:shadow-2xl hover:scale-105 transition-transform duration-300 cursor-pointer`}
    >
      <div className="h-48 flex items-center justify-center relative">
        {isLoading && !hasError && (
          <div className="absolute inset-0 flex items-center justify-center">
            <img
              src={pokeballLoading}
              alt="Loading"
              className="animate-spin h-20 opacity-60"
            />
          </div>
        )}

        {hasError ? (
          <div className="flex flex-col items-center justify-center h-full">
            <img
              src={imagenNoDisponible}
              alt="Imagen no disponible"
              className="h-24 mb-2"
            />
            <span className="text-sm text-gray-500">Imagen no disponible</span>
          </div>
        ) : (
          <img
            src={image}
            alt={name}
            className={`h-40 mx-auto transition-opacity duration-500 ${
              isLoading ? "opacity-0" : "opacity-100"
            }`}
            onLoad={handleImageLoad}
            onError={handleImageError} // Manejar el caso si la imagen no se carga correctamente
          />
        )}
      </div>
      <h3 className="text-lg font-bold text-white">{name.toUpperCase()}</h3>
      <p className="text-sm mt-2">
        {types.map((type, index) => (
          <span
            key={index}
            className="px-3 py-1 text-white bg-white bg-opacity-25 rounded-full text-sm capitalize"
          >
            {type.type.name}
          </span>
        ))}
      </p>
    </div>
  );
}

export default PokemonCard;
