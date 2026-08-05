/**
 * A single screen in `x-ys-flow.screens`.
 * `id` and `role` are required; other properties are open for runtimes.
 */
export type YsFlowScreen = {
  id: string;
  role: string;
  [key: string]: unknown;
};

/**
 * `x-ys-flow` — root-level screen model only (no placement).
 */
export interface YsFlow {
  screens: YsFlowScreen[];
}
