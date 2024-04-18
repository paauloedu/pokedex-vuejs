<template>
  <div class="flex list">
    <div v-for="(pokemon, index) in pokemons" :key="index" class="card column">
      <v-img :src="pokemon.imageUrl" />
      <div class="flex">
        <span class="pokemon-id">N°{{ pokemon.id }}</span>
        <p class="pokemon-name">{{ pokemon.name }}</p>
        <span class="pokemon-specie"
          ><v-icon size="small" icon="mdi-leaf" /> {{ pokemon.specie }}</span
        >
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
      pagination: {
        limit: 20,
        offset: 0,
      },
    };
  },
  components: { PokemonType },
  async created() {
    await this.obterListaDePokemons();
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  unmounted() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    async obterListaDePokemons() {
      try {
        const { limit, offset } = this.pagination;
        this.pokemons = await obterPokemons({
          limit,
          offset,
        });
      } catch (error) {
        console.log(error);
      }
    },

    async obterMaisPokemons() {
      try {
        const { limit } = this.pagination;
        this.pagination.offset += limit;
        const novosPokemons = await obterPokemons({
          limit,
          offset: this.pagination.offset,
        });
        this.pokemons = this.pokemons.concat(novosPokemons);
      } catch (error) {
        console.error('Erro ao carregar mais Pokémon:', error);
      }
    },

    handleScroll() {
      if (this.chegouAoFinalDaPagina()) {
        this.obterMaisPokemons();
      }
    },

    chegouAoFinalDaPagina() {
      const alturaDaJanela = window.innerHeight;
      const scrollY = window.scrollY;
      const alturaTotal = document.documentElement.scrollHeight;
      const margemInferior = 100;
      return alturaDaJanela + scrollY >= alturaTotal - margemInferior;
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
.pokemon-specie {
  color: var(--cinza-escuro);
  font-size: 16px;
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
