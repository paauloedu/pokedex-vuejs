<template>
  <v-chip :color="typeColor">
    {{ typeName }}
  </v-chip>
</template>

<script>
export default {
  props: {
    typeName: String,
  },
  computed: {
    typeColor() {
      switch (this.typeName) {
        case 'normal':
          return 'brown lighten-1';
        case 'fire':
          return 'red';
        case 'water':
          return 'blue';
        case 'grass':
          return 'green';
        case 'flying':
          return 'indigo lighten-2';
        case 'fighting':
          return 'red darken-3';
        case 'poison':
          return 'purple';
        case 'electric':
          return 'yellow';
        case 'ground':
          return 'brown darken-1';
        case 'rock':
          return 'brown darken-3';
        case 'psychic':
          return 'pink';
        case 'ice':
          return 'cyan lighten-4';
        case 'bug':
          return 'green lighten-2';
        case 'ghost':
          return 'indigo darken-4';
        case 'steel':
          return 'grey darken-3';
        case 'dragon':
          return 'deep-purple';
        case 'dark':
          return 'grey darken-4';
        case 'fairy':
          return 'pink lighten-3';
        case 'shadow':
          return 'purple';
        default:
          return '';
      }
    },
  },
};
</script>
