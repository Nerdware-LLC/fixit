/**
 * Validates the script execution context:
 *
 * - Ensures the CWD is the monorepo root.
 *
 * @returns {string} The absolute path of the CWD, if valid.
 * @throws {Error} If the CWD is not the monorepo root.
 */
export const validateExecContext = () => {
  const cwd = process.cwd();

  // Ensure CWD is the monorepo root:
  if (!cwd.endsWith("/fixit"))
    throw new Error("This script must be executed from the monorepo root.");

  return cwd;
};
