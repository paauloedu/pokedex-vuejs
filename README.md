# POKÉDEX

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT) [![JavaScript](https://img.shields.io/badge/JavaScript-ES6-yellow)](https://www.ecma-international.org/ecma-262/6.0/) [![Vue.js](https://img.shields.io/badge/Vue.js-3.2.13-brightgreen)](https://vuejs.org/) [![Material Design Icons](https://img.shields.io/badge/MDI-7.4.47-orange)](https://materialdesignicons.com/) [![Vue i18n](https://img.shields.io/badge/Vue%20I18n-latest-brightgreen)](https://vue-i18n.intlify.dev/)

Projeto desenvolvido como parte do processo seletivo para Estágio em Desenvolvimento Frontend. O objetivo é implementar uma Pokedex com funcionalidades avançadas, incluindo listagem de Pokémons com scroll infinito, filtros por nome, ID, tipo e espécie, visualização de sprites, cadeia de evolução, movimentos de ataque e todos os jogos em que o Pokémon está presente.

O aplicativo é acompanhado de testes automatizados, internacionalização para os idiomas português, inglês e espanhol, e é totalmente responsivo.

## Conteúdo

1. [🚀 Funcionalidades Principais](#funcionalidades-principais)
2. [📦 Instruções de Instalação](#instruções-de-instalação)
3. [🧪 Instruções de Testes](#instruções-de-teste)
4. [📚 Dependências](#dependências)
5. [📝 Licença](#licença)

## 🚀 Funcionalidades Principais

### Scroll Infinito

Implementado com scroll infinito para otimização de busca.

<img src="https://github.com/paauloedu/pokedex-vuejs/raw/main/src/assets/gif/scroll_infinito.gif" width="400">

### Tela Responsiva

Projeto completamente responsivo, adaptando-se a diferentes dispositivos e tamanhos de tela.

<img src="https://github.com/paauloedu/pokedex-vuejs/raw/main/src/assets/gif/responsive.gif" width="200">

### Mais de 1000 Pokemons

Listagem completa de todos os Pokémon disponíveis na PokeAPI.

<img src="https://github.com/paauloedu/pokedex-vuejs/raw/main/src/assets/gif/all_pokemons.gif" width="200">

### Internacionalização

Suporta internacionalização nos idiomas Português, Inglês e Espanhol.

### Padrões Vue.js

O projeto segue os [padrões](https://github.com/paauloedu/pokedex-vuejs/blob/main/padr%C3%B5es.md) e boas práticas recomendados pelo Vue.js, garantindo uma estrutura coesa e manutenível.

## 📦 Instruções de Instalação

### Front-end

Para o front-end funcionar, siga os passos abaixo:

```bash
# Instale as dependências
npm install

# Execute o servidor de desenvolvimento
npm run serve
```

Acesse o front-end em http://localhost:8081.

## 🧪 Instruções de Teste

Para rodar os testes unitários automatizados, utilize o seguinte comando:

```bash
# Execute todos os testes automatizados
npm run test:unit
```

## 📚 Dependências

Este projeto utiliza as seguintes dependências:

- [Vue](https://www.npmjs.com/package/vue): ^3.2.13
  - Framework JavaScript progressivo para construção de interfaces de usuário.
- [Vue Router](https://www.npmjs.com/package/vue-router): ^4.0.3
  - Roteador oficial para aplicações Vue.js, permitindo a navegação entre componentes.
- [Vuetify](https://www.npmjs.com/package/vuetify): ^3.5.16
  - Framework de componentes Vue.js para criar interfaces de usuário agradáveis e responsivas.
- [Axios](https://www.npmjs.com/package/axios): ^1.6.8
  - Cliente HTTP para fazer requisições à [PokeAPI](https://pokeapi.co/).
- [@mdi/font](https://www.npmjs.com/package/@mdi/font): ^7.4.47
  - Ícones Material Design.
- [Vue-i18n](https://www.npmjs.com/package/vue-i18n): ^9.12.1
  - Plugin de internacionalização para Vue.js.

## 📝 Licença

Este projeto é distribuído sob a [MIT © Paulo E. S. Reis](https://github.com/paauloedu/pokedex-vuejs/blob/main/LICENSE) <a href="#top">🔝</a>
