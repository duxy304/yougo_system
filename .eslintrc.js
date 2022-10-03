module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/essential', '@vue/standard'],
  parserOptions: {
    parser: '@babel/eslint-parser'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'vue/multi-word-component-names': 'off',
    'space-before-function-paren': ['error', 'never'],
    'node/no-deprecated-api': 'off',
    'no-unused-vars': 'off',
    'no-undef': 'off',
    'node/handle-callback-err': 'off',
    'new-cap': 'off',
    'no-unused-expressions': 'off'
  }
}
