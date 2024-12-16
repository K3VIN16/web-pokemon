import React, { useState, useEffect } from "react";
import pokeballLoading from "../assets/img/pokeballLoading.png"; // Ruta de la imagen
import imagenNoDisponible from "../assets/img/pikachuTriste.png"; // Ruta de la imagen

function PokemonImage({ src, alt, className = "" }) {
  const [isLoading, setIsLoading] = useState(true); // Estado para manejar la carga de la imagen
  const [hasError, setHasError] = useState(false); // Estado para manejar el error si la imagen no carga

  useEffect(() => {
    // Temporizador para mostrar la imagen de error después de 10 segundos si no carga
    const timer = setTimeout(() => {
      if (isLoading) setHasError(true);
    }, 10000);

    return () => clearTimeout(timer); // Limpiar el temporizador si el componente se desmonta
  }, [isLoading]);

  const handleImageLoad = () => setIsLoading(false);
  const handleImageError = () => setHasError(true); // Manejo del error si la imagen no carga

  return (
    <div className="relative">
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
        <img
          src={imagenNoDisponible}
          alt="Imagen no disponible"
          className={`transition-opacity duration-500 ${className}`}
        />
      ) : (
        <img
          src={src}
          alt={alt}
          className={`transition-opacity duration-500 ${
            isLoading ? "opacity-0" : "opacity-100"
          } ${className}`}
          onLoad={handleImageLoad}
          onError={handleImageError}
        />
      )}
    </div>
  );
}

export default PokemonImage;
