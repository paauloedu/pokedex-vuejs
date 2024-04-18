import { apiService } from './apiService';

export const obterPokemons = async (params = {}) => {
  try {
    const response = await apiService.get('/pokemon', { params });
    const { results } = response.data;

    const dadosAdicionaisPokemon = await Promise.all(
      results.map(async (pokemon) => {
        const { id, types, imageUrl, specie } = await obterMaisInformacoes(
          pokemon.url
        );

        return {
          name: pokemon.name,
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

async function obterMaisInformacoes(url) {
  const response = await apiService.get(url);
  const { id, types, sprites } = response.data;
  const { specie } = await obterEspecie(url);

  return {
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
