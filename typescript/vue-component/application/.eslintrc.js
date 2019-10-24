module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/standard',
    '@vue/typescript'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'vue/script-indent': ['error', 2, {'baseIndent': 1}],
    "no-trailing-spaces": 0, //一行结束后面不要有空格
  },
  overrides:[
    {
      'files':['*.vue'],
      'rules':{
        'indent':'off'
      }
    }
  ],
  parserOptions: {
    parser: '@typescript-eslint/parser'
  }
}
