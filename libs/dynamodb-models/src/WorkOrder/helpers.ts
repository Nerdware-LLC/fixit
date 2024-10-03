import { getRandomUUIDv4 } from "@fixit/uuid";
import {
  WO_SK_REGEX,
  WO_SK_PREFIX_STR,
  WO_CHECKLIST_ITEM_ID_REGEX,
  WO_CHECKLIST_ITEM_ID_INFIX_STR,
} from "./regex.js";
import { createMapOfStringAttrHelpers } from "../_common/attributeHelpers.js";
import { DELIMITER } from "../_common/delimiter.js";

export const workOrderModelHelpers = createMapOfStringAttrHelpers({
  id: {
    regex: WO_SK_REGEX,
    /** WorkOrder "id" value formatter. */
    format: (createdByUserID: string) => {
      return `${WO_SK_PREFIX_STR}${DELIMITER}${createdByUserID}${DELIMITER}${getRandomUUIDv4()}`;
    },
    /** Sanitizes a WorkOrder ID value. */
    sanitize: (str: string) => str.replace(/[^a-zA-Z0-9_@#-]/g, ""), // handle chars, UUID chars, and the delimeter
  },
  checklistItemID: {
    regex: WO_CHECKLIST_ITEM_ID_REGEX,
    /** WorkOrder checklist item "id" value formatter. */
    format: (woID: string) => {
      return `${woID}${DELIMITER}${WO_CHECKLIST_ITEM_ID_INFIX_STR}${DELIMITER}${getRandomUUIDv4()}`;
    },
  },
});
