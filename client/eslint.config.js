import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";
import pluginImportSort from "eslint-plugin-simple-import-sort";
import globals from "globals";

export default [
  {
    ignores: ["node_modules", "dist"],
  },

  // base configs first
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,

  // your overrides last (to override rules from recommended)
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    languageOptions: {
      globals: globals.browser,
    },
    plugins: {
      react: pluginReact,
      "simple-import-sort": pluginImportSort,
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      "react/react-in-jsx-scope": "off",
      "simple-import-sort/imports": [
        "warn",
        {
          groups: [
            ["^react$", "^node:"],
            ["^@?\\w"],
            ["^(@|src|components|utils|hooks)(/.*|$)"],
            ["^\\.\\.(?!/?$)", "^\\.\\./?$"],
            ["^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"],
            ["^.+\\.s?css$"],
          ],
        },
      ],
      "simple-import-sort/exports": "warn",
    },
  },
];
