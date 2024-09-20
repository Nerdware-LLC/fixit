import { resolve as pathResolve } from "node:path";
import { pathToFileURL } from "node:url";
import * as tsConfigPaths from "tsconfig-paths";

// See if the TS_NODE_PROJECT env var is set
const { TS_NODE_PROJECT } = process.env;

const absPathToDirWithTsConfig = TS_NODE_PROJECT
  ? pathResolve(process.cwd(), TS_NODE_PROJECT)
  : pathResolve();

const { resultType, absoluteBaseUrl, paths } = tsConfigPaths.loadConfig(
  absPathToDirWithTsConfig
);

if (resultType !== "success") throw new Error("Failed to load tsconfig.");

// This fn can resolve path aliases defined in the tsconfig
const matchPath = tsConfigPaths.createMatchPath(absoluteBaseUrl, paths);

/**
 * @typedef {import('ts-node').NodeLoaderHooksAPI2.ResolveHook} ResolveHook
 */

/**
 * This function creates a [NodeJS `resolve` hook][node-resolve-docs] that wraps
 * the `resolve` function from `ts-node/esm`. It resolves specifiers using the
 * `matchPath` function from `tsconfig-paths` before passing them to `ts-node`.
 *
 * ## `tsconfig` File Location
 *
 * By default, the `tsconfig` file is expected to be in the current working
 * directory. If the `tsconfig` file is in a different directory, you can set
 * the **`TS_NODE_PROJECT`** environment variable to the relative path to the
 * directory containing the `tsconfig` file.
 *
 * [node-resolve-docs]: https://nodejs.org/docs/latest-v20.x/api/module.html#resolvespecifier-context-nextresolve
 *
 * @param {ResolveHook} tsNodeEsmResolve The `resolve` function from `ts-node/esm`.
 * @returns {ResolveHook} A custom `resolve` hook that resolves path aliases.
 */
export const createResolveHook = (tsNodeEsmResolve) => {
  return function (specifier, ctx, defaultResolve) {
    // See if the specifier ends with .js
    const specifierHasJsExtension = specifier.endsWith(".js");

    // Pass `specifier` to `matchPath` without any .js ext, if it has one
    const match = matchPath(
      specifierHasJsExtension
        ? specifier.substring(0, specifier.length - 3)
        : specifier
    );

    // Get the fileUrl, re-adding .js ext to `match` if the specifier had it
    const fileUrl = match
      ? pathToFileURL(specifierHasJsExtension ? `${match}.js` : match).href
      : specifier;

    return tsNodeEsmResolve(fileUrl, ctx, defaultResolve);
  };
};
