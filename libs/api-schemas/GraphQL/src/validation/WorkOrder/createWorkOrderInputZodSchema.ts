import { z as zod } from "zod";
import { UserIDGraphQLScalar } from "@fixit/api-schemas/GraphQL/scalars/UserID.js";
import { workOrderZodSchema } from "./workOrderZodSchema.js";
import { createChecklistItemInputZodSchema } from "../Checklist/createChecklistItemInputZodSchema.js";
import { locationInputZodSchema } from "../Location/locationInputZodSchema.js";
import { CreateWorkOrderInputSchema as getGenerated_CreateWorkOrderInputSchema } from "../__generated__.zodSchemas.js";
import { getStringTransformer } from "../helpers.js";
import type { CreateWorkOrderInput } from "@fixit/api-schemas/GraphQL/types";
import type { ZodObjectWithShape } from "@fixit/zod-helpers/types";

const baseSchema = getGenerated_CreateWorkOrderInputSchema();

/**
 * Zod schema for {@link CreateWorkOrderInput} objects.
 */
export const createWorkOrderInputZodSchema: ZodObjectWithShape<CreateWorkOrderInput> =
  baseSchema.extend({
    assignedToUserID: baseSchema.shape.assignedToUserID.transform(
      getStringTransformer({
        fieldDescription: `user ID for field "assignedTo"`,
        sanitize: UserIDGraphQLScalar.sanitize,
        isValid: UserIDGraphQLScalar.isValid,
      })
    ),
    checklist: zod.array(createChecklistItemInputZodSchema).nullish(),
    contractorNotes: workOrderZodSchema.shape.contractorNotes,
    description: workOrderZodSchema.shape.description,
    entryContact: workOrderZodSchema.shape.entryContact,
    entryContactPhone: workOrderZodSchema.shape.entryContactPhone,
    location: locationInputZodSchema,
  });
