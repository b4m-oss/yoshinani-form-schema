import type { YsAssist } from "./assist.js";
import type { YsCrossValidation } from "./cross-validation.js";
import type { YsErrorMessage } from "./error-message.js";
import type { YsLayout } from "./layout.js";

export type {
  YsAssist,
  YsAssistMessage,
  YsAssistPlacement,
  YsAssistSeverity,
} from "./assist.js";
export type {
  YsCompareAssert,
  YsCompareOp,
  YsCrossValidation,
  YsCrossValidationAssert,
  YsCrossValidationRule,
  YsRequiredIfAssert,
  YsSchemaAssert,
} from "./cross-validation.js";
export type { YsErrorMessage } from "./error-message.js";
export type { YsLayout, YsLayoutWidth } from "./layout.js";

/**
 * Yoshinani extension bag that may appear on any JSON Schema node.
 */
export interface YsExtensions {
  "x-ys-layout"?: YsLayout;
  "x-ys-assist"?: YsAssist;
  "x-ys-errorMessage"?: YsErrorMessage;
  "x-ys-crossValidation"?: YsCrossValidation;
}

/**
 * Minimal JSON Schema object shape extended with `x-ys-*` keywords.
 *
 * This is intentionally loose so consumers can intersect it with their own
 * JSON Schema typings (draft-07 / 2020-12 / etc.).
 */
export type YsJsonSchema = Record<string, unknown> &
  YsExtensions & {
    type?: string | string[];
    properties?: Record<string, YsJsonSchema>;
    items?: YsJsonSchema | YsJsonSchema[];
    additionalProperties?: boolean | YsJsonSchema;
    allOf?: YsJsonSchema[];
    anyOf?: YsJsonSchema[];
    oneOf?: YsJsonSchema[];
    if?: YsJsonSchema;
    then?: YsJsonSchema;
    else?: YsJsonSchema;
    $defs?: Record<string, YsJsonSchema>;
    definitions?: Record<string, YsJsonSchema>;
  };
