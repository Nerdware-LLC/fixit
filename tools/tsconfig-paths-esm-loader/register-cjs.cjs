const { register } = require("node:module");
const { pathToFileURL } = require("node:url");

register("tsconfig-paths-esm-loader/resolve/ts-node-esm", pathToFileURL("./"));
