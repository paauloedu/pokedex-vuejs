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
      <div class="imagens-sprites">
        <v-img
          v-for="(sprite, spriteIndex) in pokemon.sprites"
          :key="spriteIndex"
          :src="sprite"
          class="pokemon-sprites"
        />
      </div>
      <p>{{ pokemon }}</p>
    </div>
  </div>
</template>

<script>
import { obterPokemonPorId } from '../services/pokemonsService';
import PokemonType from './PokemonType.vue';

export default {
  data() {
    return {
      pokemon: [],
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
    console.log(this.pokemon);
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
}
.imagens-sprites {
  display: flex;
  flex-direction: row;
  gap: 20px;
  width: 25%;
}
</style>
