<template>
  <header class="banner">
    <div class="apresentacao">
      <router-link to="/">
        <img src="../assets/img/logo.png" alt="Logo Pokemon" class="logo" />
      </router-link>

      <p class="cabecalho-lg frase-cabecalho">
        <span class="texto-vermelho">{{ $t('header.find_pokemons') }}</span>
        {{ $t('header.want_pokemons') }}
      </p>

      <p class="subtitulo-lg">
        {{ $t('subheader') }}
      </p>
    </div>

    <img src="../assets/img/foto-banner.png" class="foto-banner" />
  </header>
</template>

<style scoped>
.banner {
  padding: 4rem 7.5rem;
  color: var(--amarelo-escuro);
  display: flex;
  justify-content: space-between;
  align-items: center;
  column-gap: 3.25rem;
}

.logo {
  height: 4.5rem;
  margin-bottom: 3rem;
}

.frase-cabecalho {
  margin-bottom: 2rem;
}

.texto-vermelho {
  color: var(--vermelho-medio, #ee4135b1);
}

.foto-banner {
  width: 35rem;
  /* visibility: hidden; */
}

@media only screen and (max-width: 1300px) {
  .banner {
    padding: 4rem 3.75rem;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }

  .logo {
    display: block;
    margin-left: auto;
    margin-right: auto;
  }
}

@media only screen and (max-width: 767px) {
  .banner {
    padding: 4rem 1.5rem;
  }

  .foto-banner {
    width: min(100%, 21.25rem);
  }
}
</style>
