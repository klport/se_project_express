module.exports = {
  env: {
    es2021: true,
    node: true,
  },

  extends: ["eslint:recommended", "airbnb-base", "prettier"],

  overrides: [
    {
      files: [".eslintrc.{js,cjs}"],
      env: {
        node: true,
      },
      parserOptions: {
        sourceType: "script",
      },
    },
    {
      // 👇 ADD THIS BLOCK
      files: ["*.test.js", "**/tests/**/*.js"],
      env: {
        jest: true,
      },
    },
  ],

  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },

  rules: {
    "no-unused-vars": ["error", { argsIgnorePattern: "^_|next" }],
    "no-underscore-dangle": ["error", { allow: ["_id"] }],
  },
};
