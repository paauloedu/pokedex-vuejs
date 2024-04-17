<template>
  <v-autocomplete
    auto-select-first
    density="comfortable"
    item-props
    menu-icon=""
    :placeholder="$t('search_placeholder')"
    prepend-inner-icon="mdi-magnify"
    rounded
    theme="light"
    variant="outlined"
    hide-no-data
    hide-details
  ></v-autocomplete>
</template>

<style scoped>
.v-autocomplete {
  margin-right: 10px;
}
:deep(.v-field__input) {
  /* font-size: 13px; */
}
:deep(.v-field__input) {
  height: 36px;
}
</style>
