import { readFile, writeFile } from "node:fs/promises";
import { resolve as pathResolve } from "node:path";
import { pathToFileURL } from "node:url";
import { logger, validateExecContext } from "@fixit-tools/script-utils";
import openapiTS, { astToString } from "openapi-typescript";
import ts from "typescript";

/**
 * This script generates TypeScript types from the OpenAPI schema file.
 *
 * It uses the NodeJS API from openapi-typescript to fix `Date` types.
 * (Their CLI does not convert `format: date-time` values to `Date` types)
 *
 * Set the `DEBUG_MODE` environment variable to `true` to log debug messages.
 */

logger.debug("Starting Script ...");

const { cwd } = validateExecContext();

/** `<monorepo-root>/libs/api-schemas/OpenAPI` */
const oasDirPath = pathResolve(cwd, "libs/api-schemas/OpenAPI");

const schemaFilePath = pathResolve(oasDirPath, "schema/open-api-schema.yaml");

logger.debug(`Reading OpenAPI schema file: ${schemaFilePath}`);
const schemaFileContents = await readFile(schemaFilePath, "utf8");
const schemaVersionMatch = schemaFileContents.match(/(?<=\sversion:\s)[\w.-]+/);

// Ensure a 'version' was found:
if (!schemaVersionMatch)
  throw new Error(
    `Failed to find a 'version' field in the OpenAPI schema file (${schemaFilePath})`
  );

const schemaVersion = schemaVersionMatch[0];
logger.debug(`Found OpenAPI schema version: "${schemaVersion}"`);

const DATE = ts.factory.createTypeReferenceNode("Date");
const NULL = ts.factory.createLiteralTypeNode(ts.factory.createNull());
const UNION_DATE_NULL = ts.factory.createUnionTypeNode([DATE, NULL]);

const ast = await openapiTS(pathToFileURL(schemaFilePath), {
  transform(schemaObj) {
    if (schemaObj.format === "date-time") {
      return Array.isArray(schemaObj.type) && schemaObj.type.includes("null")
        ? UNION_DATE_NULL
        : DATE;
    }
  },
});

logger.debug(`Creating TS types from OAS schema ...`);

// Define the TS file content to write:
const tsFileContents = `\
/**
 * Fixit OpenAPI Schema Types
 *
 * DO NOT MAKE DIRECT CHANGES TO THIS FILE.
 *
 * This file was auto-generated using schema version: \`${schemaVersion}\`
 */

${astToString(ast)}`;

// The TS file in which to write the content:
const tsOutputFile = pathResolve(
  oasDirPath,
  "types/__codegen__/openApiSchemaTypes.ts"
);

logger.debug(`Writing TS output to file: ${tsOutputFile}`);
await writeFile(tsOutputFile, tsFileContents);

logger.debug(`Done.`);
