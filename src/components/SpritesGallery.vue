<template>
  <div class="imagens-sprites" v-if="sprites?.length > 0">
    <v-img
      v-for="(sprite, spriteIndex) in sprites"
      :key="spriteIndex"
      :src="sprite"
      class="pokemon-sprites"
    />
  </div>
  <div style="padding: 25px 0" v-else>
    <p>
      <strong>{{ $t('infos.no_sprites') }}</strong>
    </p>
  </div>
</template>

<script>
export default {
  props: {
    sprites: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped>
.imagens-sprites {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 20px;
  max-height: 300px;
  overflow-y: auto;
}
.pokemon-sprites {
  width: 100%;
  height: 100px;
  object-fit: cover;
  margin-bottom: 5px;
}
.pokemon-sprites,
.images-evolution {
  height: 50px;
  width: 50px;
}
</style>
