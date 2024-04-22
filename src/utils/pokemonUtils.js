/**
 * Extrai o ID de uma URL de Pokémon.
 * @param {string} url - URL.
 * @returns {string|null} O ID ou null se a URL for inválida.
 */
export function extrairIdPelaUrl(url) {
  const match = url.match(/\/(\d+)\/$/);
  return match ? match[1] : null;
}

/**
 * Extrai todas as URLs de sprites de um objeto de sprites.
 * @param {Object} sprites - Objeto contendo URLs de sprites do Pokémon.
 * @returns {string[]} Uma string contendo todas as URLs de sprites.
 */
export function extrairTodasSpriteUrl(sprites) {
  const imagemUrls = [];

  function extrairUrlsRecursivamente(obj) {
    for (const key in obj) {
      if (typeof obj[key] === 'string') {
        imagemUrls.push(obj[key]);
      } else if (typeof obj[key] === 'object' && obj[key] !== null) {
        extrairUrlsRecursivamente(obj[key]);
      }
    }
  }

  extrairUrlsRecursivamente(sprites);
  return imagemUrls;
}

/**
 * Remove os detalhes de evoluções de um objeto de cadeia de evolução.
 * @param {Object} chain - Objeto contendo a cadeia de evolução do Pokémon.
 * @returns {Object} O objeto de cadeia de evolução formatado.
 */
export function limparDetalhesDeEvolucoes(chain) {
  console.log('a', chain);
  // Removo o evolution_details do objeto chain
  delete chain.evolution_details;

  // Mapeio cada nível de evolução removendo o evolution_details recursivamente
  chain.evolves_to.forEach((evolution) => {
    delete evolution.evolution_details;

    if (evolution.evolves_to.length > 0) {
      limparDetalhesDeEvolucoes(evolution);
    }
  });

  // Mapeio novamente para extrair apenas os atributos necessários
  chain.evolves_to = chain.evolves_to.map((evolution) => ({
    evolves_to: evolution.evolves_to,
    is_baby: evolution.is_baby,
    name: evolution.species.name,
  }));

  return {
    evolves_to: chain.evolves_to,
    is_baby: chain.is_baby,
    name: chain.species.name,
  };
}

/**
 * Mapeia a evolução de um Pokémon.
 * @param {Object} chainFormatado - Objeto formatado contendo a cadeia de evolução do Pokémon.
 * @returns {Object} O objeto contendo a evolução mapeada do Pokémon.
 */
export function mapearEvolucaoPokemon(chainFormatado) {
  const evolution = {};
  let currentStage = chainFormatado.is_baby ? 1 : 2;

  function recursiveMap(chainFormatado) {
    if (chainFormatado.name) {
      evolution[`stage_${currentStage}`] =
        evolution[`stage_${currentStage}`] || [];
      evolution[`stage_${currentStage}`].push(chainFormatado.name);
    }

    if (chainFormatado.evolves_to && chainFormatado.evolves_to.length > 0) {
      currentStage++;
      chainFormatado.evolves_to.forEach(recursiveMap);
    }
  }

  recursiveMap(chainFormatado);

  // Stages vazios são nulls
  for (let i = 1; i <= 4; i++) {
    if (!evolution[`stage_${i}`]) {
      evolution[`stage_${i}`] = null;
    }
  }

  /**
   * stage_1 = baby
   * stage_2 = basic
   * stage_3 = stage_1
   * stage_4 = stage_2
   */
  console.log(chainFormatado);
  return evolution;
}
