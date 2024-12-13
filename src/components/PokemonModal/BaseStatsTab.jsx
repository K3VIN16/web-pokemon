import React, { useContext } from "react";
import { PokemonContext } from "../../context/context";

function BaseStatsTab() {
  const context = useContext(PokemonContext);

  const stats = context.selectedPokemon.stats;
  const totalStats = stats.reduce((acc, stat) => acc + stat.base_stat, 0);

  const getBarColor = (value) => {
    if (value < 50) return "bg-red-400";
    if (value < 80) return "bg-yellow-400";
    return "bg-green-400";
  };

  return (
    <div>
      <div className="space-y-3">
        {stats.map((stat, index) => (
          <div key={index} className="flex items-center">
            <span className="w-32 font-semibold capitalize text-gray-600">
              {/* Nombre del stat */}
              {stat.stat.name.replace("-", " ")}
            </span>
            <span className="w-12 text-center text-gray-800">
              {/* Valor del stat */}
              {stat.base_stat}
            </span>
            <div className="flex-1 bg-gray-200 rounded-full h-2 mx-2 relative">
              {/* Barra del stat */}
              <div
                className={`h-2 rounded-full ${getBarColor(stat.base_stat)}`}
                style={{ width: `${(stat.base_stat / 200) * 100}%` }} // Asumiendo 200 como max base stat
              ></div>
            </div>
          </div>
        ))}
        <div className="flex items-center mt-4">
          <span className="w-32 font-semibold text-gray-600">Total</span>
          <span className="w-12 text-center text-gray-800">{totalStats}</span>
          <div className="flex-1 bg-gray-200 rounded-full h-2 mx-2 relative">
            <div
              className="h-2 rounded-full bg-green-400"
              style={{ width: `${(totalStats / 800) * 100}%` }} // Asumiendo 800 como max total stat
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BaseStatsTab;
