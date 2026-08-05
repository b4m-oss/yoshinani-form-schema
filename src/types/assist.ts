/**
 * Assist message severity for UI styling.
 */
export type YsAssistSeverity = "info" | "tip" | "warning";

/**
 * Assist message placement relative to the field.
 */
export type YsAssistPlacement = "above" | "below" | "tooltip";

/**
 * Structured assist / help content shown alongside a field.
 */
export interface YsAssistMessage {
  /** Primary assist text (Japanese UX tip, help, or guidance). */
  message: string;
  severity?: YsAssistSeverity;
  placement?: YsAssistPlacement;
}

/**
 * `x-ys-assist` — non-error guidance shown near a field.
 *
 * Accepts a plain string or a structured object / list of messages.
 */
export type YsAssist =
  | string
  | YsAssistMessage
  | {
      /** Short help text under the label. */
      help?: string;
      /** Tip / best-practice note. */
      tip?: string;
      /** Concrete input example (separate from JSON Schema `examples`). */
      example?: string;
      /** Extra messages. */
      messages?: YsAssistMessage[];
    };
