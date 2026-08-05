import type { YsAssist } from "./assist.js";
import type { YsCrossValidate } from "./cross-validate.js";
import type { YsErrorMessages } from "./error-messages.js";
import type { YsLayout } from "./layout.js";
import type { YsVersion } from "./version.js";

export type { YsAssist } from "./assist.js";
export type { YsCrossValidate } from "./cross-validate.js";
export type { YsErrorMessages } from "./error-messages.js";
export type { YsLayout, YsLayoutType } from "./layout.js";
export type { YsVersion } from "./version.js";

/**
 * Yoshinani extension bag (v0.1.0 core) that may appear on schema nodes.
 */
export interface YsExtensions {
  "x-ys-version"?: YsVersion;
  "x-ys-layout"?: YsLayout;
  "x-ys-assist"?: YsAssist;
  "x-ys-error-messages"?: YsErrorMessages;
  "x-ys-cross-validate"?: YsCrossValidate;
}

/**
 * Minimal JSON Schema object shape extended with `x-ys-*` keywords.
 */
export type YsJsonSchema = Record<string, unknown> &
  YsExtensions & {
    type?: string | string[];
    title?: string;
    properties?: Record<string, YsJsonSchema>;
    required?: string[];
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
