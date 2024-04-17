<template>
  <div class="flex">
    <!-- Barra de pesquisa -->
    <SearchBar style="flex: 1 1 50%" />

    <!-- Filtro por Tipo -->
    <!-- TODO: Deixar branco input -->
    <v-select
      prepend-inner-icon="mdi-pokeball"
      label="Tipo"
      variant="outlined"
      rounded
      clearable
      hide-no-data
      hide-details
    ></v-select>

    <!-- Filtro por Espécie -->
    <v-select
      prepend-inner-icon="mdi-leaf"
      label="Espécie"
      variant="outlined"
      rounded
      clearable
      hide-no-data
      hide-details
    ></v-select>

    <!-- Botão filtrar -->
    <div style="height: inerith">
      <v-btn color="#80909F" rounded outlined style="height: 100%">
        <v-icon color="white" icon="mdi-reload" />
      </v-btn>
    </div>
  </div>
</template>

<script>
import SearchBar from '../components/SearchBar.vue';
export default {
  components: {
    SearchBar,
  },
};
</script>

<style scoped>
.flex {
  width: 100%;
  gap: 20px;
}
</style>
