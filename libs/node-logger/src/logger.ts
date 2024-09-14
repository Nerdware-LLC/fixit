import chalk from "chalk";
import { getLoggerUtil } from "./getLoggerUtil.js";

/**
 * ### LOGGER
 *
 * This module exports a logger object with methods for logging based on standard log-levels.
 */
export const logger = {
  debug: getLoggerUtil({
    label: "DEBUG",
    msgColor: chalk.cyan,
    consoleMethod: "debug",
  }),
  info: getLoggerUtil({
    label: "INFO",
    msgColor: chalk.cyan,
    consoleMethod: "info",
  }),
  warn: getLoggerUtil({
    label: "WARN",
    msgColor: chalk.yellow,
  }),
  error: getLoggerUtil({
    label: "ERROR",
    msgColor: chalk.red,
    isEnabledInDeployedEnvs: true,
  }),
};
