import React from "react";

function EvolutionTab({ evolutionChain }) {
  return (
    <div className="flex flex-col sm:flex-row  justify-center items-center gap-4 py-7">
      {evolutionChain.map((evolution, index) => (
        <React.Fragment key={index}>
          {/* Datos del Pokémon */}
          <div className="flex flex-col items-center bg-white shadow-lg rounded-xl w-56 sm:w-32  md:w-32 lg:w-44">
            <img
              src={evolution.image}
              alt={evolution.name}
              className="h-32 sm:h-28 lg:h-36 object-contain"
            />
            <span className="font-bold capitalize text-gray-700 mt-2">
              {evolution.name}
            </span>
            <span className="text-sm text-gray-500">
              #{evolution.id.toString().padStart(4, "0")}
            </span>
          </div>

          {/* Método de Evolución */}
          {index < evolutionChain.length - 1 && (
            <div className="flex flex-col items-center text-center">
              {/* Método y flecha en vertical (móviles) */}
              <div className="flex flex-col items-center sm:hidden">
                <span className="text-sm text-gray-500">
                  {evolution.method}
                </span>
                <svg
                  className="h-6 w-6 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 9l7 7 7-7"
                  ></path>
                </svg>
              </div>

              {/* Método y flecha en horizontal (pantallas grandes) */}
              <div className="hidden sm:flex flex-col items-center">
                <span className="text-sm text-gray-500">
                  {evolution.method}
                </span>
                <svg
                  className="h-6 w-6 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  ></path>
                </svg>
              </div>
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

export default EvolutionTab;
