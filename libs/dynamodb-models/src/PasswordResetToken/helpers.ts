import { PW_RESET_TOKEN_SK_REGEX, PW_RESET_TOKEN_SK_PREFIX_STR } from "./regex.js";
import {
  createMapOfStringAttrHelpers,
  createHelpersForStrAttr,
  type MapOfStringAttrHelpers,
} from "../_common/attributeHelpers.js";
import { DELIMITER } from "../_common/delimiter.js";

const pwResetTokenSKattrHelpers = createHelpersForStrAttr("sk", {
  /** Validation regex for `PasswordResetToken.sk` compound attribute. */
  regex: PW_RESET_TOKEN_SK_REGEX,
  /** PasswordResetToken "sk" value formatter. */
  format: (token: string) => `${PW_RESET_TOKEN_SK_PREFIX_STR}${DELIMITER}${token}`,
});

export const passwordResetTokenModelHelpers = createMapOfStringAttrHelpers({
  sk: pwResetTokenSKattrHelpers,
  data: pwResetTokenSKattrHelpers, // PRT `data` attribute is currently equal to the `sk` attribute
}) satisfies MapOfStringAttrHelpers;
