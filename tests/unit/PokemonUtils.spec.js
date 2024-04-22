import {
  extrairIdPelaUrl,
  extrairTodasSpriteUrl,
  mapearEvolucaoPokemon,
} from '@/utils/pokemonUtils';

describe('extrairIdPelaUrl', () => {
  it('deve extrair o ID da URL', () => {
    const url = 'https://pokeapi.co/api/v2/pokemon/25/';
    const id = extrairIdPelaUrl(url);
    expect(id).toBe('25');
  });

  it('deve retornar null para URL inválida', () => {
    const url = 'https://pokeapi.co/api/v2/pokemon/';
    const id = extrairIdPelaUrl(url);
    expect(id).toBe(null);
  });
});

describe('extrairTodasSpriteUrl', () => {
  it('deve extrair todas as URLs de sprites', () => {
    const sprites = {
      front_default: 'https://pokeapi.co/media/sprites/pokemon/25.png',
      front_shiny: 'https://pokeapi.co/media/sprites/pokemon/shiny/25.png',
    };
    const spriteUrls = extrairTodasSpriteUrl(sprites);
    expect(spriteUrls).toEqual([
      'https://pokeapi.co/media/sprites/pokemon/25.png',
      'https://pokeapi.co/media/sprites/pokemon/shiny/25.png',
    ]);
  });

  it('deve retornar uma lista vazia para sprites inválidos', () => {
    const sprites = {};
    const spriteUrls = extrairTodasSpriteUrl(sprites);
    expect(spriteUrls).toEqual([]);
  });
});

describe('mapearEvolucaoPokemon', () => {
  it('deve mapear a evolução de um Pokémon com várias evoluções por estágio', () => {
    const chain = {
      evolves_to: [
        {
          evolves_to: [],
          is_baby: false,
          name: 'vaporeon',
        },
        {
          evolves_to: [],
          is_baby: false,
          name: 'jolteon',
        },
        {
          evolves_to: [],
          is_baby: false,
          name: 'flareon',
        },
        {
          evolves_to: [],
          is_baby: false,
          name: 'espeon',
        },
        {
          evolves_to: [],
          is_baby: false,
          name: 'umbreon',
        },
        {
          evolves_to: [],
          is_baby: false,
          name: 'leafeon',
        },
        {
          evolves_to: [],
          is_baby: false,
          name: 'glaceon',
        },
        {
          evolves_to: [],
          is_baby: false,
          name: 'sylveon',
        },
      ],
      is_baby: false,
      name: 'eevee',
    };

    const evolutionMap = mapearEvolucaoPokemon(chain);

    expect(evolutionMap).toEqual({
      stage_1: null,
      stage_2: ['eevee'],
      stage_3: [
        'vaporeon',
        'jolteon',
        'flareon',
        'espeon',
        'umbreon',
        'leafeon',
        'glaceon',
        'sylveon',
      ],
      stage_4: null,
    });
  });

  it('deve retornar null para um Pokémon sem evolução em algum estágio', () => {
    const chain = {
      name: 'tauros',
      is_baby: false,
      evolves_to: [],
    };

    const evolutionMap = mapearEvolucaoPokemon(chain);

    expect(evolutionMap).toEqual({
      stage_1: null,
      stage_2: ['tauros'],
      stage_3: null,
      stage_4: null,
    });
  });

  it('deve mapear a evolução de um Pokémon bebê', () => {
    const chain = {
      evolves_to: [
        {
          evolves_to: [
            {
              evolves_to: [],
              is_baby: false,
              name: 'raichu',
            },
          ],
          is_baby: false,
          name: 'pikachu',
        },
      ],
      is_baby: true,
      name: 'pichu',
    };

    const evolutionMap = mapearEvolucaoPokemon(chain);

    expect(evolutionMap).toEqual({
      stage_1: ['pichu'],
      stage_2: ['pikachu'],
      stage_3: ['raichu'],
      stage_4: null,
    });
  });
});
