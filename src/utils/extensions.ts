import { YS_KEYWORD_LIST, YS_PREFIX, type YsKeyword } from "../constants.js";
import type {
  YsAddressLookup,
  YsArray,
  YsAssist,
  YsCorporateNumberLookup,
  YsCrossValidate,
  YsDisableOnSubmit,
  YsErrorMessages,
  YsExtensions,
  YsFile,
  YsFlow,
  YsJsonSchema,
  YsLayout,
  YsPostalLookup,
  YsStepNav,
  YsTerms,
  YsTextCount,
  YsVersion,
} from "../types/index.js";

/**
 * Returns true when `key` is a Yoshinani extension keyword (`x-ys-*`).
 */
export function isYsKeyword(key: string): key is YsKeyword | `x-ys-${string}` {
  return key.startsWith(YS_PREFIX);
}

/**
 * Returns true when `key` is one of the well-known keywords (through v0.4.0).
 */
export function isKnownYsKeyword(key: string): key is YsKeyword {
  return (YS_KEYWORD_LIST as readonly string[]).includes(key);
}

/**
 * Pick only known `x-ys-*` properties from a schema node.
 */
export function getYsExtensions(
  schema: YsJsonSchema | null | undefined,
): YsExtensions {
  if (!schema || typeof schema !== "object") {
    return {};
  }

  const extensions: YsExtensions = {};

  if (schema["x-ys-version"] !== undefined) {
    extensions["x-ys-version"] = schema["x-ys-version"] as YsVersion;
  }
  if (schema["x-ys-layout"] !== undefined) {
    extensions["x-ys-layout"] = schema["x-ys-layout"] as YsLayout;
  }
  if (schema["x-ys-assist"] !== undefined) {
    extensions["x-ys-assist"] = schema["x-ys-assist"] as YsAssist;
  }
  if (schema["x-ys-error-messages"] !== undefined) {
    extensions["x-ys-error-messages"] = schema[
      "x-ys-error-messages"
    ] as YsErrorMessages;
  }
  if (schema["x-ys-cross-validate"] !== undefined) {
    extensions["x-ys-cross-validate"] = schema[
      "x-ys-cross-validate"
    ] as YsCrossValidate;
  }
  if (schema["x-ys-flow"] !== undefined) {
    extensions["x-ys-flow"] = schema["x-ys-flow"] as YsFlow;
  }
  if (schema["x-ys-step-nav"] !== undefined) {
    extensions["x-ys-step-nav"] = schema["x-ys-step-nav"] as YsStepNav;
  }
  if (schema["x-ys-terms"] !== undefined) {
    extensions["x-ys-terms"] = schema["x-ys-terms"] as YsTerms;
  }
  if (schema["x-ys-text-count"] !== undefined) {
    extensions["x-ys-text-count"] = schema["x-ys-text-count"] as YsTextCount;
  }
  if (schema["x-ys-disable-on-submit"] !== undefined) {
    extensions["x-ys-disable-on-submit"] = schema[
      "x-ys-disable-on-submit"
    ] as YsDisableOnSubmit;
  }
  if (schema["x-ys-file"] !== undefined) {
    extensions["x-ys-file"] = schema["x-ys-file"] as YsFile;
  }
  if (schema["x-ys-array"] !== undefined) {
    extensions["x-ys-array"] = schema["x-ys-array"] as YsArray;
  }
  if (schema["x-ys-postal-lookup"] !== undefined) {
    extensions["x-ys-postal-lookup"] = schema[
      "x-ys-postal-lookup"
    ] as YsPostalLookup;
  }
  if (schema["x-ys-address-lookup"] !== undefined) {
    extensions["x-ys-address-lookup"] = schema[
      "x-ys-address-lookup"
    ] as YsAddressLookup;
  }
  if (schema["x-ys-corporate-number-lookup"] !== undefined) {
    extensions["x-ys-corporate-number-lookup"] = schema[
      "x-ys-corporate-number-lookup"
    ] as YsCorporateNumberLookup;
  }

  return extensions;
}

/**
 * Read a single Yoshinani extension from a schema node.
 */
export function getYsExtension<K extends keyof YsExtensions>(
  schema: YsJsonSchema | null | undefined,
  keyword: K,
): YsExtensions[K] | undefined {
  if (!schema || typeof schema !== "object") {
    return undefined;
  }
  return schema[keyword];
}
