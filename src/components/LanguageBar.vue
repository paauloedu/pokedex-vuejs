<template>
  <div class="flex">
    <v-icon icon="mdi-web" />
    <span @click="setLocale('pt_BR')" id="pt">PT</span>
    <p>|</p>
    <span @click="setLocale('en_US')" id="en">EN</span>
    <p>|</p>
    <span @click="setLocale('es_ES')" id="es">ES</span>
  </div>
</template>

<script>
export default {
  methods: {
    setLocale(locale) {
      this.$i18n.locale = locale;
    },
  },
};
</script>

<style scoped>
.flex {
  align-items: center;
}
.flex span {
  cursor: pointer;
  padding: 0 10px;
}
.flex p,
.flex span {
  font-size: 20px;
}

.flex span:hover {
  color: var(--amarelo-escuro);
}
</style>
