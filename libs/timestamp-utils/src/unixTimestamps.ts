/**
 * Converts a Unix timestamp (<-- _**seconds**_) into a `Date` object.
 */
export const unixTimestampToDate = (unix: number) => new Date(unix * 1000);

/**
 * Regex pattern for validating Unix timestamps of either 9 or 10 digits. The first
 * digit must be a non-zero integer. The 9-10 digit restriction results in the date
 * range shown below, which suits the needs of this application better than a more
 * generalized Unix timestamp regex pattern.
 *
 * - Min: `100000000`  = `Saturday, Mar  3, 1973  9:46:40 am UTC`
 * - Max: `9999999999` = `Saturday, Nov 20, 2286 17:46:39 pm UTC`
 */
export const UNIX_TIMESTAMP_REGEX = /^[1-9]\d{8,9}$/;
