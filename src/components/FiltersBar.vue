<template>
  <div class="flex">
    <!-- TODO: Deixar branco os input -->
    <!-- Barra de pesquisa -->
    <SearchBar
      v-model="nomeSelecionado"
      :pokemonsName="nomes"
      style="flex: 1 1 50%"
    />

    <!-- Filtro por Tipo -->
    <v-autocomplete
      v-model="tipoSelecionado"
      :items="tipos"
      prepend-inner-icon="mdi-pokeball"
      :label="$t('type')"
      variant="outlined"
      rounded
      clearable
      hide-no-data
      hide-details
      style="flex: 1 1 20%"
    ></v-autocomplete>

    <!-- Filtro por Espécie -->
    <v-autocomplete
      v-model="especieSelecionada"
      :items="especies"
      prepend-inner-icon="mdi-leaf"
      :label="$t('specie')"
      variant="outlined"
      rounded
      clearable
      hide-no-data
      hide-details
      style="flex: 1 1 20%"
    ></v-autocomplete>

    <!-- Botão filtrar -->
    <div style="height: inerith">
      <v-btn
        @click="filtrarPokemons"
        color="#80909F"
        rounded
        outlined
        style="height: 100%"
      >
        <v-icon color="white" icon="mdi-reload" />
      </v-btn>
    </div>
  </div>
</template>

<script>
import SearchBar from '../components/SearchBar.vue';
import { obterPokemons } from '@/services/pokemonsService';
import { obterTodosTiposDePokemon } from '@/services/pokemonsService';

export default {
  data() {
    return {
      pokemons: [],
      nomes: [],
      tipos: [],
      especies: [],
      nomeSelecionado: null,
      tipoSelecionado: null,
      especieSelecionada: null,
    };
  },
  components: {
    SearchBar,
  },
  async created() {
    await this.carregarParametrosDoFiltro();
  },
  methods: {
    async carregarParametrosDoFiltro() {
      try {
        const MAX_POKEMONS = 2000;
        this.pokemons = await obterPokemons({ limit: MAX_POKEMONS });
        this.tipos = await obterTodosTiposDePokemon();

        // TODO: AJUSTAR posteriormente
        // Nomes com ID
        this.nomes = this.pokemons.map(
          (pokemon) => `${this.capitalize(pokemon.name)} (${pokemon.id})`
        );

        // Pego todas as especies
        const especiesTodosPokemons = this.pokemons.map(
          (pokemon) => pokemon.specie
        );

        // Removo as duplicadas
        this.especies = [...new Set(especiesTodosPokemons)];
      } catch (error) {
        console.error('Erro ao carregar nomes dos pokémons:', error);
      }
    },

    capitalize(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },

    filtrarPokemons() {
      let pokemonsFiltrados = this.pokemons;

      // Filtrar por Nome (ID)
      if (this.nomeSelecionado) {
        // Busco apenas até o parentese
        const nomePokemon = this.nomeSelecionado
          .match(/^\s*(.*?)\s*\(/)[1]
          .toLowerCase();
        pokemonsFiltrados = pokemonsFiltrados.filter(
          (pokemon) => pokemon.name === nomePokemon
        );
      }

      // Filtrar por Tipo
      if (this.tipoSelecionado) {
        pokemonsFiltrados = pokemonsFiltrados.filter((pokemon) =>
          pokemon.types.some((type) => type.type.name === this.tipoSelecionado)
        );
      }

      // Filtrar por Espécie
      if (this.especieSelecionada) {
        pokemonsFiltrados = pokemonsFiltrados.filter(
          (pokemon) => pokemon.specie === this.especieSelecionada
        );
      }

      console.log(pokemonsFiltrados);
    },
  },
};
</script>

<style scoped>
.flex {
  width: 100%;
  gap: 20px;
}
</style>