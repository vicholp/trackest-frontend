import js from "@eslint/js";

import globals from "globals";

import pluginVue from 'eslint-plugin-vue';
import pluginTailwind from 'eslint-plugin-tailwindcss';
import pluginCompat from 'eslint-plugin-compat';
// import vitest from 'eslint-plugin-vitest';
// import pluginImport from 'eslint-plugin-import';

export default [
  js.configs.recommended,
  ...pluginVue.configs['flat/recommended'],
  ...pluginTailwind.configs["flat/recommended"],
  pluginCompat.configs["flat/recommended"],
  {
    languageOptions:
    {
      ecmaVersion: 2020,
      sourceType: "module",
      globals: {
          ...globals.browser,
          ...globals.node,
        },
    },
    files: [
      "**/*.mjs",
      "**/*.js",
      "**/*.ts",
      "**/*.jsx",
      "**/*.tsx",
      "**/*.vue",
    ],
    plugins: {
        pluginVue,
        pluginTailwind,
    },
    rules: {
      "comma-dangle": [
        1,
        "always-multiline",
      ],
      "comma-spacing": [
        1,
        {
          "before": false,
          "after": true,
        },
      ],
      "camelcase": [
        1,
        {
          "properties": "always",
        },
      ],
      "comma-style": [
        2,
        "last",
      ],
      "padded-blocks": [
        1,
        "never",
      ],
      "no-console": 1,
      "no-debugger": 2,
      "no-multi-spaces": 1,
      "no-use-before-define": 2,
      "semi": [
        1,
        "always",
      ],
      "semi-spacing": [
        1,
        {
          "before": false,
          "after": true,
        },
      ],
      "vue/max-len": [
        1,
        {
          "code": 120,
          "ignoreHTMLAttributeValues": true,
        },
      ],
      "vue/max-attributes-per-line": 2,
      "vue/script-indent": 1,
      "vue/multi-word-component-names": 0,
    },
}];
