import React, { useContext } from "react";
import { PokemonContext } from "../../context/context";

function MovesTab() {
  const context = useContext(PokemonContext);
  const totalPokemon = 8;

  return (
    <div>
      <ul className="text-gray-600 space-y-0.5">
        {context.selectedPokemon.moves
          .slice(0, totalPokemon)
          .map((move, index) => (
            <li key={index}>
              <span className="font-bold capitalize">{move.move.name}</span>
            </li>
          ))}
      </ul>
      <p className="text-gray-400 text-sm">
        Primeros {totalPokemon} movimientos.
      </p>
    </div>
  );
}

export default MovesTab;
