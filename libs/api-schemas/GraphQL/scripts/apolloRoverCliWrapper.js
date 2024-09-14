import { exec } from "node:child_process";
import { logger } from "@fixit-tools/script-utils/nodejs/logging.js";

/**
 * Executes a Rover CLI's graph command ("check" or "publish") in a child
 * process with the specified graph reference and schema file.
 * @param {"check"|"publish"} graphCmd The Rover graph cmd to execute.
 * @param {string} graphRef The graph reference to use in the Rover command (e.g. "myGraph@current").
 * @param {string} schemaFilePath The path to the schema file to use in the Rover command.
 */
const execRoverGraphCmd = (graphCmd, graphRef, schemaFilePath) => {
  exec(
    `npx rover graph ${graphCmd} ${graphRef} --schema ${schemaFilePath}`,
    (error, stdout) => {
      /* The Rover CLI redirects stderr to stdout, so on error, stdout contains
      the error message, and on success, stdout is a single whitespace char. */
      if (error) {
        logger.error(stdout);
        throw error;
      }
    }
  );
};

/**
 * This object contains methods which wrap [Rover CLI][cli-docs] commands
 * using NodeJS's {@link exec|child_process.exec()} builtin function.
 *
 * [cli-docs]: https://www.apollographql.com/docs/rover/
 */
export const apolloRoverCliWrapper = {
  /** `"rover graph ..."` command wrapper methods. */
  graph: {
    /**
     * Thin wrapper around the Rover CLI's ["graph check" command][cmd-docs].
     * @param {string} graphRef The graph reference to check (e.g. "myGraph@current").
     * @param {string} schemaFilePath The path to the schema file to check+lint.
     *
     * [cmd-docs]: https://www.apollographql.com/docs/rover/commands/graphs#graph-check
     */
    check: (graphRef, schemaFilePath) =>
      execRoverGraphCmd("check", graphRef, schemaFilePath),
    /**
     * Thin wrapper around the Rover CLI's ["graph publish" command][cmd-docs].
     * @param {string} graphRef The graph reference to publish (e.g. "myGraph@current").
     * @param {string} schemaFilePath The path to the schema file to publish.
     *
     * [cmd-docs]: https://www.apollographql.com/docs/rover/commands/graphs#graph-publish
     */
    publish: (graphRef, schemaFilePath) =>
      execRoverGraphCmd("publish", graphRef, schemaFilePath),
  },
};
