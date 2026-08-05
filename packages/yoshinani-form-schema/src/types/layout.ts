/**
 * Layout orientation for `x-ys-layout`.
 */
export type YsLayoutType = "vertical" | "horizontal";

/**
 * `x-ys-layout` — fieldset-oriented layout on the root (or group).
 * Nesting is out of scope for v0.1.0.
 */
export interface YsLayout {
  /** default: `"vertical"` */
  type?: YsLayoutType;
  /** Optional legend / small heading. */
  legend?: string;
  /** Form field UI identifiers (property names for now). */
  items: string[];
}
