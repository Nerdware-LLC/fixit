import { resolve as resolveTS } from "ts-node/esm";
import { createResolveHook } from "./createResolveHook.js";

export const resolve = createResolveHook(resolveTS);

export { getFormat, load, transformSource } from "ts-node/esm";
