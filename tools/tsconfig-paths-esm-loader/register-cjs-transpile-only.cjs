const { register } = require("node:module");
const { pathToFileURL } = require("node:url");

register(
  "@fixit-tools/tsconfig-paths-esm-loader/resolve/ts-node-esm-transpile-only",
  pathToFileURL("./")
);
