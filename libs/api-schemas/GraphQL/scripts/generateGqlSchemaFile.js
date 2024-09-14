import { writeFile } from "node:fs/promises";
import { resolve as pathResolve } from "node:path";
import { logger, getTmpDir } from "@fixit-tools/script-utils";
import { mergeTypeDefs } from "@graphql-tools/merge";
import { print } from "graphql";
import { apolloRoverCliWrapper } from "./apolloRoverCliWrapper.js";
import { typeDefs } from "../typeDefs/index.js";

/**
 * Generates a GraphQL schema file from the Fixit GQL schema type definitions.
 * The schema is then optionally validated using Apollo's Rover CLI, and finally
 * the absolute path to the schema file is returned.
 *
 * @param {"fixit@current"|"fixit@staging"|"fixit@prod"} graphRef The relevant graph ref.
 * @param {Object} [fnConfigs] Optional function configs.
 * @param {string} [fnConfigs.targetDir] The dir where the file should be saved (defaults to a tmp dir).
 * @param {boolean} [fnConfigs.shouldValidate] Whether to validate the resultant schema (default: false).
 * @returns {Promise<string>} The absolute path to the generated schema file.
 */
export const generateGqlSchemaFile = async (
  graphRef,
  { targetDir, shouldValidate } = {}
) => {
  // The type-defs are exported as an array of GraphQL-AST-node strings
  const typeDefsMerged = mergeTypeDefs(typeDefs);

  let sdlString = print(typeDefsMerged);

  // #region [SDL Formatting] ###################################################
  /**
   *  Before writing the SDL to disk, the string is formatted as follows:
   *
   *  1. Single-double-quote docstring boundaries are converted to triple-double-quotes.
   *  2. Single-line docstrings longer than 70 characters are line-wrapped.
   *  3. Docstrings which are immediately preceded by a field definition on the line
   *     above are prefixed by a newline to ensure an empty line exists between the two.
   *  4. The root 'schema' block is removed.
   *
   *  Why do this? To ensure the SDL is formatted in the same manner as if it were
   *  fetched/downloaded from Apollo Studio, thereby ensuring consistency and making
   *  it easier to compare/diff the schema from one version to the next.
   */

  // Regex op 1: convert all double-quote docstring boundaries to triple-double-quotes.
  //   ^            Asserts position at the start of a line.
  //   (\u0020*?)   The first group captures any leading space chars before a docstring.
  //   "            Matches exactly one double quote character.
  //   ([^"\n]+?)   The second group captures the text between the double-quotes.
  //   "            Matches exactly one double quote character.
  //   $            Asserts position at the end of a line.
  sdlString = sdlString.replaceAll(/^(\u0020*?)"([^"\n]+?)"$/gm, '$1"""$2"""');

  // Regex op 2: line-wrap single-line docstrings longer than 70 characters.
  //   ^                Asserts position at the start of a line.
  //   (\u0020*?)       The first group captures any leading whitespace before a docstring.
  //   """              Matches exactly three double quote characters.
  //   ([^"\n]{70,}?)   The second group captures a single line of text that's 70+ chars long.
  //   """              Matches exactly three double quote characters.
  //   $                Asserts position at the end of a line.
  sdlString = sdlString.replaceAll(
    /^(\u0020*?)"""([^"\n]{70,}?)"""$/gm,
    '$1"""\n$1$2\n$1"""'
  );

  // Regex op 3: ensure exactly 1 empty line exists between docstrings and preceding field defs.
  //   (?<=:\u0020[a-zA-Z0-9=![\]\u0020]+?\n)   Positive lookbehind for a field definition (e.g. 'field: [Type!]').
  //   (^\u0020*?"""[^"]+)                     Captures a docstring.
  sdlString = sdlString.replaceAll(
    /(?<=:\u0020[a-zA-Z0-9=![\]\u0020]+?\n)(^\u0020*?"""[^"]+)/gm,
    "\n$1"
  );

  // Regex op 4: remove the root 'schema' block
  //   \n^schema\u0020{[^]*   Matches the 'schema' block and everything after it.
  sdlString = sdlString.replace(/\n^schema\u0020{[^]*/m, "");
  // #endregion

  // Set a default target dir if none was provided
  targetDir ??= await getTmpDir();

  const schemaFilePath = pathResolve(targetDir, `${graphRef}.graphql`);

  logger.debug(`Generating GraphQL schema file ...
    Schema: ${graphRef}
    File:   ${schemaFilePath}`);

  await writeFile(schemaFilePath, sdlString);

  if (shouldValidate) {
    logger.debug(`Validating the GraphQL schema for graph "${graphRef}" ...`);

    apolloRoverCliWrapper.graph.check(graphRef, schemaFilePath);

    // If the `rover graph check` cmd doesn't throw an error, the schema is valid.
    logger.debug("The GraphQL schema is valid! 🎉");
  }

  return schemaFilePath;
};
