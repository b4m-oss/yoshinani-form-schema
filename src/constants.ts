/**
 * Extension property prefix for Yoshinani form schema keywords.
 * All custom keywords use the form `x-ys-*`.
 */
export const YS_PREFIX = "x-ys-" as const;

/**
 * Well-known `x-ys-*` keyword names.
 */
export const YS_KEYWORDS = {
  layout: "x-ys-layout",
  assist: "x-ys-assist",
  errorMessage: "x-ys-errorMessage",
  crossValidation: "x-ys-crossValidation",
} as const;

export type YsKeyword = (typeof YS_KEYWORDS)[keyof typeof YS_KEYWORDS];

export const YS_KEYWORD_LIST: readonly YsKeyword[] = Object.values(YS_KEYWORDS);
