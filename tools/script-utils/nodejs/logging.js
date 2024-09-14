import { basename } from "node:path";

const { DEBUG_MODE } = process.env;
const initScript = basename(process.argv[1]);

/**
 * NodeJS script logger util.
 */
export const logger = {
  error: (...args) => console.error(`[${initScript}] ERROR —`, ...args),
  info: (...args) => console.log(`[${initScript}]`, ...args),
  /**
   * Logs `msg` if the `DEBUG_MODE` env var is set to any truthy value.
   */
  debug: (...args) => {
    if (DEBUG_MODE) console.debug(`[${initScript}] DEBUG —`, ...args);
  },
};
