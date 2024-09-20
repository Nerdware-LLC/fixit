import { LambdaClient, InvokeCommand, type InvokeCommandInput } from "@aws-sdk/client-lambda";
import { safeJsonStringify } from "@nerdware/ts-type-safety-utils";
import { ENV } from "@/server/env.js";
import type { OverrideProperties, Except } from "type-fest";

const _lambdaClient = new LambdaClient({ region: ENV.AWS_REGION });

const _invoke = async ({
  InvocationType,
  FunctionName,
  Payload: payloadToSend,
  ...invokeCmdOpts
}: LambdaClientInvokeOpts) => {
  const { Payload: returnedPayload, ...rest } = await _lambdaClient.send(
    new InvokeCommand({
      InvocationType,
      FunctionName,
      Payload: Buffer.from(safeJsonStringify(payloadToSend)),
      ...invokeCmdOpts,
    })
  );

  return {
    Payload: returnedPayload ? JSON.parse(Buffer.from(returnedPayload).toString()) : null,
    ...rest, // rest: { $metadata, ExecutedVersion, StatusCode, FunctionError, LogResult }
  };
};

/**
 * Simple interface for invoking Lambda functions.
 */
export const lambdaClient = {
  /**
   * Invoke Lambda fn using asynchronous "Event" invocation.
   */
  invokeEvent: async (FunctionName, Payload, invokeOpts = {}) => {
    return _invoke({ InvocationType: "Event", FunctionName, Payload, ...invokeOpts });
  },
  /**
   * Invoke Lambda fn using synchronous "RequestResponse" invocation.
   */
  invokeRequestResponse: async (FunctionName, Payload, invokeOpts = {}) => {
    return _invoke({ InvocationType: "RequestResponse", FunctionName, Payload, ...invokeOpts });
  },
} as const satisfies Record<
  string,
  (
    lambdaFnName: LambdaClientInvokeOpts["FunctionName"],
    lambdaFnPayload: LambdaClientInvokeOpts["Payload"],
    invokeCmdOpts?: Except<InvokeCommandInput, "InvocationType" | "FunctionName" | "Payload">
  ) => ReturnType<typeof _invoke>
>;

export type FixitLambdaFnName = "PushNotificationService" | "SendWelcomeEmail";

export type LambdaClientInvokeOpts = OverrideProperties<
  InvokeCommandInput,
  {
    InvocationType: "Event" | "RequestResponse";
    FunctionName: FixitLambdaFnName;
    Payload: unknown;
  }
>;
