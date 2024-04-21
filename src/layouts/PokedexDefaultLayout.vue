<template>
  <TheHeader />
  <main class="principal">
    <RouterView />
  </main>
</template>

<script>
import TheHeader from '../components/TheHeader.vue';

export default {
  components: {
    TheHeader,
  },
};
</script>

<style scoped>
.principal {
  padding: 6.5rem 7.5rem;
  border-radius: 3.75rem 3.75rem 0rem 0rem;
  background: var(--cinza-claro);
  color: var(--cinza, #444);

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}
@media only screen and (max-width: 767px) {
  .principal {
    padding: 2.5rem 4.5rem;
  }
}
@media only screen and (max-width: 479px) {
  .principal {
    padding: 2.5rem 3.5rem;
  }
}
</style>
