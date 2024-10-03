/**
 * A single piece of a larger regex pattern. Can be a `RegExp` object, a regex
 * pattern string, or a {@link RegexComponentConfig|config object} that includes
 * a regex pattern and a `required` flag.
 */
export type RegexComponent = RegExp | string | RegexComponentConfig;

/**
 * A config object defining a single component of a larger regex pattern.
 */
export type RegexComponentConfig = {
  regex: RegExp | string;
  required: boolean;
};
