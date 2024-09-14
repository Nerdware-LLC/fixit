import { safeJsonStringify, getErrorMessage } from "@nerdware/ts-type-safety-utils";
import dayjs from "dayjs";
import type { ChalkInstance } from "chalk";

// eslint-disable-next-line n/no-process-env
const jsonStrSpaces = process.env.NODE_ENV === "production" ? 0 : 2;

/**
 * Returns a log message string.
 * - Log message format: `"[<label>] <msgPrefix?> <message>"`
 */
export const getLogMessage = ({
  label,
  input,
  msgPrefix,
  labelColor,
  msgColor,
}: GetLogMessageArgsProvidedByLoggerUtil & GetLogMessageArgsProvidedByHandler): string => {
  let formattedLabel = `[${label}]`;
  if (labelColor) formattedLabel = labelColor(formattedLabel);

  let formattedMsg = msgPrefix ? `${msgPrefix} ` : "";
  formattedMsg += getErrorMessage(input) || safeJsonStringify(input, null, jsonStrSpaces);
  if (msgColor) formattedMsg = msgColor(formattedMsg);

  return `${formattedLabel} ${formattedMsg}`;
};

/**
 * Returns a log message string with a timestamp.
 * - Log message format: `"[<timestamp>][<label>] <msgPrefix?> <message>"`
 * - Timestamp format: `"YYYY:MMM:D H:mm:ss.SSS"`
 */
export const getLogMessageWithTimestamp = ({
  label,
  input,
  msgPrefix,
  labelColor,
  msgColor,
}: GetLogMessageArgsProvidedByLoggerUtil & GetLogMessageArgsProvidedByHandler): string => {
  let timestamp = `[${dayjs().format("YYYY:MMM:D H:mm:ss.SSS")}]`;
  if (labelColor) timestamp = labelColor(timestamp);

  return `${timestamp}${getLogMessage({ label, input, msgPrefix, labelColor, msgColor })}`;
};

/**
 * Args provided to `getLogMessage` by `getLoggerUtil`.
 */
export type GetLogMessageArgsProvidedByLoggerUtil = {
  /** A purpose-related label used to differentiate log sources. */
  label: string;
  /** A [chalk](https://www.npmjs.com/package/chalk) color for dev env log labels. */
  labelColor?: ChalkInstance | undefined;
  /** A [chalk](https://www.npmjs.com/package/chalk) color for dev env logs (default: white). */
  msgColor?: ChalkInstance | undefined;
};

/**
 * Args provided to `getLogMessage` by `LoggerUtilFn` invocations.
 */
export type GetLogMessageArgsProvidedByHandler = {
  /** The raw input provided to a logger function. */
  input: unknown;
  /** An optional string to prefix the stringified log `input`. */
  msgPrefix?: string | undefined;
};
