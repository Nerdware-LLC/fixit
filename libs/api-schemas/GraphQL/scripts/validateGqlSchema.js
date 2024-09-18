import { logger, validateExecContext } from "@fixit-tools/script-utils";
import { generateGqlSchemaFile } from "./generateGqlSchemaFile.js";

/**
 * This script is used to validate the GraphQL schema.
 *
 * > NOTE: ts-node is required to run this script.
 *
 * USAGE
 *
 *     npx ts-node libs/api-schemas/GraphQL/scripts/validateGqlSchema.js
 *
 * Set the `DEBUG_MODE` environment variable to `true` to log debug messages.
 */

logger.debug("Starting Script ...");

validateExecContext();

await generateGqlSchemaFile("fixit@current", {
  shouldValidate: true,
  shouldCheckForBreakingChanges: false, // run `rover graph lint` instead of `rover graph check`
});
