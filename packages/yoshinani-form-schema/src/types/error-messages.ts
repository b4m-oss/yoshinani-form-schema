/**
 * `x-ys-error-messages` — display copy keyed by fixed condition IDs.
 *
 * Keys are JSON Schema assertion names (or cross-validate condition IDs).
 * Authors may change message text only; key vocabulary is not user-defined.
 */
export type YsErrorMessages = {
  [conditionId: string]: string;
};
