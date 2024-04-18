<template>
  <v-autocomplete
    density="comfortable"
    item-props
    :label="$t('search_placeholder')"
    prepend-inner-icon="mdi-magnify"
    rounded
    theme="light"
    variant="outlined"
    hide-no-data
    hide-details
    :items="pokemonsName"
    clearable
  ></v-autocomplete>
</template>

<script>
export default {
  props: {
    pokemonsName: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped>
.v-autocomplete {
  margin-right: 10px;
  text-transform: capitalize;
}
:deep(.v-field__input) {
  /* font-size: 13px; */
}
:deep(.v-field__input) {
  height: 36px;
}
</style>
