import { apiService } from './apiService';

export const obterPokemons = async () => {
  try {
    const response = await apiService.get('/pokemon');
    const { results } = response.data;

    const dadosAdicionaisPokemon = await Promise.all(
      results.map(async (pokemon) => {
        const { id, types, sprites } = await obterMaisInformacoes(pokemon.url);

        return {
          name: pokemon.name,
          id,
          types,
          imageUrl: sprites,
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

async function obterMaisInformacoes(url) {
  const response = await apiService.get(url);
  const { id, types, sprites } = response.data;

  return {
    id,
    types,
    sprites: sprites.other.home.front_default,
  };
}
