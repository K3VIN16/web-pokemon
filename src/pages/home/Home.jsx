import React, { useContext } from "react";
import PokemonCard from "../../components/PokemonCard";
import PokemonModal from "../../components/PokemonModal/PokemonModal.jsx";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import { PokemonContext } from "../../context/context";

function Home() {
  const context = useContext(PokemonContext);

  // Manejar apertura del modal
  const handleOpenModal = (pokemon) => {
    context.setSelectedPokemon(pokemon);
    context.setIsModalOpen(true);
  };

  return (
    <div className="relative min-h-screen flex flex-col">
      <NavBar />
      <div className="container mx-auto px-4 py-8 flex-grow pb-20">
        <h1 className="text-3xl font-bold text-center mb-8">
          Lista de Pokémon
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {context.pokemon.length > 0 ? (
            context.pokemon.map((pokemon) => (
              <PokemonCard
                key={pokemon.id}
                name={pokemon.name}
                image={pokemon.sprites.other["official-artwork"].front_default}
                // image={pokemon.sprites.other.showdown.front_default} // 2D movimiento 4
                types={pokemon.types}
                className="px-3 py-1 bg-white bg-opacity-25 rounded-full text-sm capitalize"
                onClick={() => handleOpenModal(pokemon)} // Llamada al abrir modal
              />
            ))
          ) : (
            <div className="col-span-4 text-center">Cargando Pokémon...</div>
          )}
        </div>
      </div>

      {/* Modal para mostrar detalles */}
      <PokemonModal isOpen={context.isModalOpen} />

      {/* Footer fijo con botones de paginación */}
      <Footer />
    </div>
  );
}

export default Home;
