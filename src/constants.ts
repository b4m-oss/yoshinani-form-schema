/**
 * Extension property prefix for Yoshinani form schema keywords.
 * All custom keywords use kebab-case: `x-ys-*`.
 */
export const YS_PREFIX = "x-ys-" as const;

/**
 * Well-known `x-ys-*` keyword names (through v0.5.0).
 */
export const YS_KEYWORDS = {
  version: "x-ys-version",
  layout: "x-ys-layout",
  assist: "x-ys-assist",
  errorMessages: "x-ys-error-messages",
  crossValidate: "x-ys-cross-validate",
  flow: "x-ys-flow",
  stepNav: "x-ys-step-nav",
  terms: "x-ys-terms",
  textCount: "x-ys-text-count",
  disableOnSubmit: "x-ys-disable-on-submit",
  file: "x-ys-file",
  array: "x-ys-array",
  postalLookup: "x-ys-postal-lookup",
  addressLookup: "x-ys-address-lookup",
  corporateNumberLookup: "x-ys-corporate-number-lookup",
} as const;

export type YsKeyword = (typeof YS_KEYWORDS)[keyof typeof YS_KEYWORDS];

export const YS_KEYWORD_LIST: readonly YsKeyword[] = Object.values(YS_KEYWORDS);

/** Current vocabulary version shipped by this package. */
export const YS_VOCABULARY_VERSION = "0.5.0" as const;
