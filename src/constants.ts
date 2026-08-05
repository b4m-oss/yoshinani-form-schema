/**
 * Extension property prefix for Yoshinani form schema keywords.
 * All custom keywords use kebab-case: `x-ys-*`.
 */
export const YS_PREFIX = "x-ys-" as const;

/**
 * Well-known `x-ys-*` keyword names (v0.1.0 core).
 */
export const YS_KEYWORDS = {
  version: "x-ys-version",
  layout: "x-ys-layout",
  assist: "x-ys-assist",
  errorMessages: "x-ys-error-messages",
  crossValidate: "x-ys-cross-validate",
} as const;

export type YsKeyword = (typeof YS_KEYWORDS)[keyof typeof YS_KEYWORDS];

export const YS_KEYWORD_LIST: readonly YsKeyword[] = Object.values(YS_KEYWORDS);

/** Current vocabulary version shipped by this package. */
export const YS_VOCABULARY_VERSION = "0.1.0" as const;
