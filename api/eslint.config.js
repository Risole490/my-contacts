import globals from "globals";
import pluginJs from "@eslint/js";


/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.js"],
    languageOptions: {sourceType: "commonjs"},
    rules: {
      // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
      'camelcase': 'off', // Desativa a regra de nomenclatura camelCase
      'no-unused-vars': ['error', { varsIgnorePattern: 'next' }], // Ignora a variável next
    }
  },
  {
    languageOptions: { globals: globals.node }
  },
  pluginJs.configs.recommended,
];

