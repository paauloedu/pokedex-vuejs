<template>
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
      default: () => [],
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
    /**
     * Observador para pokemonsFiltrados
     * @param {Array} newPokemons - Novos Pokémons filtrados.
     * Define os novos pokémons filtrados e reinicia a paginação
     */
    pokemonsFiltrados(newPokemons) {
      this.temPokemonsFiltrados = true;
      this.localPokemonsFiltrados = newPokemons;
      this.pagination.offset = 0;
    },
  },

  methods: {
    /**
     * Obtém a lista de Pokémons.
     * @async
     * @method obterListaDePokemons
     */
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
        console.error('Erro ao obter lista de Pokémons:', error);
      }
    },

    /**
     * Obtém mais Pokémons para scroll infinito.
     * @async
     * @method obterMaisPokemons
     */
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

    /**
     * Manipula o evento de scroll.
     * @method handleScroll
     */
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

    /**
     * Verifica se o usuário chegou ao final da página.
     * @method chegouAoFinalDaPagina
     * @returns {boolean} - Verdadeiro se o usuário chegou ao final da página, senão, falso.
     */
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
  justify-content: center;
  gap: 25px;
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
  min-height: 345px;
  min-width: 218px;
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
  font-size: 15px;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  overflow: hidden;
  -webkit-box-orient: vertical;
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

@media only screen and (min-width: 1145px) and (max-width: 1675px) {
  .card {
    max-width: 168px;
    max-height: 292px;
    padding: 15px;
    min-height: auto;
    min-width: auto;
  }
}

@media only screen and (min-width: 595px) and (max-width: 944px) {
  .card {
    max-width: 158px;
    max-height: 282px;
    padding: 45px;
    min-height: auto;
    min-width: auto;
  }
  .pokemon-specie {
    font-size: 13px;
  }
  .card .flex {
    gap: 8px;
  }
  .list {
    justify-content: center;
  }
}

@media only screen and (max-width: 595px) {
  .column {
    flex-direction: row;
  }
  .list {
    flex-direction: column;
    width: 100%;
    gap: 12px;
  }
  .card {
    min-height: auto;
    min-width: auto;
    padding: 18px;
  }
  .card .flex {
    min-width: 200px;
  }
}

@media only screen and (max-width: 479px) {
  .card .flex {
    min-width: auto;
  }
}
</style>
