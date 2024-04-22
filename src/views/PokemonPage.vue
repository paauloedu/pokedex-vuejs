<template>
  <LanguageBar />
  <PokemonInfo :pokemon-id="pokemonId" />
</template>

<script>
import LanguageBar from '../components/LanguageBar.vue';
import PokemonInfo from '@/components/PokemonInfo.vue';

export default {
  components: { LanguageBar, PokemonInfo },
  data() {
    return {
      pokemonId: null,
    };
  },
  created() {
    this.pokemonId = this.$route.params.id;
  },
};
</script>
