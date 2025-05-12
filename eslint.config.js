import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    ignores: ["dist"], // Exclude build output directory
  },
  {
    files: ["**/*.{ts,tsx}"], // Target TypeScript and TSX files
    extends: [
      js.configs.recommended,         // ESLint base recommended rules
      ...tseslint.configs.recommended // TypeScript-specific recommended rules
    ],
    languageOptions: {
      ecmaVersion: 2020,             // ECMAScript 2020 syntax support
      globals: globals.browser       // Enable browser-specific globals
    },
    plugins: {
      "react-hooks": reactHooks,     // React hooks rules
      "react-refresh": reactRefresh  // Fast refresh development rules
    },
    rules: {
      ...reactHooks.configs.recommended.rules, // Enforce best practices for hooks

      // Warn if components are not exported correctly for React Fast Refresh
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true }
      ],

      // Disable no-unused-vars since TypeScript already checks this
      "@typescript-eslint/no-unused-vars": "off"
    }
  }
);
