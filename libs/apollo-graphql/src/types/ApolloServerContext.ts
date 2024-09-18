import type { BaseContext } from "@apollo/server";
import type { AuthTokenPayload } from "@fixit/api-schemas/OpenAPI/types";
import type { Request } from "express";

/**
 * The `context` object available to all ApolloServer resolvers and plugins.
 */
export type ApolloServerContext = BaseContext & {
  req: ApolloServerContextRequestFields;
  user: AuthTokenPayload;
};

/**
 * ApolloServer `context.req` — contains properties from the Express `req` object.
 */
export type ApolloServerContextRequestFields = Pick<
  Request<
    Record<string, string>, // req params
    unknown, //                res body
    Record<string, unknown> // req body
  >,
  "body" | "hostname" | "ip" | "ips" | "method" | "originalUrl" | "path" | "protocol" | "subdomains"
>;
