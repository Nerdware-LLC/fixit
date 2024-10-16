import { getTypeSafeError } from "@nerdware/ts-type-safety-utils";
import { UserInputError } from "@fixit/http-errors";
import type {
  Paths,
  RestApiEndpoint,
  RestApiGETendpoint,
  RestApiPOSTendpoint,
  RestApiRequestBodyByPath,
  RestApiResponseByPath,
} from "@fixit/api-schemas/OpenAPI/types";
import type { ZodObjectWithShape } from "@fixit/zod-helpers/types";
import type { RequestHandler } from "express";
import type { SetReturnType, UndefinedOnPartialDeep } from "type-fest";
import type { ZodRecord, ZodEffects } from "zod";

/**
 * An API `RequestHandler` with `req` and `res` typed to match the {@link RestApiEndpoint} param.
 */
export type ApiRequestHandler<Path extends RestApiEndpoint> = SetReturnType<
  RequestHandler<
    Paths[Path]["parameters"]["path"] extends object
      ? Paths[Path]["parameters"]["path"]
      : Record<string, string>,
    RestApiResponseByPath[Path],
    Path extends keyof RestApiRequestBodyByPath ? RestApiRequestBodyByPath[Path] : never,
    Paths[Path]["parameters"]["query"] extends object
      ? Paths[Path]["parameters"]["query"]
      : Record<string, string>,
    Record<string, unknown>
  >,
  void | Promise<void>
>;

/**
 * The `reqBodyZodSchema` param type for the {@link apiController} function.
 */
type ReqBodyZodSchemaParam<Path extends RestApiPOSTendpoint> =
  RestApiRequestBodyByPath[Path] extends infer ReqBody
    ? ReqBody extends Record<string, unknown>
      ?
          | ZodObjectWithShape<UndefinedOnPartialDeep<ReqBody>>
          | ZodEffects<ZodObjectWithShape<UndefinedOnPartialDeep<ReqBody>>>
      : ZodRecord
    : never;

/**
 * Parameters of the {@link apiController} function.
 */
type ApiControllerParams<Path extends RestApiEndpoint> = Path extends RestApiPOSTendpoint
  ? [ReqBodyZodSchemaParam<Path>, ApiRequestHandler<Path>]
  : [ApiRequestHandler<Path>];

/**
 * Call signature overloads for the {@link apiController} function.
 */
type ApiController = {
  // GET endpoint signature:
  <Path extends RestApiGETendpoint>(controller: ApiRequestHandler<Path>): ApiRequestHandler<Path>;
  // POST endpoint signature:
  <Path extends RestApiPOSTendpoint>(
    reqBodyZodSchema: ReqBodyZodSchemaParam<Path>,
    controller: ApiRequestHandler<Path>
  ): ApiRequestHandler<Path>;
};

/**
 * This function creates an API controller with error handling and request body validation.
 */
export const ApiController: ApiController = <Path extends RestApiEndpoint>(
  ...args: ApiControllerParams<Path>
): ApiRequestHandler<Path> => {
  let controller: ApiRequestHandler<Path>;

  if (args.length === 1) {
    // GET endpoint:
    controller = args[0] as unknown as ApiRequestHandler<Path>;
  } else {
    // POST endpoint:

    // Get the Zod schema for the request body:
    const zodReqBodySchema = args[0];
    const controllerArg = args[1] as SetReturnType<RequestHandler, Promise<void>>;

    // Wrap controllerArg with req.body sanitization+validation logic:
    controller = async (req, res, next) => {
      try {
        const validatedReqBody = zodReqBodySchema.parse(req.body ?? {});

        req.body = validatedReqBody as Path extends keyof RestApiRequestBodyByPath
          ? RestApiRequestBodyByPath[Path]
          : never;

        await controllerArg(req, res, next);
      } catch (err) {
        next(
          new UserInputError(
            getTypeSafeError(err, {
              fallBackErrMsg: "One or more of the provided values are invalid",
            }).message
          )
        );
      }
    };
  }

  // Return the controller wrapped in a try-catch block for error handling:
  return async (req, res, next) => {
    try {
      await controller(req, res, next);
    } catch (err) {
      next(err);
    }
  };
};
