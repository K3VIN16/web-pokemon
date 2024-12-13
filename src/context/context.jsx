import { useState, createContext, useEffect } from "react";

export const PokemonContext = createContext();

export const PokemonProvider = ({ children }) => {
  // Estados para almacenar los datos de los Pokémon
  const [pokemon, setPokemon] = useState([]);
  const [pokemonInfo, setPokemonInfo] = useState({});
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [searchByTitle, setSearchByTitle] = useState(""); // Estado para la búsqueda por nombre
  const [offset, setOffset] = useState(0); // Estado para controlar la paginación
  const [isLastPage, setIsLastPage] = useState(false); // Estado para verificar si es la última página
  const [totalPokemon, setTotalPokemon] = useState(0); // Total de Pokémon disponibles
  const [selectedPokemon, setSelectedPokemon] = useState(null); // Pokémon seleccionado
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para abrir/cerrar modal
  const [evolutionChain, setEvolutionChain] = useState([]); // Nueva propiedad
  const [isImgLoading, setIsImgLoading] = useState(true); // Estado para manejar la carga de la imagen
  const [hasErrorImgLoading, setHasErrorImgLoading] = useState(false); // Estado para manejar el error si la imagen no carga

  // Función para consumir la API de Pokémon con paginación
  const fetchPokemon = async (offset = 0) => {
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=20`
      );
      const data = await response.json();

      // Establece el total de Pokémon disponibles
      setTotalPokemon(data.count);

      // Obtén los detalles completos de cada Pokémon
      const pokemonDetails = data.results.map(async (pokemon) => {
        const res = await fetch(pokemon.url);
        return res.json();
      });

      const detailedPokemons = await Promise.all(pokemonDetails);
      setPokemon(detailedPokemons); // Guardamos los detalles completos de los Pokémon

      // Verifica si llegamos a la última página
      if (offset + 20 >= data.count) {
        setIsLastPage(true);
      } else {
        setIsLastPage(false);
      }
    } catch (error) {
      console.error("Error al cargar los Pokémon:", error);
    }
  };

  // Nueva función para obtener la cadena de evolución
  const fetchEvolutionChain = async (pokemon) => {
    if (!pokemon || !pokemon.species.url) return [];

    try {
      const speciesResponse = await fetch(pokemon.species.url);
      const speciesData = await speciesResponse.json();

      const evolutionResponse = await fetch(speciesData.evolution_chain.url);
      const evolutionData = await evolutionResponse.json();

      const chain = [];
      let current = evolutionData.chain;

      while (current) {
        const id = extractIdFromUrl(current.species.url);
        chain.push({
          name: current.species.name,
          id,
          image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
          method:
            current.evolves_to[0]?.evolution_details[0]?.trigger.name ===
            "level-up"
              ? `Level ${
                  current.evolves_to[0]?.evolution_details[0]?.min_level || "?"
                }`
              : current.evolves_to[0]?.evolution_details[0]?.trigger.name ||
                null,
        });

        current = current.evolves_to[0] || null;
      }

      return chain;
    } catch (error) {
      console.error("Error fetching evolution chain:", error);
      return [];
    }
  };

  // Extrae el ID del Pokémon desde la URL
  const extractIdFromUrl = (url) => {
    const match = url.match(/\/pokemon-species\/(\d+)\//);
    return match ? parseInt(match[1], 10) : null;
  };

  const selectPokemon = async (pokemon) => {
    setSelectedPokemon(pokemon);
    const chain = await fetchEvolutionChain(pokemon); // Obtiene la cadena de evolución
    setEvolutionChain(chain);
  };

  // Efecto para cargar los Pokémon inicialmente
  useEffect(() => {
    fetchPokemon(offset); // Carga inicial
  }, [offset]); // Se vuelve a ejecutar cuando el offset cambia

  // Filtrar Pokémon por nombre
  useEffect(() => {
    if (searchByTitle) {
      const filtered = pokemon.filter((poke) =>
        poke.name.toLowerCase().includes(searchByTitle.toLowerCase())
      );
      setFilteredPokemons(filtered);
    } else {
      setFilteredPokemons(pokemon); // Si no hay búsqueda, mostramos todos los Pokémon
    }
  }, [searchByTitle, pokemon]);

  return (
    <PokemonContext.Provider
      value={{
        pokemon,
        setPokemon,
        pokemonInfo,
        setPokemonInfo,
        filteredPokemons,
        setFilteredPokemons,
        searchByTitle,
        setSearchByTitle,
        fetchPokemon, // Exponemos la función para paginación
        offset,
        setOffset, // Control de la paginación
        isLastPage,
        setIsLastPage,
        totalPokemon, // Total de Pokémon disponibles
        selectedPokemon,
        setSelectedPokemon: selectPokemon, // Usamos la nueva función
        isModalOpen,
        setIsModalOpen,
        evolutionChain, // Exponemos la cadena de evolución
        isImgLoading,
        setIsImgLoading,
        hasErrorImgLoading,
        setHasErrorImgLoading,
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
};
