import chalk from "chalk";
import { logger as nodeLogger, getLoggerUtil } from "@fixit/node-logger";

export const logger = {
  ...nodeLogger,
  server: getLoggerUtil({
    label: "SERVER",
    msgColor: chalk.magenta,
  }),
  security: getLoggerUtil({
    label: "SECURITY",
    msgColor: chalk.red.bold,
    labelColor: chalk.bgRed.black.bold,
    isEnabledInDeployedEnvs: true,
  }),
};
