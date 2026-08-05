/**
 * `x-ys-cross-validate` — declare related fields on the error-displaying field.
 * Validation logic itself is runtime-owned in v0.1.0.
 */
export interface YsCrossValidate {
  /** Identifiers of fields this rule depends on / compares against. */
  targets: string[];
}
