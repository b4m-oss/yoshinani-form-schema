/**
 * Comparison operators for field-to-field assertions.
 */
export type YsCompareOp = "eq" | "neq" | "gt" | "gte" | "lt" | "lte";

/**
 * Assert that two field values compare as specified.
 */
export interface YsCompareAssert {
  op: YsCompareOp;
  /** JSON Pointer or dotted path (e.g. `/confirmEmail` or `confirmEmail`). */
  left: string;
  /** JSON Pointer, dotted path, or literal when `rightLiteral` is true. */
  right: string;
  /** When true, `right` is treated as a literal value encoded as JSON string. */
  rightLiteral?: boolean;
}

/**
 * Require a field when another field matches a condition.
 */
export interface YsRequiredIfAssert {
  op: "requiredIf";
  /** Field that becomes required. */
  field: string;
  if: {
    field: string;
    equals?: unknown;
    notEmpty?: boolean;
  };
}

/**
 * Validate the whole form (or a projected subset) against a JSON Schema.
 */
export interface YsSchemaAssert {
  op: "schema";
  /** JSON Schema object evaluated against form data. */
  schema: Record<string, unknown>;
}

export type YsCrossValidationAssert =
  | YsCompareAssert
  | YsRequiredIfAssert
  | YsSchemaAssert;

/**
 * A single cross-field validation rule.
 */
export interface YsCrossValidationRule {
  /** Stable rule id for debugging and i18n. */
  id?: string;
  /** Fields this rule reads (for dirty-checking / revalidation). */
  dependsOn?: string[];
  /** Fields that should display the error when the rule fails. */
  targets?: string[];
  /** Assertion evaluated against form data. */
  assert: YsCrossValidationAssert;
  /** Error message when the assertion fails. */
  message: string;
}

/**
 * `x-ys-crossValidation` — cross-field / multi-field validation rules.
 *
 * Typically attached to the root object schema.
 */
export type YsCrossValidation =
  | YsCrossValidationRule
  | YsCrossValidationRule[];
