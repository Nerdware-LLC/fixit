import { resolve as pathResolve } from "node:path";
import { logger, validateExecContext } from "@fixit-tools/script-utils";
import commandLineArgs from "command-line-args";
import { apolloRoverCliWrapper } from "./apolloRoverCliWrapper.js";

/**
 * This script is used to publish the GraphQL schema to Apollo Studio.
 *
 * > NOTE: ts-node is required to run this script.
 *
 * USAGE
 *
 *     npx ts-node libs/api-schemas/GraphQL/scripts/publishGqlSchema.js [OPTIONS]
 *
 * OPTIONS
 *     --variant  The GraphQL graph variant to publish (e.g., "--variant=current").
 *
 * Set the `DEBUG_MODE` environment variable to `true` to log debug messages.
 */

logger.debug("Starting Script ...");

const { cwd } = validateExecContext();

const { variant } = commandLineArgs([{ name: "variant", type: String }]);

if (!/^(prod|staging|current)$/.test(variant))
  throw new Error(
    `Invalid --variant script argument: "${variant}".\n` +
      `The GraphQL graph variant must be one of "current", "staging", or "prod".`
  );

const graphRef = `fixit@${variant}`;

const schemaFilePath = pathResolve(
  cwd,
  "libs/api-schemas/GraphQL/schema/__generated__.schema.graphqls"
);

logger.debug(`Linting GraphQL schema file "${schemaFilePath}" ...`);

apolloRoverCliWrapper.graph.lint(graphRef, schemaFilePath);

logger.debug(`Publishing GraphQL schema "${graphRef}" to Apollo Studio ...`);

apolloRoverCliWrapper.graph.publish(graphRef, schemaFilePath);

logger.info(`GraphQL schema "${graphRef}" published successfully! 🚀`);
