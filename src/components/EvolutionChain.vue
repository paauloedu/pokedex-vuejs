<template>
  <div class="pokemon-chain">
    <div v-if="pokemon.evolution?.stage_1">
      <h3>{{ $t('infos.baby') }}</h3>
      <div class="flex-row">
        <div v-for="(imageUrl, index) in imageUrls.stage_1" :key="index">
          <img class="images-evolution" :src="imageUrl" />
          <a
            :href="'/pokemon/' + pokemon.evolution.stage_1[index]"
            class="evolution-name"
          >
            {{ pokemon.evolution.stage_1[index] }}
          </a>
        </div>
      </div>
    </div>
    <div v-if="pokemon.evolution?.stage_2">
      <h3>{{ $t('infos.basic') }}</h3>
      <div class="flex-row">
        <div v-for="(imageUrl, index) in imageUrls.stage_2" :key="index">
          <img class="images-evolution" :src="imageUrl" />
          <a
            :href="'/pokemon/' + pokemon.evolution.stage_2[index]"
            class="evolution-name"
          >
            {{ pokemon.evolution.stage_2[index] }}
          </a>
        </div>
      </div>
    </div>
    <div v-if="pokemon.evolution?.stage_3">
      <h3>{{ $t('infos.stage_1') }}</h3>
      <div class="flex-row">
        <div v-for="(imageUrl, index) in imageUrls.stage_3" :key="index">
          <img class="images-evolution" :src="imageUrl" />
          <a
            :href="'/pokemon/' + pokemon.evolution.stage_3[index]"
            class="evolution-name"
          >
            {{ pokemon.evolution.stage_3[index] }}
          </a>
        </div>
      </div>
    </div>
    <div v-if="pokemon.evolution?.stage_4">
      <h3>{{ $t('infos.stage_2') }}</h3>
      <div class="flex-row">
        <div v-for="(imageUrl, index) in imageUrls.stage_4" :key="index">
          <img class="images-evolution" :src="imageUrl" />
          <a
            :href="'/pokemon/' + pokemon.evolution.stage_4[index]"
            class="evolution-name"
          >
            {{ pokemon.evolution.stage_4[index] }}
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    pokemon: {
      type: Object,
      required: true,
    },
    imageUrls: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
.flex-row {
  display: flex;
  flex-direction: row;
  gap: 35px;
  flex-wrap: wrap;
  text-align: center;
}
.pokemon-chain {
  display: flex;
  flex-direction: row;
  gap: 15%;
}

.images-evolution {
  height: 50px;
  width: 50px;
}
.evolution-name {
  text-transform: capitalize;
  display: block;
  font-weight: bold;
  color: var(--azul-claro);
}
.evolution-name:hover {
  color: var(--vermelho-claro);
}
@media only screen and (max-width: 479px) {
  .pokemon-chain {
    flex-direction: column;
    gap: 30px;
  }
}
</style>
