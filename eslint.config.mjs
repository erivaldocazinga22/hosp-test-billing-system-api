import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";


export default [
  {files: ["**/*.{mjs,cjs,ts}"]},
  {
    files: ["bin/**/*"],
    excludedFiles: "*.js",
  },
  {languageOptions: { globals: {...globals.browser, ...globals.node} }},
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
			semi: ["error", "always"],
			quotes: ["error", "double"],
			"@typescript-eslint/no-explicit-any": "off",
			"@typescript-eslint/explicit-module-boundary-types": "off",
			"@typescript-eslint/no-empty-function": "off",
		}
  }
];