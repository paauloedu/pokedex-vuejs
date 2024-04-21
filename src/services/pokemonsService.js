import { apiService } from './apiService';
import { extrairIdPelaUrl } from '../utils/pokemonUtils';
import { extrairTodasSpriteUrl } from '../utils/pokemonUtils';
import { limparDetalhesDeEvolucoes } from '../utils/pokemonUtils';
import { mapearEvolucaoPokemon } from '../utils/pokemonUtils';

export const obterPokemons = async (params = {}) => {
  try {
    const response = await apiService.get('/pokemon', { params });
    const { results } = response.data;

    const dadosAdicionaisPokemon = await Promise.all(
      results.map(async (pokemon) => {
        const pokemonId = extrairIdPelaUrl(pokemon.url);

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

  //TODO: utils
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
  const { name, id, types, sprites, species, game_indices } = response.data;
  const { specie } = await obterEspecie(`/pokemon/${pokemonId}`);

  const speciesId = extrairIdPelaUrl(species.url);

  const { chain } = await obterCadeiaDeEvolucao(speciesId);
  const chainFiltrado = limparDetalhesDeEvolucoes(chain);
  console.log(chainFiltrado);
  const evolution = mapearEvolucaoPokemon(chainFiltrado);
  console.log(evolution);

  const imagemUrls = extrairTodasSpriteUrl(sprites);
  console.log(imagemUrls);

  return {
    name,
    id,
    types,
    specie: specie,
    imageUrl: sprites.other.home.front_default,
    gif: sprites.other.showdown.front_default,
    sprites: imagemUrls,
    evolution: evolution,
    game_indices,
  };
};

async function obterCadeiaDeEvolucao(pokemonId) {
  try {
    const response = await apiService.get(`/pokemon-species/${pokemonId}`);
    const { url } = response.data.evolution_chain;

    // Extraindo o id da url
    const evolutionId = extrairIdPelaUrl(url);
    console.log(evolutionId);

    const responseEvolutionChain = await apiService.get(
      `/evolution-chain/${evolutionId}`
    );

    return responseEvolutionChain.data;
  } catch (error) {
    console.error('Não foi possível obter a cadeia de evolução:', error);
    throw error;
  }
}

export const obterUrlDaImagemDoPokemon = async (pokemonName) => {
  try {
    const response = await apiService.get(`/pokemon/${pokemonName}`);
    const { sprites } = response.data;
    if (sprites && sprites.other) {
      const imageUrl = sprites.other.home.front_default;
      return imageUrl;
    }
    return null;
  } catch (error) {
    console.error('Não foi possível obter a imagem:', error);
    throw error;
  }
};
