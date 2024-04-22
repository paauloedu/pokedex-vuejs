<template>
  <div class="pokemon-moves" v-if="movesData?.length > 0">
    <p>
      <strong>{{ $t('infos.game_info') }}</strong>
    </p>
    <v-table height="300px" fixed-header density="comfortable">
      <thead>
        <tr>
          <th style="font-weight: bold">Nome</th>
          <th style="font-weight: bold">Tipo</th>
          <th style="font-weight: bold">Classe</th>
          <th style="font-weight: bold">Poder</th>
          <th style="font-weight: bold">Precisão</th>
          <th style="font-weight: bold">Efeito</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(moveIndex, index) in movesData"
          :key="index"
          style="text-transform: capitalize"
        >
          <td>
            {{ moveIndex.name ?? '--' }}
          </td>
          <td>{{ moveIndex.type ?? '--' }}</td>
          <td>{{ moveIndex.damage_class ?? '--' }}</td>
          <td>{{ moveIndex.power ?? '--' }}</td>
          <td>
            {{ moveIndex.accuracy ? moveIndex.accuracy + `%` : '--' }}
          </td>
          <td style="min-width: 400px">
            {{ moveIndex.shortEffect ?? '--' }}
          </td>
        </tr>
      </tbody>
    </v-table>
  </div>
  <div style="padding: 25px 0" v-else>
    <p>
      <strong>
        {{ $t('infos.no_moves') }}
      </strong>
    </p>
  </div>
</template>

<script>
export default {
  props: {
    movesData: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped>
.pokemon-moves p {
  margin: 10px 0;
  text-align: justify;
}
.v-table {
  background: var(--cinza-claro);
}
@media only screen and (max-width: 479px) {
  .pokemon-moves p {
    margin: 20px 0;
  }
}
</style>
