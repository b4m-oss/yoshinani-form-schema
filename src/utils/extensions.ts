import { YS_KEYWORD_LIST, YS_PREFIX, type YsKeyword } from "../constants.js";
import type {
  YsAssist,
  YsCrossValidation,
  YsCrossValidationRule,
  YsErrorMessage,
  YsExtensions,
  YsJsonSchema,
  YsLayout,
} from "../types/index.js";

/**
 * Returns true when `key` is a Yoshinani extension keyword (`x-ys-*`).
 */
export function isYsKeyword(key: string): key is YsKeyword | `x-ys-${string}` {
  return key.startsWith(YS_PREFIX);
}

/**
 * Returns true when `key` is one of the well-known Yoshinani keywords.
 */
export function isKnownYsKeyword(key: string): key is YsKeyword {
  return (YS_KEYWORD_LIST as readonly string[]).includes(key);
}

/**
 * Pick only `x-ys-*` properties from a schema node.
 */
export function getYsExtensions(schema: YsJsonSchema | null | undefined): YsExtensions {
  if (!schema || typeof schema !== "object") {
    return {};
  }

  const extensions: YsExtensions = {};

  if ("x-ys-layout" in schema && schema["x-ys-layout"] !== undefined) {
    extensions["x-ys-layout"] = schema["x-ys-layout"] as YsLayout;
  }
  if ("x-ys-assist" in schema && schema["x-ys-assist"] !== undefined) {
    extensions["x-ys-assist"] = schema["x-ys-assist"] as YsAssist;
  }
  if ("x-ys-errorMessage" in schema && schema["x-ys-errorMessage"] !== undefined) {
    extensions["x-ys-errorMessage"] = schema["x-ys-errorMessage"] as YsErrorMessage;
  }
  if (
    "x-ys-crossValidation" in schema &&
    schema["x-ys-crossValidation"] !== undefined
  ) {
    extensions["x-ys-crossValidation"] = schema[
      "x-ys-crossValidation"
    ] as YsCrossValidation;
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

/**
 * Normalize `x-ys-crossValidation` into an array of rules.
 */
export function normalizeCrossValidation(
  value: YsCrossValidation | undefined,
): YsCrossValidationRule[] {
  if (value == null) {
    return [];
  }
  return Array.isArray(value) ? value : [value];
}
