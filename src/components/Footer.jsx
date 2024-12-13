import React, { useContext } from "react";
import { PokemonContext } from "../context/context";

function Footer() {
  const context = useContext(PokemonContext);

  const handleNextPage = async () => {
    const newOffset = context.offset + 20;
    context.setOffset(newOffset);
    await context.fetchPokemon(newOffset);
  };

  const handlePreviousPage = () => {
    const newOffset = Math.max(0, context.offset - 20);
    context.setOffset(newOffset);
    context.fetchPokemon(newOffset);
  };

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-300 shadow-md flex justify-between p-4">
      <button
        onClick={handlePreviousPage}
        disabled={context.offset === 0}
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:bg-gray-300"
      >
        Anterior
      </button>
      <button
        onClick={handleNextPage}
        disabled={context.isLastPage}
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:bg-gray-300"
      >
        Siguiente
      </button>
    </div>
  );
}

export default Footer;
