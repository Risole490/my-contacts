import { defineConfig } from "eslint/config";
import js from "@eslint/js";
import globals from "globals";
import pluginReact from "eslint-plugin-react";

export default defineConfig([
  {
    files: ["**/*.{js,jsx}"],  // Foco em .js e .jsx
    plugins: {
      react: pluginReact
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        React: "writable"  // Permite que React seja usado sem import
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        },
        sourceType: "module"
      }
    },
    rules: {
      "react/jsx-filename-extension": [1, {
        "extensions": [".js", ".jsx"]  // Permite JSX em .js
      }],
      "react/react-in-jsx-scope": "off",  // Não exige import React
      "semi": ["error", "always"]  // Exige ponto e vírgula
    }
  },
  js.configs.recommended,
  pluginReact.configs.flat.recommended
]);
