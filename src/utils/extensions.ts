import { YS_KEYWORD_LIST, YS_PREFIX, type YsKeyword } from "../constants.js";
import type {
  YsAssist,
  YsCrossValidate,
  YsErrorMessages,
  YsExtensions,
  YsJsonSchema,
  YsLayout,
  YsVersion,
} from "../types/index.js";

/**
 * Returns true when `key` is a Yoshinani extension keyword (`x-ys-*`).
 */
export function isYsKeyword(key: string): key is YsKeyword | `x-ys-${string}` {
  return key.startsWith(YS_PREFIX);
}

/**
 * Returns true when `key` is one of the well-known v0.1.0 keywords.
 */
export function isKnownYsKeyword(key: string): key is YsKeyword {
  return (YS_KEYWORD_LIST as readonly string[]).includes(key);
}

/**
 * Pick only known v0.1.0 `x-ys-*` properties from a schema node.
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
