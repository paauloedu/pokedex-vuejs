import { apiService } from './apiService';

export const obterPokemons = async (params = {}) => {
  try {
    const response = await apiService.get('/pokemon', { params });
    const { results } = response.data;

    const dadosAdicionaisPokemon = await Promise.all(
      results.map(async (pokemon) => {
        // Extraindo o id da url
        const match = pokemon.url.match(/\/(\d+)\/$/);
        const pokemonId = match ? match[1] : null;

        const { name, id, types, imageUrl, specie } =
          await obterPokemonBasicoPorId(pokemonId);

        return {
          name,
          id,
          types,
          specie: specie,
          imageUrl: imageUrl,
        };
      })
    );
    console.log(dadosAdicionaisPokemon);
    return dadosAdicionaisPokemon;
  } catch (error) {
    console.error('Não foi possível obter os pokemons:', error);
    throw error;
  }
};

async function obterPokemonBasicoPorId(pokemonId) {
  const response = await apiService.get(`/pokemon/${pokemonId}`);
  const { name, id, types, sprites } = response.data;
  const { specie } = await obterEspecie(`/pokemon/${pokemonId}`);

  return {
    name,
    id,
    types,
    specie: specie,
    imageUrl: sprites.other.home.front_default,
  };
}

//TODO: Documentar se der tempo!
async function obterEspecie(pokemonUrl) {
  const response = await apiService.get(pokemonUrl);
  const { species } = response.data;

  const especieResponse = await apiService.get(species.url);
  const genusEn = especieResponse.data.genera.find(
    (genus) => genus.language.name === 'en'
  );
  const specie = genusEn ? genusEn.genus : null;

  return { specie };
}

export const obterTodosTiposDePokemon = async () => {
  try {
    const response = await apiService.get('/type');
    const { results } = response.data;

    const tiposDePokemon = results.map((tipo) => tipo.name);
    return tiposDePokemon;
  } catch (error) {
    console.error('Não foi possível obter os tipos:', error);
    throw error;
  }
};

export const obterPokemonPorId = async (pokemonId) => {
  const response = await apiService.get(`/pokemon/${pokemonId}`);
  const { name, id, types, sprites } = response.data;
  const { specie } = await obterEspecie(`/pokemon/${pokemonId}`);

  return {
    name,
    id,
    types,
    specie: specie,
    imageUrl: sprites.other.home.front_default,
    gif: sprites.other.showdown.front_default,
    sprites: [sprites.front_default, sprites.front_shiny],
  };
};
