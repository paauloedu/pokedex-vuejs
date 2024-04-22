import { apiService } from './apiService';
import { extrairIdPelaUrl } from '../utils/pokemonUtils';
import { extrairTodasSpriteUrl } from '../utils/pokemonUtils';
import { limparDetalhesDeEvolucoes } from '../utils/pokemonUtils';
import { mapearEvolucaoPokemon } from '../utils/pokemonUtils';

/**
 * Obtém informações básicas de todos os Pokémons.
 * @param {Object} params - Parâmetros da solicitação.
 * @returns {Object[]} Uma matriz contendo as informações básicas de todos os Pokémons.
 * Cada objeto contém: name, id, types, specie e imageUrl.
 */
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

/**
 * Obtém informações básicas de um Pokémon por ID.
 * @param {number} pokemonId - O ID do Pokémon.
 * @returns {Object} As informações básicas do Pokémon.
 */
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

/**
 * Obtém a espécie de um Pokémon.
 * @param {string} pokemonUrl - A URL do Pokémon.
 * @returns {Object} O objeto contendo a espécie do Pokémon.
 */
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

/**
 * Obtém todos os tipos de Pokémon.
 * @returns {string[]} Uma matriz contendo todos os tipos de Pokémon.
 */
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

/**
 * Obtém informações detalhadas de um Pokémon por ID.
 * @param {number} pokemonId - O ID do Pokémon.
 * @returns {Object} As informações detalhadas do Pokémon.
 */
export const obterPokemonPorId = async (pokemonId) => {
  const response = await apiService.get(`/pokemon/${pokemonId}`);
  const { name, id, types, sprites, species, game_indices, moves } =
    response.data;
  const { specie } = await obterEspecie(`/pokemon/${pokemonId}`);

  const speciesId = extrairIdPelaUrl(species.url);

  const { chain } = await obterCadeiaDeEvolucao(speciesId);
  const chainFormatado = limparDetalhesDeEvolucoes(chain);
  const evolution = mapearEvolucaoPokemon(chainFormatado);

  const imagemUrls = extrairTodasSpriteUrl(sprites);

  //Extrair todas urls de movimentos
  const moveUrls = moves.map((move) => move.move.url);
  const movesData = await Promise.all(
    moveUrls.map((url) => obterMovimentosDoPokemon(url))
  );
  console.log(movesData);

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
    movesData,
  };
};

/**
 * Obtém a cadeia completa de evolução de um Pokémon.
 * @param {number} pokemonId - O ID do Pokémon.
 * @returns {Object} A cadeia completa de evolução do Pokémon.
 */
async function obterCadeiaDeEvolucao(pokemonId) {
  try {
    const response = await apiService.get(`/pokemon-species/${pokemonId}`);
    const { url } = response.data.evolution_chain;

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

/**
 * Obtém a URL da imagem de um Pokémon pelo nome.
 * @param {string} pokemonName - O nome do Pokémon.
 * @returns {string|null} A URL da imagem do Pokémon ou null se não houver imagem.
 */
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

/**
 * Obtém informações detalhadas de movimentos de um Pokémon.
 * @param {string} moveUrls - A URL do movimento do Pokémon.
 * @returns {Object} As informações detalhadas do movimento do Pokémon.
 */
async function obterMovimentosDoPokemon(moveUrls) {
  try {
    const response = await apiService.get(moveUrls);
    const { name, type, damage_class, power, accuracy, effect_entries } =
      response.data;

    const effectEn = effect_entries.find(
      (effect) => effect.language.name === 'en'
    );
    const shortEffect = effectEn ? effectEn.short_effect : null;

    console.log(shortEffect);
    return {
      name,
      type: type.name,
      damage_class: damage_class.name,
      power,
      accuracy,
      shortEffect,
    };
  } catch (error) {
    console.error('Não foi possível obter os movimentos do pokemon:', error);
    throw error;
  }
}
