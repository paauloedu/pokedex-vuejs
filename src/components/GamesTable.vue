<template>
  <div class="pokemon-games" v-if="gamesIndices?.length > 0">
    <p>
      <strong>{{ $t('infos.game_info') }}</strong>
    </p>
    <v-table height="300px" fixed-header density="comfortable">
      <thead>
        <tr>
          <th style="font-weight: bold">{{ $t('infos.game') }}</th>
          <th style="font-weight: bold">{{ $t('infos.position') }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(gameIndex, index) in gamesIndices" :key="index">
          <td style="text-transform: capitalize">
            Pokemon {{ gameIndex.version.name }} version
          </td>
          <td>{{ gameIndex.game_index }}</td>
        </tr>
      </tbody>
    </v-table>
  </div>
  <div style="padding: 25px 0" v-else>
    <p>
      <strong>
        {{ $t('infos.no_games') }}
      </strong>
    </p>
  </div>
</template>

<script>
export default {
  props: {
    gamesIndices: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped>
.v-table {
  background: var(--cinza-claro);
}
.pokemon-games p {
  margin: 10px 0;
  text-align: justify;
}
@media only screen and (max-width: 479px) {
  .pokemon-games p {
    margin: 20px 0;
  }
}
</style>
