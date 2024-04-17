<template>
  <div class="flex list">
    <div v-for="(pokemon, index) in pokemons" :key="index" class="card column">
      <v-img :src="pokemon.imageUrl" />
      <div class="flex">
        <span class="pokemon-id">N°{{ pokemon.id }}</span>
        <p class="pokemon-name">{{ pokemon.name }}</p>
        <div class="pokemon-type">
          <pokemon-type
            v-for="(type, typeIndex) in pokemon.types"
            :key="typeIndex"
            :type-name="type.type.name"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { obterPokemons } from '../services/pokemonsService';
import PokemonType from './PokemonType.vue';

export default {
  data() {
    return {
      pokemons: [],
    };
  },
  components: { PokemonType },
  created() {
    setTimeout(() => {
      this.obterListaDePokemons();
    }, 2000);
  },
  methods: {
    async obterListaDePokemons() {
      try {
        this.pokemons = await obterPokemons();
        console.log(this.pokemons);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped>
.list {
  flex-direction: row;
  flex-wrap: wrap;
  gap: 25px;
}
.card {
  display: flex;
  background-color: var(--branco);
  padding: 30px;
  border-radius: 15px;
  gap: 5px;
  flex: 1 1 15%;
}
.card .flex {
  align-items: center;
  flex-direction: column;
  gap: 5px;
}
.pokemon-id {
  color: var(--cinza-escuro);
  font-size: 14px;
}
.pokemon-name {
  text-transform: capitalize;
  font-weight: bold;
  font-size: 20px;
  color: var(--azul-escuro);
}
.pokemon-type {
  display: flex;
  flex-direction: row;
  gap: 5px;
  text-transform: capitalize;
}
.column {
  flex-direction: column;
}
</style>
