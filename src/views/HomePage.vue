<template>
  <LanguageBar />
  <h1>Pokedex</h1>
  <p>{{ $t('search') }}</p>
  <FiltersBar />
  <PokemonsList />
</template>

<script>
import LanguageBar from '../components/LanguageBar.vue';
import FiltersBar from '../components/FiltersBar.vue';
import PokemonsList from '../components/PokemonsList.vue';

export default {
  components: { LanguageBar, FiltersBar, PokemonsList },
};
</script>

<style scoped></style>
