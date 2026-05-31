import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  js.configs.recommended,

  {
    ignores: ["uploads/**", "node_modules/**"],
    
    files: ["src/**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.node
      }
    },
    rules: {
      // backend friendly
      "no-console": "off",
      "no-unused-vars": "warn",
      "no-undef": "error"
    }
  }
]);