import { exec } from "node:child_process";
import { mkdtemp } from "node:fs/promises";
import {
  join as pathJoin,
  basename as pathBasename,
  resolve as pathResolve,
} from "node:path";
import { logger } from "./logging.js";

/**
 * Creates a tmp dir in the CWD and returns the path to the created tmp dir.
 *
 * > Unless the `DEBUG_MODE` env var is set to a truthy value, a process-exit
 * > handler is set up to remove the tmp dir and its contents on script exit.
 *
 * @returns {Promise<string>} The path to the created tmp dir.
 */
export const getTmpDir = async () => {
  /* For debugging purposes, use the init script filename to set the tmpdir prefix.
  For example, `node fooScript.js` would yield the tmpdir prefix "tmp.fooScript". */
  const initScriptFilenameWithoutExt =
    pathBasename(process.argv[1]).replace(/(?<=\.)[a-z]{2,4}$/, ""); // prettier-ignore

  const tmpDirPrefix = `tmp.${initScriptFilenameWithoutExt}`;

  const tmpDir = await mkdtemp(pathJoin(process.cwd(), tmpDirPrefix));

  // On exit, remove the tmp dir and its contents unless in debug mode
  process.on("exit", async () => {
    if (process.env.DEBUG_MODE) {
      logger.debug(`Debug mode enabled. Not removing tmp dir ${tmpDir}`);
      return;
    }

    logger.debug("Cleaning up tmp resources ...");

    // Safety checks before invoking GNU rm:
    //    1. Ensure process.cwd() is not root.
    //    2. Ensure tmpDir is a child dir of CWD.
    // If any of these checks fail, abort the cleanup.
    if (
      process.cwd() === "/" ||
      !tmpDir.startsWith(process.cwd()) ||
      tmpDir !== pathResolve(process.cwd(), pathBasename(tmpDir))
    ) {
      logger.error(
        "Aborting cleanup — tmp resources are not in the expected location."
      );
      return;
    }

    logger.debug(`Removing "${tmpDir}" ...`);

    // Neither sync/async `fs.rm` worked here for some reason (dirs were not removed)
    await exec(`rm -rf ${tmpDir}`, (error) => {
      if (error) {
        logger.error(`Failed to remove tmp dir "${tmpDir}". Error:`, error);
      }
    });
  });

  return tmpDir;
};
