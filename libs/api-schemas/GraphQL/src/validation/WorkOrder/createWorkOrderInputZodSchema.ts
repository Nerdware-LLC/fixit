import { z as zod } from "zod";
import { UserIDGraphQLScalar } from "@fixit/api-schemas/GraphQL/scalars/UserID.js";
import { workOrderZodSchema } from "./workOrderZodSchema.js";
import { createChecklistItemInputZodSchema } from "../Checklist/createChecklistItemInputZodSchema.js";
import { locationInputZodSchema } from "../Location/locationInputZodSchema.js";
import { CreateWorkOrderInputSchema as gend_CreateWorkOrderInputSchema } from "../__generated__.zodSchemas.js";
import { getStringTransformer } from "../helpers/getStringTransformer.js";
import type { CreateWorkOrderInput } from "@fixit/api-schemas/GraphQL/types";
import type { ZodObjectWithShape } from "@fixit/zod-helpers/types";

/**
 * Zod schema for {@link CreateWorkOrderInput} objects.
 */
export const createWorkOrderInputZodSchema: ZodObjectWithShape<CreateWorkOrderInput> =
  gend_CreateWorkOrderInputSchema.extend({
    assignedToUserID: gend_CreateWorkOrderInputSchema.shape.assignedToUserID.transform(
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
