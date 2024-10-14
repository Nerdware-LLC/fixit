import type { JsonValue } from "type-fest";

declare global {
  /**
   * This declaration adds a `JSON.parse` overload that replaces `any` with {@link JsonValue}.
   */
  interface JSON {
    parse(
      text: JsonValue,
      reviver?: (this: typeof JSON, key: string, value: unknown) => unknown
    ): JsonValue;
  }
}
