import React, { useContext } from "react";
import { PokemonContext } from "../../context/context";

function AboutTab() {
  const context = useContext(PokemonContext);

  return (
    <div>
      <ul className="text-gray-600 space-y-2">
        <li>
          <span className="font-bold">Species:</span>{" "}
          {context.selectedPokemon.species.name}
        </li>
        <li>
          <span className="font-bold">Height:</span>{" "}
          {context.selectedPokemon.height} cm
        </li>
        <li>
          <span className="font-bold">Weight:</span>{" "}
          {context.selectedPokemon.weight} kg
        </li>
        <li>
          <span className="font-bold">Abilities:</span>{" "}
          {context.selectedPokemon.abilities
            .map((ability) => ability.ability.name)
            .join(", ")}
        </li>
      </ul>
    </div>
  );
}

export default AboutTab;
