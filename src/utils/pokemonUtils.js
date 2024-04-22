export function extrairIdPelaUrl(url) {
  const match = url.match(/\/(\d+)\/$/);
  return match ? match[1] : null;
}

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

export function mapearEvolucaoPokemon(chain) {
  const evolution = {};
  let currentStage = chain.is_baby ? 1 : 2;

  function recursiveMap(chain) {
    if (chain.name) {
      evolution[`stage_${currentStage}`] =
        evolution[`stage_${currentStage}`] || [];
      evolution[`stage_${currentStage}`].push(chain.name);
    }

    if (chain.evolves_to && chain.evolves_to.length > 0) {
      currentStage++;
      chain.evolves_to.forEach(recursiveMap);
    }
  }

  recursiveMap(chain);

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
  console.log(chain);
  return evolution;
}
