/**
 * `x-ys-errorMessage` — human-readable messages keyed by validation keyword.
 *
 * Keys typically match JSON Schema assertion names (`required`, `minLength`,
 * `pattern`, …). Use `_` as a fallback for unmatched keywords.
 */
export type YsErrorMessage =
  | string
  | {
      /** Fallback message when no keyword-specific message matches. */
      _?: string;
      required?: string;
      type?: string;
      enum?: string;
      const?: string;
      minLength?: string;
      maxLength?: string;
      pattern?: string;
      format?: string;
      minimum?: string;
      maximum?: string;
      exclusiveMinimum?: string;
      exclusiveMaximum?: string;
      multipleOf?: string;
      minItems?: string;
      maxItems?: string;
      uniqueItems?: string;
      minProperties?: string;
      maxProperties?: string;
      additionalProperties?: string;
      dependentRequired?: string;
      /** Cross-validation / custom keyword messages. */
      [keyword: string]: string | undefined;
    };
