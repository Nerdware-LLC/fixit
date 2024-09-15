import { register } from "node:module";
import { pathToFileURL } from "node:url";

register(
  "@fixit-tools/tsconfig-paths-esm-loader/resolve/ts-node-esm",
  pathToFileURL("./")
);
