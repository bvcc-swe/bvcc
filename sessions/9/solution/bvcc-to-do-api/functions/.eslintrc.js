module.exports = {
  root: true,
  env: {
    es2017:true,
    node: true,
  },
  extends: [
    "eslint:recommended",
  ],
  rules: {
    quotes: ["error", "double"],
  },
  parserOptions : {
    ecmaVersion: 2018
  }
};