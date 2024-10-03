import eslintJS from "@eslint/js";
import nxPlugin from "@nx/eslint-plugin";
import stylisticPlugin from "@stylistic/eslint-plugin";
import stylisticPluginMigrate from "@stylistic/eslint-plugin-migrate";
import eslintConfigPrettier from "eslint-config-prettier";
import importPlugin from "eslint-plugin-import-x";
import jsdocPlugin from "eslint-plugin-jsdoc";
import nodePlugin from "eslint-plugin-n";
import vitestPlugin from "eslint-plugin-vitest";
import globals from "globals";
import tsEslint from "typescript-eslint";

/* eslint @stylistic/migrate/migrate: "error" */

/**
 * This ESLint config can be reviewed using [eslint config-inspector][eslint-config-inspector].
 *
 * > 👉 `npm run eslint-inspector:start`
 *
 * [eslint-config-inspector]: https://github.com/eslint/config-inspector
 */
export default tsEslint.config(
  ///////////////////////////////////////////////////////////////////
  // GLOBAL CONFIGS
  {
    name: "global/ignores",
    ignores: [
      ".nx/",
      "**/coverage/",
      "**/build/",
      "**/dist/",
      "**/*__generated__**", // codegen generated files/dirs
    ],
  },
  {
    name: "global/languageOptions",
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parser: tsEslint.parser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    name: "global/plugins,settings",
    plugins: {
      "@nx": nxPlugin,
      "@stylistic": stylisticPlugin,
      "@stylistic/migrate": stylisticPluginMigrate,
      "@typescript-eslint": tsEslint.plugin,
      "import-x": importPlugin,
      "jsdoc": jsdocPlugin,
      "n": nodePlugin,
    },
    settings: {
      "import-x/extensions": [".ts", ".tsx", ".js", ".jsx"],
      "import-x/parsers": {
        "@typescript-eslint/parser": [".ts", ".tsx", ".js", ".jsx"],
      },
      "import-x/resolver": {
        node: {
          extensions: [".ts", ".tsx", ".js", ".jsx"],
        },
        typescript: {
          project: [
            "tsconfig.base.json",
            "apps/**/tsconfig.json",
            "libs/**/tsconfig.json",
          ],
        },
      },
    },
  },
  ///////////////////////////////////////////////////////////////////
  // ALL TS+JS FILES
  {
    name: "files:all/base",
    files: ["**/*.?([cm])[tj]s?(x)"],
    languageOptions: {
      globals: globals.nodeBuiltin, // TODO maybe limit nodeBuiltin to non-tsx files?
    },
    rules: {
      // MERGE PRESETS:
      ...stylisticPlugin.configs.customize(
        { semi: true, quotes: "double", jsx: true, arrowParens: true, braceStyle: "1tbs" } // prettier-ignore
      ).rules,
      ...eslintJS.configs.recommended.rules,
      ...importPlugin.configs.recommended.rules,
      ...nodePlugin.configs["flat/recommended-module"].rules,
      ...jsdocPlugin.configs["flat/recommended-typescript"].rules,
      ...nxPlugin.configs.typescript.rules,

      ...[
        ...tsEslint.configs.strictTypeChecked,
        ...tsEslint.configs.stylisticTypeChecked, // prettier-ignore
      ].reduce((accum, { rules }) => ({ ...accum, ...rules }), {}),

      // RULE CUSTOMIZATIONS:

      // RULES: eslint (builtin)
      "default-case": "error", //      switch-case statements must have a default case
      "default-case-last": "error", // switch-case statements' default case must be last
      "eqeqeq": ["error", "always"],
      "no-console": "warn",
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: [
                "@fixit/**/_circularDependencyFix.*",
                "@fixit/**/_circularDependencyFix/**",
              ],
              message:
                "Files which ameliorate circular dependency issues are for internal " +
                "use only by the project in which the file(s) reside, and may not be " +
                "imported into other projects.",
            },
          ],
        },
      ],
      "prefer-const": ["warn", { destructuring: "all" }],
      "prefer-object-has-own": "error",
      "prefer-promise-reject-errors": "error",

      /* RULES: import-x (eslint-plugin-import-x)
      As recommended by typescript-eslint, the following import-x rules are disabled because they
      degrade performance and TypeScript provides the same checks as part of standard type checking.
      https://typescript-eslint.io/troubleshooting/typed-linting/performance#eslint-plugin-import */
      "import-x/default": "off",
      "import-x/named": "off",
      "import-x/namespace": "off",
      "import-x/no-named-as-default-member": "off",
      "import-x/no-unresolved": "off",

      /* RULES: n (eslint-plugin-n)
      This plugin and its upstream, eslint-plugin-node, trigger false positives on import-related
      rules in monorepo setups because the plugins only read dependencies from the package.json
      that's closest to the file being linted, and that behavior is currently non-configurable.
      Since TypeScript flags invalid imports without issue, these rules can safely be disabled. */
      "n/no-extraneous-import": "off", //  Covered by TS, and false positives in monorepos
      "n/no-missing-import": "off", //     Covered by TS, and false positives in monorepos
      "n/no-unpublished-import": "off", // Covered by TS, and false positives in monorepos
      "n/no-process-env": "error",
      "n/no-unsupported-features/node-builtins": [
        "error",
        { allowExperimental: true }, // For module.register in tools/tsconfig-paths-esm-loader
      ],

      // RULES: jsdoc (eslint-plugin-jsdoc)
      "jsdoc/check-tag-names": ["error", { definedTags: ["docs"] }], // Add custom @docs tag
      "jsdoc/require-param": "off", // Don't require jsdoc @param tags (yet)
      "jsdoc/require-property": "off", // Don't require jsdoc @property tags (yet)
      "jsdoc/require-returns": "off", // Don't require jsdoc @returns tags (yet)
      "jsdoc/tag-lines": "off", // Allow blank lines around jsdoc tags for readability

      // RULES: @nx (eslint-plugin-nx)
      "@nx/enforce-module-boundaries": [
        "error",
        {
          allow: ["@fixit/api-schemas/GraphQL/types"],
          depConstraints: [
            // TODO Update 1st dep constraint after tags are added to projects
            // https://nx.dev/nx-api/eslint-plugin/documents/enforce-module-boundaries
            { sourceTag: "*", onlyDependOnLibsWithTags: ["*"] },
          ],
        },
      ],

      // RULES: @typescript-eslint (typescript-eslint)
      "@typescript-eslint/array-type": "off", //                      Allow "T[]" and "Array<T>"
      "@typescript-eslint/consistent-indexed-object-style": "off", // Allow "Record<K, V>" and "{ [key: K]: V }"
      "@typescript-eslint/consistent-type-definitions": "off", //     Allow "type" and "interface", there are subtle usage differences
      "@typescript-eslint/no-confusing-void-expression": "off", //    Allow 1-line arrow fns to return void for readability
      "@typescript-eslint/no-explicit-any": ["error", { ignoreRestArgs: true }],
      "@typescript-eslint/no-extraneous-class": [
        "error",
        { allowStaticOnly: true },
      ],
      "@typescript-eslint/no-inferrable-types": "off",
      "@typescript-eslint/no-misused-promises": [
        "error",
        { checksVoidReturn: { arguments: false } },
      ],
      "@typescript-eslint/no-non-null-assertion": "off",
      "@typescript-eslint/no-unnecessary-boolean-literal-compare": "off", // Allow "if (x === true)"
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          args: "after-used",
          argsIgnorePattern: "^_",
          vars: "all",
          varsIgnorePattern: "^_",
          destructuredArrayIgnorePattern: "^_",
          ignoreRestSiblings: false,
        },
      ],
      "@typescript-eslint/prefer-for-of": "off",
      "@typescript-eslint/prefer-nullish-coalescing": [
        "error",
        {
          ignoreConditionalTests: true,
          ignorePrimitives: { string: true },
        },
      ],
      "@typescript-eslint/restrict-template-expressions": [
        "error",
        {
          allowAny: false,
          allowNever: false,
          allowArray: true,
          allowBoolean: true,
          allowNullish: true,
          allowNumber: true,
          allowRegExp: true,
        },
      ],

      // RULES: eslint-config-prettier (must be last to remove rules that conflict with prettier)
      ...eslintConfigPrettier.rules,
      /* The following rules are not yet covered by eslint-config-prettier, as they have yet to add
      the "@stylistic" rule namespace to their list of ignored rules (see below PR which fixes it).
      TODO Rm this comment and the rule customizations below once the relevant PR has been merged.
        https://github.com/prettier/eslint-config-prettier/pull/272 */
      "@stylistic/lines-around-comment": "off",
      "@stylistic/max-len": "off",
      "@stylistic/no-confusing-arrow": "off",
      "@stylistic/no-mixed-operators": "off",
      "@stylistic/no-tabs": "off",
      "@stylistic/quotes": "off",
      "@stylistic/array-bracket-newline": "off",
      "@stylistic/array-bracket-spacing": "off",
      "@stylistic/array-element-newline": "off",
      "@stylistic/arrow-parens": "off",
      "@stylistic/arrow-spacing": "off",
      "@stylistic/block-spacing": "off",
      "@stylistic/brace-style": "off",
      "@stylistic/comma-dangle": "off",
      "@stylistic/comma-spacing": "off",
      "@stylistic/comma-style": "off",
      "@stylistic/computed-property-spacing": "off",
      "@stylistic/dot-location": "off",
      "@stylistic/eol-last": "off",
      "@stylistic/func-call-spacing": "off",
      "@stylistic/function-call-argument-newline": "off",
      "@stylistic/function-call-spacing": "off",
      "@stylistic/function-paren-newline": "off",
      "@stylistic/generator-star-spacing": "off",
      "@stylistic/implicit-arrow-linebreak": "off",
      "@stylistic/indent": "off",
      "@stylistic/jsx-quotes": "off",
      "@stylistic/key-spacing": "off",
      "@stylistic/keyword-spacing": "off",
      "@stylistic/linebreak-style": "off",
      "@stylistic/max-statements-per-line": "off",
      "@stylistic/multiline-ternary": "off",
      "@stylistic/new-parens": "off",
      "@stylistic/newline-per-chained-call": "off",
      "@stylistic/no-extra-parens": "off",
      "@stylistic/no-extra-semi": "off",
      "@stylistic/no-floating-decimal": "off",
      "@stylistic/no-mixed-spaces-and-tabs": "off",
      "@stylistic/no-multi-spaces": "off",
      "@stylistic/no-multiple-empty-lines": "off",
      "@stylistic/no-trailing-spaces": "off",
      "@stylistic/no-whitespace-before-property": "off",
      "@stylistic/nonblock-statement-body-position": "off",
      "@stylistic/object-curly-newline": "off",
      "@stylistic/object-curly-spacing": "off",
      "@stylistic/object-property-newline": "off",
      "@stylistic/one-var-declaration-per-line": "off",
      "@stylistic/operator-linebreak": "off",
      "@stylistic/padded-blocks": "off",
      "@stylistic/quote-props": "off",
      "@stylistic/rest-spread-spacing": "off",
      "@stylistic/semi": "off",
      "@stylistic/semi-spacing": "off",
      "@stylistic/semi-style": "off",
      "@stylistic/space-before-blocks": "off",
      "@stylistic/space-before-function-paren": "off",
      "@stylistic/space-in-parens": "off",
      "@stylistic/space-infix-ops": "off",
      "@stylistic/space-unary-ops": "off",
      "@stylistic/switch-colon-spacing": "off",
      "@stylistic/template-curly-spacing": "off",
      "@stylistic/template-tag-spacing": "off",
      "@stylistic/wrap-iife": "off",
      "@stylistic/wrap-regex": "off",
      "@stylistic/yield-star-spacing": "off",
      "@stylistic/member-delimiter-style": "off",
      "@stylistic/type-annotation-spacing": "off",
      "@stylistic/jsx-child-element-spacing": "off",
      "@stylistic/jsx-closing-bracket-location": "off",
      "@stylistic/jsx-closing-tag-location": "off",
      "@stylistic/jsx-curly-newline": "off",
      "@stylistic/jsx-curly-spacing": "off",
      "@stylistic/jsx-equals-spacing": "off",
      "@stylistic/jsx-first-prop-new-line": "off",
      "@stylistic/jsx-indent": "off",
      "@stylistic/jsx-indent-props": "off",
      "@stylistic/jsx-max-props-per-line": "off",
      "@stylistic/jsx-newline": "off",
      "@stylistic/jsx-one-expression-per-line": "off",
      "@stylistic/jsx-props-no-multi-spaces": "off",
      "@stylistic/jsx-tag-spacing": "off",
      "@stylistic/jsx-wrap-multilines": "off",
      "@stylistic/indent-binary-ops": "off",
      "@stylistic/type-generic-spacing": "off",
      "@stylistic/type-named-tuple-spacing": "off",
    },
  },
  ///////////////////////////////////////////////////////////////////
  // ALL JS+JSX FILES
  {
    name: "files:all-js/disable-type-checked",
    files: ["**/*.?([cm])js?(x)"],
    languageOptions: tsEslint.configs.disableTypeChecked.languageOptions,
    rules: {
      ...eslintJS.configs.recommended.rules,
      // Do not use tsEslint.configs.eslintRecommended here for JS files
      ...tsEslint.configs.disableTypeChecked.rules,
      // Add import-plugin rules that TS won't cover for JS files:
      ...importPlugin.configs.recommended.rules,
      "import-x/no-named-as-default-member": "off",
      // jsdoc, stricter requirements when not using TypeScript
      ...jsdocPlugin.configs["flat/recommended"].rules,
      "jsdoc/require-param": "off", // Don't require jsdoc @param tags (yet)
      "jsdoc/tag-lines": "off", // Allow blank lines around jsdoc tags for readability
    },
  },
  ///////////////////////////////////////////////////////////////////
  // ALL CommonJS FILES (requires explicit .cjs or .cts extension)
  {
    name: "files:all-commonjs/disable-esm-rules",
    files: ["**/*.c[tj]s"],
    languageOptions: { globals: globals.commonjs },
    rules: {
      "@typescript-eslint/no-require-imports": "off",
    },
  },
  ///////////////////////////////////////////////////////////////////
  // TS+JS CONFIG FILES
  {
    name: "files:config-files/allow-unpublished-imports",
    files: [
      "eslint.config.js",
      "**/vite.*.ts",
      "**/vitest.*.ts",
      "**/codegen.ts",
    ],
    rules: {
      "n/no-process-env": "off",
      "@nx/enforce-module-boundaries": "off",
    },
  },
  ///////////////////////////////////////////////////////////////////
  // TS+JS NodeJS SCRIPTS
  {
    name: "files:nodejs-scripts/allow-script-utils",
    files: ["**/scripts/**/*", "tools/**/*"],
    rules: {
      "no-console": "off",
      "n/no-process-env": "off",
      "n/no-process-exit": "off",
    },
  },
  ///////////////////////////////////////////////////////////////////
  // REACT FILES
  /* TODO add config object for tsx files

  {
    languageOptions: {
      globals: {
        React: "readonly",
        ...globals.browser?
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      }
    },
    plugins: {
      "jsx-a11y": jsxA11yPlugin,
      react: reactPlugin,
    },
    rules: {
      ...jsxA11yPlugin.configs.recommended.rules,
      ...reactPlugin.configs.recommended.rules,
      "jsx-a11y/click-events-have-key-events": "off",
      "jsx-a11y/no-autofocus": "off",
      "jsx-a11y/no-static-element-interactions": "off",
      "react/jsx-uses-react": "warn",
      "react/jsx-uses-vars": "warn",
      "react/no-unescaped-entities": "off",
      "react/prop-types": "off",
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },

  */

  ///////////////////////////////////////////////////////////////////
  // TESTS AND MOCKS
  {
    name: "files:tests-and-mocks/base",
    files: ["**/*.test.ts?(x)", "**/tests/**/*", "**/__mocks__/**/*"],
    languageOptions: {
      globals: vitestPlugin.environments.env.globals,
    },
    plugins: {
      vitest: vitestPlugin,
    },
    rules: {
      ...vitestPlugin.configs.recommended.rules,
      "vitest/consistent-test-it": ["error", { fn: "test" }],
      "vitest/no-disabled-tests": "warn",
      "vitest/no-focused-tests": ["warn", { fixable: false }],
      "vitest/prefer-lowercase-title": ["error", { ignore: ["describe"] }],
      "vitest/prefer-to-be-truthy": "off",
      "vitest/prefer-to-be-falsy": "off",
      "vitest/valid-expect": "warn",
      "@typescript-eslint/no-confusing-void-expression": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unsafe-argument": "off",
      "@typescript-eslint/no-unsafe-assignment": "off",
      "@typescript-eslint/no-unsafe-member-access": "off",
    },
  },
  ///////////////////////////////////////////////////////////////////
  // BAN TEST/MOCK IMPORTS IN NON-TEST/MOCK FILES
  {
    name: "files:non-test-files/no-importing-from-tests-or-mocks",
    ignores: ["**/*.test.ts?(x)", "**/tests/**", "**/__mocks__/**"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              /* The dir-name patterns below don't end in / to catch both
              "foo/__mocks__/bar.ts" AND "foo/__mocks__" (no ending slash) */
              group: ["**/*.test.ts?(x)", "**/tests**", "**/__mocks__**"],
              message:
                "Test-related exports like mocks should only be imported in test-related files. " +
                "If this file is part of a test suite, please rename it to match the pattern *.test.*",
            },
          ],
        },
      ],
    },
  }
  ///////////////////////////////////////////////////////////////////
);
