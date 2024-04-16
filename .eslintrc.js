module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-strongly-recommended',
    'prettier',
  ],
  parserOptions: {
    parser: '@babel/eslint-parser',
  },
  plugins: ['vue'],
  rules: {
    'arrow-body-style': ['error', 'as-needed'],
    'arrow-parens': ['error', 'always'],
    curly: ['error', 'all'],
    'space-infix-ops': ['error', { int32Hint: false }],
    'one-var': ['error', 'never'],
    'comma-spacing': [
      'error',
      {
        before: false,
        after: true,
      },
    ],
    'vue/no-multi-spaces': 0,
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
  },
};
