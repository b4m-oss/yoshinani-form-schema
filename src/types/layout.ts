/**
 * Layout width tokens for form fields / groups.
 */
export type YsLayoutWidth =
  | "full"
  | "half"
  | "third"
  | "quarter"
  | "auto"
  | (string & {});

/**
 * `x-ys-layout` — presentation / layout hints for a schema node.
 *
 * These do not affect JSON Schema validation; form generators may use them
 * to arrange fields, groups, and widgets.
 */
export interface YsLayout {
  /** Relative order among siblings (lower comes first). */
  order?: number;
  /** Visual width hint within a row. */
  width?: YsLayoutWidth;
  /** Logical group id for clustered fields. */
  group?: string;
  /** Section / step identifier for multi-step forms. */
  section?: string;
  /** Hide from the UI while keeping the value in form data. */
  hidden?: boolean;
  /** Prefer inline (horizontal) arrangement. */
  inline?: boolean;
  /** Custom widget / control name for the renderer. */
  widget?: string;
  /** Column span in a 12-column-style grid. */
  colSpan?: number;
  /** Row span hint for textarea-like controls. */
  rowSpan?: number;
  /** Additional renderer-specific options. */
  options?: Record<string, unknown>;
}
