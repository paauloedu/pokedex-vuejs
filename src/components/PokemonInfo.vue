<template>
  <div class="flex">
    <div class="pokemon-image">
      <v-img :src="pokemon.imageUrl" />
    </div>

    <div class="pokemon-infos">
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

      <h2>{{ $t('infos.evolution') }}</h2>
      <hr />
      <div class="pokemon-chain">
        <div v-if="pokemon.evolution?.stage_1">
          <h3>{{ $t('infos.baby') }}</h3>
          <div class="flex-row">
            <div v-for="(imageUrl, index) in imageUrls.stage_1" :key="index">
              <img class="images-evolution" :src="imageUrl" />
              <a
                :href="'/pokemon/' + pokemon.evolution.stage_1[index]"
                class="evolution-name"
              >
                {{ pokemon.evolution.stage_1[index] }}
              </a>
            </div>
          </div>
        </div>
        <div v-if="pokemon.evolution?.stage_2">
          <h3>{{ $t('infos.basic') }}</h3>
          <div class="flex-row">
            <div v-for="(imageUrl, index) in imageUrls.stage_2" :key="index">
              <img class="images-evolution" :src="imageUrl" />
              <a
                :href="'/pokemon/' + pokemon.evolution.stage_2[index]"
                class="evolution-name"
              >
                {{ pokemon.evolution.stage_2[index] }}
              </a>
            </div>
          </div>
        </div>
        <div v-if="pokemon.evolution?.stage_3">
          <h3>{{ $t('infos.stage_1') }}</h3>
          <div class="flex-row">
            <div v-for="(imageUrl, index) in imageUrls.stage_3" :key="index">
              <img class="images-evolution" :src="imageUrl" />
              <a
                :href="'/pokemon/' + pokemon.evolution.stage_3[index]"
                class="evolution-name"
              >
                {{ pokemon.evolution.stage_3[index] }}
              </a>
            </div>
          </div>
        </div>
        <div v-if="pokemon.evolution?.stage_4">
          <h3>{{ $t('infos.stage_2') }}</h3>
          <div class="flex-row">
            <div v-for="(imageUrl, index) in imageUrls.stage_4" :key="index">
              <img class="images-evolution" :src="imageUrl" />
              <a
                :href="'/pokemon/' + pokemon.evolution.stage_4[index]"
                class="evolution-name"
              >
                {{ pokemon.evolution.stage_4[index] }}
              </a>
            </div>
          </div>
        </div>
      </div>

      <h2>{{ $t('infos.sprites') }}</h2>
      <hr />
      <div class="imagens-sprites" v-if="pokemon.sprites?.length > 0">
        <v-img
          v-for="(sprite, spriteIndex) in pokemon.sprites"
          :key="spriteIndex"
          :src="sprite"
          class="pokemon-sprites"
        />
      </div>
      <div style="padding: 25px 0" v-else>
        <p>
          <strong>{{ $t('infos.no_sprites') }}</strong>
        </p>
      </div>

      <h2>{{ $t('infos.games') }}</h2>
      <hr />
      <div class="pokemon-games" v-if="pokemon.game_indices?.length > 0">
        <p>
          <strong>{{ $t('infos.game_info') }}</strong>
        </p>
        <v-table
          v-if="pokemon.game_indices"
          height="300px"
          fixed-header
          density="comfortable"
        >
          <thead>
            <tr>
              <th style="font-weight: bold">{{ $t('infos.game') }}</th>
              <th style="font-weight: bold">{{ $t('infos.position') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(gameIndex, index) in pokemon.game_indices" :key="index">
              <td style="text-transform: capitalize">
                Pokemon {{ gameIndex.version.name }} version
              </td>
              <td>{{ gameIndex.game_index }}</td>
            </tr>
          </tbody>
        </v-table>
      </div>
      <div style="padding: 25px 0" v-else>
        <p>
          <strong>
            {{ $t('infos.no_games') }}
          </strong>
        </p>
      </div>

      <h2>{{ $t('infos.moves') }}</h2>
      <hr />
      <div class="pokemon-moves"></div>
    </div>
  </div>
</template>

<script>
import {
  obterPokemonPorId,
  obterUrlDaImagemDoPokemon,
} from '../services/pokemonsService';
import PokemonType from './PokemonType.vue';

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
  components: { PokemonType },
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
.imagens-sprites {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 20px;
  max-height: 300px;
  overflow-y: auto;
}
.pokemon-sprites {
  width: 100%;
  height: 100px;
  object-fit: cover;
  margin-bottom: 5px;
}
.pokemon-sprites,
.images-evolution {
  height: 50px;
  width: 50px;
}
.pokemon-chain {
  display: flex;
  flex-direction: row;
  gap: 15%;
}
.flex-row {
  display: flex;
  flex-direction: row;
  gap: 35px;
  flex-wrap: wrap;
  text-align: center;
}
.evolution-name {
  text-transform: capitalize;
  display: block;
  font-weight: bold;
  color: var(--azul-claro);
}
.evolution-name:hover {
  color: var(--vermelho-claro);
}
.pokemon-games p {
  margin: 10px 0;
  text-align: justify;
}
.v-table {
  background: var(--cinza-claro);
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
@media only screen and (max-width: 479px) {
  .pokemon-chain {
    flex-direction: column;
    gap: 30px;
  }
  .pokemon-games p {
    margin: 20px 0;
  }
}
</style>
