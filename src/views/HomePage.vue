<template>
  <LanguageBar />
  <h1>Pokédex</h1>
  <p>{{ $t('search') }}</p>
  <FiltersBar @pokemons-filtrados="atualizarHomePage" />
  <PokemonsList :pokemons-filtrados="pokemonsFiltrados" />
</template>

<script>
import LanguageBar from '../components/LanguageBar.vue';
import FiltersBar from '../components/FiltersBar.vue';
import PokemonsList from '../components/PokemonsList.vue';

export default {
  data() {
    return {
      pokemonsFiltrados: [],
    };
  },
  components: { LanguageBar, FiltersBar, PokemonsList },
  methods: {
    atualizarHomePage(pokemons) {
      this.pokemonsFiltrados = pokemons;
    },
  },
};
</script>

<style scoped></style>
