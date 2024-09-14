import { isError, isSafeInteger } from "@nerdware/ts-type-safety-utils";
import * as Sentry from "@sentry/node";
import chalk from "chalk";
import {
  getLogMessage,
  getLogMessageWithTimestamp,
  type GetLogMessageArgsProvidedByLoggerUtil,
  type GetLogMessageArgsProvidedByHandler,
} from "./getLogMessage.js";

/* eslint-disable no-console, n/no-process-env */

const IS_DEPLOYED_ENV = /^(production|staging)$/.test(process.env.NODE_ENV!);

/**
 * This function returns a logging function suited for the operating environment:
 *
 * - IN DEPLOYED ENVS (PRODUCTION/STAGING):
 *   - Error logs are always sent to CloudWatch and Sentry
 *   - Non-error logs:
 *     - Sent to CloudWatch and Sentry if `isEnabledInDeployedEnvs` is `true`
 *     - Ignored if `isEnabledInDeployedEnvs` is `false`
 *
 * - IN NON-DEPLOYED ENVS:
 *   - Error logs are always logged using `console.error`
 *   - Non-error logs are colorized and logged using `consoleMethod`
 *
 * > Errors are always logged in all environments regardless of
 *   `isEnabledInDeployedEnvs` which only applies to non-error logs.
 */
export const getLoggerUtil = ({
  label,
  isEnabledInDeployedEnvs = false,
  consoleMethod = console.log,
  msgColor = chalk.white,
  labelColor = msgColor.bold,
}: GetLoggerUtilParams): LoggerUtilFn => {
  // For consoleMethod, if a method name was provided, get the actual method from `console`
  if (typeof consoleMethod === "string") consoleMethod = console[consoleMethod];

  // `handleLogMessage` and `handleLogError` are env-dependent and govern where/how logs are sent
  const {
    handleLogMessage,
    handleLogError,
  }: { handleLogError: ErrorLoggerFn; handleLogMessage: LoggerUtilFn } = IS_DEPLOYED_ENV
    ? {
        handleLogError: (error, msgPrefix) => {
          // If error has a `statusCode` and the `statusCode` is under 500, ignore it.
          const statusCode = (error as { statusCode?: number }).statusCode;
          if (isSafeInteger(statusCode) && statusCode < 500) return;
          Sentry.captureException(error);
          // stderr goes to CloudWatch in deployed envs
          console.error(getLogMessage({ label, input: error, msgPrefix }));
        },
        handleLogMessage: isEnabledInDeployedEnvs
          ? (input, msgPrefix) => {
              Sentry.captureMessage(getLogMessageWithTimestamp({ label, input, msgPrefix }));
              // stdout goes to CloudWatch in deployed envs
              consoleMethod(getLogMessage({ label, input, msgPrefix }));
            }
          : () => {
              /* noop, function is disabled */
            },
      }
    : {
        handleLogError: (error, msgPrefix) => {
          console.error(
            getLogMessageWithTimestamp({ label, input: error, msgPrefix, labelColor, msgColor })
          );
        },
        handleLogMessage: (input, msgPrefix) => {
          consoleMethod(
            getLogMessageWithTimestamp({ label, input, msgPrefix, labelColor, msgColor })
          );
        },
      };

  // The returned fn simply checks if input is an Error, and calls handleLogMessage/handleLogError accordingly
  return (input, msgPrefix) => {
    if (isError(input)) handleLogError(input, msgPrefix);
    else handleLogMessage(input, msgPrefix);
  };
};

/**
 * {@link getLoggerUtil} params
 */
export type GetLoggerUtilParams = GetLogMessageArgsProvidedByLoggerUtil & {
  /**
   * Bool flag to enable logging non-errors in deployed envs: staging, prod
   */
  isEnabledInDeployedEnvs?: boolean;
  /**
   * The `console` method to use (default: `console.log`). You can provide a
   * method name or the method itself (e.g., `"log"` or `console.log`).
   */
  consoleMethod?: SupportedConsoleMethodName | (typeof console)[SupportedConsoleMethodName];
};

type SupportedConsoleMethodName = Extract<
  keyof typeof console,
  "log" | "info" | "debug" | "warn" | "error" | "trace"
>;

/**
 * This type reflects the signature of the function returned by {@link getLoggerUtil}.
 */
export type LoggerUtilFn = (
  input: GetLogMessageArgsProvidedByHandler["input"],
  msgPrefix?: GetLogMessageArgsProvidedByHandler["msgPrefix"]
) => void;

/**
 * Internal type for `handleLogError` fns used in {@link getLoggerUtil}.
 */
type ErrorLoggerFn = (
  error: unknown,
  msgPrefix?: GetLogMessageArgsProvidedByHandler["msgPrefix"]
) => void;
