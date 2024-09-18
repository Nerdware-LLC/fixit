import { hash, compare } from "bcrypt";

// eslint-disable-next-line n/no-process-env
const bcryptSaltRoundsEnvVar = process.env.BCRYPT_SALT_ROUNDS;

/**
 * ### passwordHasher
 *
 * This util is used to hash and validate passwords.
 */
export const passwordHasher = {
  /**
   * Get an encrypted hash of any string value.
   *
   * @param plainText The plaintext string to hash.
   * @param bcryptSaltRoundsArg
   * The number of rounds to use when hashing the password.
   * If not provided, the value of the `BCRYPT_SALT_ROUNDS` environment variable will be used.
   * If that is not set, a default of `10` will be used.
   * @returns A promise that resolves to the hashed string.
   */
  getHash: async (plainText: string, bcryptSaltRoundsArg?: number): Promise<string> => {
    return hash(plainText, bcryptSaltRoundsArg ?? bcryptSaltRoundsEnvVar ?? 10);
  },

  /**
   * Validate a plaintext string using an existing hash.
   *
   * @param plainText The plaintext string to validate.
   * @param passwordHash The hash to compare the plaintext string against.
   * @returns A promise that resolves to a boolean indicating whether the plaintext string matches the hash.
   */
  validate: async (plainText: string, passwordHash: string): Promise<boolean> => {
    return compare(plainText, passwordHash);
  },
} as const;
