/**
 * `x-ys-file` — file upload constraints beyond plain JSON Schema.
 * Use `minItems` / `maxItems` for count limits.
 */
export interface YsFile {
  /** Max bytes per file. */
  maxSize?: number;
  /** Allowed MIME types. */
  accept?: string[];
  /** Whether to show previews. */
  preview?: boolean;
}
