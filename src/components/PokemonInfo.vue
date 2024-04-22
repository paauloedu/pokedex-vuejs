<template>
  <div class="flex">
    <div class="pokemon-image">
      <v-img :src="pokemon.imageUrl" />
    </div>

    <div class="pokemon-infos">
      <!-- Nome, Tipo, Especie -->
      <h1 class="pokemon-name">
        <v-img v-if="pokemon.gif" class="pokemon-gif" :src="pokemon.gif" />
        {{ pokemon.name }}
        <span class="pokemon-id">N°{{ pokemon.id }} </span>
      </h1>
      <span class="pokemon-specie"
        ><v-icon size="small" icon="mdi-leaf" /> {{ pokemon.specie }}</span
      >
      <div class="pokemon-type">
        <PokemonType
          v-for="(type, typeIndex) in pokemon.types"
          :key="typeIndex"
          :type-name="type.type.name"
        />
      </div>
      <!-- Fim Nome, Tipo, Especie -->

      <!-- Evolução -->
      <h2>{{ $t('infos.evolution') }}</h2>
      <hr />
      <EvolutionChain :pokemon="pokemon" :image-urls="imageUrls" />
      <!-- Fim Evolucao -->

      <!-- Sprites -->
      <h2>{{ $t('infos.sprites') }}</h2>
      <hr />
      <SpritesGallery v-if="pokemon.sprites" :sprites="pokemon.sprites" />
      <!-- Fim Sprites -->

      <!-- Jogos Presente -->
      <h2>{{ $t('infos.games') }}</h2>
      <hr />
      <GamesTable
        v-if="pokemon.game_indices"
        :games-indices="pokemon.game_indices"
      />
      <!-- Fim Jogos Presente -->

      <!-- Movimentos de Ataque -->
      <h2>{{ $t('infos.moves') }}</h2>
      <hr />
      <MovesTable v-if="pokemon.movesData" :moves-data="pokemon.movesData" />
      <!-- Fim Movimentos de Ataque -->
    </div>
  </div>
</template>

<script>
import {
  obterPokemonPorId,
  obterUrlDaImagemDoPokemon,
} from '../services/pokemonsService';
import PokemonType from './PokemonType.vue';
import MovesTable from './MovesTable.vue';
import GamesTable from './GamesTable.vue';
import SpritesGallery from './SpritesGallery.vue';
import EvolutionChain from './EvolutionChain.vue';

export default {
  data() {
    return {
      pokemon: [],
      imageUrls: {
        stage_1: [],
        stage_2: [],
        stage_3: [],
        stage_4: [],
      },
    };
  },
  props: {
    pokemonId: {
      type: String,
      required: true,
    },
  },
  components: {
    PokemonType,
    MovesTable,
    GamesTable,
    SpritesGallery,
    EvolutionChain,
  },
  async created() {
    this.pokemon = await obterPokemonPorId(this.pokemonId);

    if (this.pokemon.evolution?.stage_1) {
      this.imageUrls.stage_1 = await Promise.all(
        this.pokemon.evolution.stage_1.map((name) =>
          obterUrlDaImagemDoPokemon(name)
        )
      );
    }
    if (this.pokemon.evolution?.stage_2) {
      this.imageUrls.stage_2 = await Promise.all(
        this.pokemon.evolution.stage_2.map((name) =>
          obterUrlDaImagemDoPokemon(name)
        )
      );
    }
    if (this.pokemon.evolution?.stage_3) {
      this.imageUrls.stage_3 = await Promise.all(
        this.pokemon.evolution.stage_3.map((name) =>
          obterUrlDaImagemDoPokemon(name)
        )
      );
    }
    if (this.pokemon.evolution?.stage_4) {
      this.imageUrls.stage_4 = await Promise.all(
        this.pokemon.evolution.stage_4.map((name) =>
          obterUrlDaImagemDoPokemon(name)
        )
      );
    }
  },
  methods: {
    async obterUrlDaImagem(name) {
      const imageUrl = await obterUrlDaImagemDoPokemon(name);
      return imageUrl;
    },
  },
};
</script>

<style scoped>
.flex {
  width: 100%;
  gap: 60px;
}
.pokemon-image,
.pokemon-infos {
  flex: 1;
  width: 50%;
}
.pokemon-infos {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.pokemon-name {
  color: var(--azul-escuro);
  text-transform: capitalize;
}
.pokemon-id {
  color: var(--cinza-escuro);
  font-size: 28px;
  font-weight: 100;
  font-style: italic;
}
.pokemon-specie {
  color: var(--cinza-escuro);
  font-size: 16px;
}
.pokemon-type {
  display: flex;
  flex-direction: row;
  gap: 5px;
  text-transform: capitalize;
}
.pokemon-gif {
  width: 50px;
  height: 50px;
  display: inline-block;
}

@media only screen and (min-width: 768px) and (max-width: 1023px) {
  .flex {
    flex-direction: column;
    align-items: center;
  }
  .pokemon-infos {
    width: 100%;
  }
}
@media only screen and (max-width: 767px) {
  .flex {
    flex-direction: column;
    align-items: center;
  }
  .pokemon-infos {
    width: 100%;
  }
  .pokemon-image {
    width: 70%;
  }
}
</style>
