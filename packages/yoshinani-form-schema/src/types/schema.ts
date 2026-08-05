import type { YsArray } from "./array.js";
import type { YsAssist } from "./assist.js";
import type { YsCrossValidate } from "./cross-validate.js";
import type { YsDisableOnSubmit } from "./disable-on-submit.js";
import type { YsErrorMessages } from "./error-messages.js";
import type { YsFile } from "./file.js";
import type { YsFlow } from "./flow.js";
import type {
  YsAddressLookup,
  YsCorporateNumberLookup,
  YsPostalLookup,
} from "./japan-lookup.js";
import type { YsLayout } from "./layout.js";
import type { YsStepNav } from "./step-nav.js";
import type { YsTerms } from "./terms.js";
import type { YsTextCount } from "./text-count.js";
import type { YsVersion } from "./version.js";

export type { YsArray } from "./array.js";
export type { YsAssist } from "./assist.js";
export type { YsCrossValidate } from "./cross-validate.js";
export type { YsDisableOnSubmit } from "./disable-on-submit.js";
export type { YsErrorMessages } from "./error-messages.js";
export type { YsFile } from "./file.js";
export type { YsFlow, YsFlowScreen } from "./flow.js";
export type {
  YsAddressLookup,
  YsCorporateNumberLookup,
  YsPostalLookup,
} from "./japan-lookup.js";
export type { YsLayout, YsLayoutType } from "./layout.js";
export type { YsStepNav } from "./step-nav.js";
export type { YsTerms } from "./terms.js";
export type { YsTextCount } from "./text-count.js";
export type { YsVersion } from "./version.js";

/**
 * Yoshinani extension bag (through v0.5.1) that may appear on schema nodes.
 */
export interface YsExtensions {
  "x-ys-version"?: YsVersion;
  "x-ys-layout"?: YsLayout;
  "x-ys-assist"?: YsAssist;
  "x-ys-error-messages"?: YsErrorMessages;
  "x-ys-cross-validate"?: YsCrossValidate;
  "x-ys-flow"?: YsFlow;
  "x-ys-step-nav"?: YsStepNav;
  "x-ys-terms"?: YsTerms;
  "x-ys-text-count"?: YsTextCount;
  "x-ys-disable-on-submit"?: YsDisableOnSubmit;
  "x-ys-file"?: YsFile;
  "x-ys-array"?: YsArray;
  "x-ys-postal-lookup"?: YsPostalLookup;
  "x-ys-address-lookup"?: YsAddressLookup;
  "x-ys-corporate-number-lookup"?: YsCorporateNumberLookup;
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
