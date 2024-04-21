<template>
  <!-- FIXME: Fazer o caso para busca vazia -->
  <div class="not-content" v-if="this.localPokemonsFiltrados.length === 0">
    <div class="content">
      <h3>Não há pokemons que atendam a esse filtro.</h3>
    </div>
  </div>
  <div class="flex list" v-else>
    <router-link
      :to="'/pokemon/' + pokemon.id"
      v-for="(pokemon, index) in localPokemonsFiltrados"
      :key="index"
      class="card column"
    >
      <v-img class="pokemon-img" :src="pokemon.imageUrl" />
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
    </router-link>
  </div>
</template>

<script>
import { obterPokemons } from '../services/pokemonsService';
import PokemonType from './PokemonType.vue';

export default {
  props: {
    pokemonsFiltrados: {
      type: Array,
    },
  },
  data() {
    return {
      pokemons: [],
      localPokemonsFiltrados: [],
      pagination: {
        limit: 20,
        offset: 0,
      },
      loading: false,
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

  watch: {
    pokemonsFiltrados(newPokemons) {
      this.temPokemonsFiltrados = true;
      this.localPokemonsFiltrados = newPokemons;
      this.pagination.offset = 0;
      // console.log('valor de newPokemons', newPokemons);
      // // Tem Pokemon Filtrado caso o Array retorne dados ou retorne Vazio
      // if (newPokemons.length > 0 || newPokemons === []) {
      //   this.temPokemonsFiltrados = true;
      // }
      // console.log('aq', this.temPokemonsFiltrados);
    },
  },

  methods: {
    // TODO: Pokemons com imageURl null, tratar
    async obterListaDePokemons() {
      try {
        const { limit, offset } = this.pagination;
        this.pokemons = await obterPokemons({
          limit,
          offset,
        });

        // Os pokemons que quero exibir são os filtrados
        this.localPokemonsFiltrados = [...this.pokemons];
      } catch (error) {
        console.log(error);
      }
    },

    async obterMaisPokemons() {
      try {
        if (!this.loading && !this.temPokemonsFiltrados) {
          this.loading = true;

          const { limit } = this.pagination;
          this.pagination.offset += limit;
          const novosPokemons = await obterPokemons({
            limit,
            offset: this.pagination.offset,
          });
          this.localPokemonsFiltrados =
            this.localPokemonsFiltrados.concat(novosPokemons);
        }
      } catch (error) {
        console.error('Erro ao carregar mais Pokémon:', error);
      } finally {
        this.loading = false;
      }
    },

    handleScroll() {
      //Verifico se ja carregou, chegou ao fim e se ja filtrei por pokemons
      if (
        !this.loading &&
        this.chegouAoFinalDaPagina() &&
        !this.temPokemonsFiltrados
      ) {
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
  min-height: 600px;
}
.card {
  display: flex;
  background-color: var(--branco);
  padding: 30px;
  border-radius: 15px;
  gap: 5px;
  flex: 1 1 15%;
  transition: box-shadow 0.2s ease;
  cursor: pointer;
  height: 385px;
  width: 258px;
}
.card:hover {
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}
.card:hover .pokemon-img {
  transform: translateY(-10px);
}
.card .flex {
  align-items: center;
  flex-direction: column;
  gap: 5px;
}
.pokemon-img {
  transition: transform 1.2s ease;
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
  font-size: 19px;
  color: var(--azul-escuro);
  display: -webkit-box;
  -webkit-line-clamp: 1;
  overflow: hidden;
  -webkit-box-orient: vertical;
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
.not-content {
  height: 50vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
.content {
  text-align: center;
}
</style>
