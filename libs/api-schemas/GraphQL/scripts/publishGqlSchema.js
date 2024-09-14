import { logger, validateExecContext } from "@fixit-tools/script-utils";
import commandLineArgs from "command-line-args";
import { apolloRoverCliWrapper } from "./apolloRoverCliWrapper.js";
import { generateGqlSchemaFile } from "./generateGqlSchemaFile.js";

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
 *     --dryRun   If set, the script will not publish the schema to Apollo Studio.
 *
 * Set the `DEBUG_MODE` environment variable to `true` to log debug messages.
 */

logger.debug("Starting Script ...");

validateExecContext();

const { variant: variantScriptArg, dryRun: isDryRun } = commandLineArgs([
  { name: "variant", type: String },
  { name: "dryRun", type: Boolean, defaultValue: false },
]);

if (!/^(prod|staging|current)$/.test(variantScriptArg))
  throw new Error(
    `Invalid --variant script argument: "${variantScriptArg}".\n` +
      `The GraphQL graph variant must be one of "current", "staging", or "prod".`
  );

const graphRef = `fixit@${variantScriptArg}`;

const schemaFilePath = await generateGqlSchemaFile(graphRef, {
  shouldValidate: true,
});

if (isDryRun) {
  logger.info("Dry-run mode enabled. Skipping schema publication.");
  process.exit(0);
}

logger.debug(
  `Publishing the GraphQL schema for graph "${graphRef}" to Apollo Studio ...`
);

apolloRoverCliWrapper.graph.publish(graphRef, schemaFilePath);

logger.info(`GraphQL schema "${graphRef}" published successfully! 🚀`);
