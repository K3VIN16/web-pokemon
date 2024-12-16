import React, { useContext, useState, useEffect, useCallback } from "react";
import { PokemonContext } from "../../context/context";
import AboutTab from "./AboutTab";
import BaseStatsTab from "./BaseStatsTab";
import EvolutionTab from "./EvolutionTab";
import MovesTab from "./MovesTab";
import pokeballLoading from "../../assets/img/pokeballLoading.png"; // Ruta de la imagen
import imagenNoDisponible from "../../assets/img/pikachuTriste.png"; // Ruta de la imagen

function PokemonModal({ isOpen }) {
  const context = useContext(PokemonContext);
  const [activeTab, setActiveTab] = useState("");
  const [imageSrc, setImageSrc] = useState(pokeballLoading); // Imagen inicial de carga
  const [isImageLoading, setIsImageLoading] = useState(true); // Estado para saber si la imagen está cargando

  const mainType = context.selectedPokemon?.types[0]?.type.name || "normal";

  const bgColors = {
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

  useEffect(() => {
    if (isOpen) {
      setActiveTab("evolution");
      setImageSrc(pokeballLoading); // Restablece la imagen al abrir el modal
      setIsImageLoading(true);

      const imageTimeout = setTimeout(() => {
        if (isImageLoading) {
          setImageSrc(imagenNoDisponible); // Muestra imagen de "no disponible" después de 10 segundos
          setIsImageLoading(false);
        }
      }, 10000);

      const img = new Image();
      img.src =
        context.selectedPokemon.sprites.other["official-artwork"].front_default;
      img.onload = () => {
        clearTimeout(imageTimeout); // Cancela el temporizador si la imagen se carga a tiempo
        setImageSrc(img.src); // Actualiza la fuente de la imagen con la imagen cargada
        setIsImageLoading(false);
      };
      img.onerror = () => {
        clearTimeout(imageTimeout); // Cancela el temporizador si ocurre un error de carga
        setImageSrc(imagenNoDisponible); // Actualiza con la imagen de "no disponible"
        setIsImageLoading(false);
      };

      return () => clearTimeout(imageTimeout); // Limpia el temporizador al desmontar el componente
    }
  }, [isOpen, context.selectedPokemon]);

  const handleCloseModal = useCallback(() => {
    context.setSelectedPokemon(null);
    context.setIsModalOpen(false);
  }, [context]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") handleCloseModal();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleCloseModal]);

  if (!isOpen) return null;

  const renderContent = () => {
    switch (activeTab) {
      case "about":
        return <AboutTab />;
      case "base-stats":
        return <BaseStatsTab />;
      case "evolution":
        return <EvolutionTab evolutionChain={context.evolutionChain} />;
      case "moves":
        return <MovesTab />;
      default:
        return null;
    }
  };

  const bgColor = bgColors[mainType] || "bg-green-500";

  return (
    <section className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        className={`rounded-xl shadow-lg overflow-hidden sm:w-11/12 md:w-10/12 lg:w-10/12 max-w-4xl mx-auto ${bgColor} relative`}
      >
        {/* Encabezado */}
        <div className="p-5 sm:p-8 pb-14 sm:pb-20 text-white relative">
          <button
            onClick={handleCloseModal}
            className="absolute top-3 sm:top-4 right-3 sm:right-5 text-white hover:text-gray-200 text-lg sm:text-2xl"
          >
            ✕
          </button>
          <div className="flex items-center justify-between gap-4">
            <div className="text-left">
              <h1 className="text-2xl sm:text-4xl font-bold capitalize">
                {context.selectedPokemon.name}
              </h1>
              <div className="mt-2 flex flex-wrap gap-2">
                {context.selectedPokemon.types.map((type, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 sm:px-3 sm:py-1 bg-white bg-opacity-25 rounded-full text-xs sm:text-sm capitalize"
                  >
                    {type.type.name}
                  </span>
                ))}
              </div>
            </div>
            <span className="text-lg sm:text-2xl font-bold">
              #{context.selectedPokemon.id.toString().padStart(4, "0")}
            </span>
          </div>

          <div className="absolute top-12 sm:top-14 md:top-5 left-1/2 transform -translate-x-1/2 z-10">
            <img
              src={imageSrc} // Utiliza el estado local para mostrar la imagen
              alt={context.selectedPokemon.name}
              className="h-28 sm:h-40 md:h-52 object-contain"
            />
          </div>
        </div>

        <div className="p-7 pt-14 bg-white rounded-tl-3xl rounded-tr-3xl">
          <div className="border-b border-gray-200 mb-4">
            <nav className="-mb-px flex space-x-6">
              {["about", "base-stats", "evolution", "moves"].map((tab) => (
                <span
                  key={tab}
                  className={`cursor-pointer ${
                    activeTab === tab
                      ? "text-gray-600 font-bold border-b-2 border-green-500 pb-2"
                      : "text-gray-400 hover:text-gray-600"
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab
                    .split("-")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ")}
                </span>
              ))}
            </nav>
          </div>
          <div className="h-64 overflow-y-auto">{renderContent()}</div>
        </div>
      </div>
    </section>
  );
}

export default PokemonModal;
