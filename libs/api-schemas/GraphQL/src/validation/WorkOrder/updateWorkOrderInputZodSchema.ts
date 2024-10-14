import { z as zod } from "zod";
import { createWorkOrderInputZodSchema } from "./createWorkOrderInputZodSchema.js";
import { workOrderZodSchema } from "./workOrderZodSchema.js";
import { updateChecklistItemInputZodSchema } from "../Checklist/updateChecklistItemInputZodSchema.js";
import { locationInputZodSchema } from "../Location/locationInputZodSchema.js";
import { UpdateWorkOrderInputSchema as gend_UpdateWorkOrderInputSchema } from "../__generated__.zodSchemas.js";
import type { UpdateWorkOrderInput } from "@fixit/api-schemas/GraphQL/types";
import type { ZodObjectWithShape } from "@fixit/zod-helpers/types";

/**
 * Zod schema for {@link UpdateWorkOrderInput} objects.
 */
export const updateWorkOrderInputZodSchema: ZodObjectWithShape<UpdateWorkOrderInput> =
  gend_UpdateWorkOrderInputSchema.extend({
    assignedToUserID: createWorkOrderInputZodSchema.shape.assignedToUserID,
    checklist: zod.array(updateChecklistItemInputZodSchema).nullish(),
    contractorNotes: workOrderZodSchema.shape.contractorNotes,
    description: workOrderZodSchema.shape.description,
    entryContact: workOrderZodSchema.shape.entryContact,
    entryContactPhone: workOrderZodSchema.shape.entryContactPhone,
    location: locationInputZodSchema.nullish(),
  });
