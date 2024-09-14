import { register } from "node:module";
import { pathToFileURL } from "node:url";

register("tsconfig-paths-esm-loader/resolve/ts-node-esm", pathToFileURL("./"));
