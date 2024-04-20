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

      <h2>Sprites</h2>
      <hr />
      <div class="imagens-sprites">
        <v-img
          v-for="(sprite, spriteIndex) in pokemon.sprites"
          :key="spriteIndex"
          :src="sprite"
          class="pokemon-sprites"
        />
      </div>

      <h2>Evoluções</h2>
      <hr />
      <div class="pokemon-chain">
        <div>
          <h3>Baby</h3>
          <div class="flex-row" v-if="pokemon.evolution?.stage_1">
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
          <div v-else>--</div>
        </div>
        <div>
          <h3>Basic</h3>
          <div class="flex-row" v-if="pokemon.evolution?.stage_2">
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
          <div v-else>--</div>
        </div>
        <div>
          <h3>Stage 1</h3>
          <div class="flex-row" v-if="pokemon.evolution?.stage_3">
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
          <div v-else>--</div>
        </div>
        <div>
          <h3>Stage 2</h3>
          <div class="flex-row" v-if="pokemon.evolution?.stage_4">
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
          <div v-else>--</div>
        </div>
      </div>

      <h2>Movimentos de ataque</h2>
      <hr />
      <div class="pokemon-moves"></div>

      <h2>Game Índices</h2>
      <hr />
      <div class="pokemon-games"></div>
      <p>{{ pokemon.evolution }}</p>
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
  watch: {
    '$route.params.id': {
      immediate: true,
      handler(newId, oldId) {
        console.log(oldId);
        console.log(newId);
        this.$router.push({ path: '/pokemon/' + newId });
      },
    },
  },
};
</script>

<style scoped>
.flex {
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
}
.pokemon-sprites,
.images-evolution {
  height: 50px;
  width: 50px;
}
.pokemon-chain {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.flex-row {
  display: flex;
  flex-direction: row;
  gap: 35px;
  flex-wrap: wrap;
}
.evolution-name {
  text-transform: capitalize;
  display: block;
}
</style>
