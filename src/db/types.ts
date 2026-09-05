/** Options accepted by `Database.query`. */
export interface QueryOptions {
  /** abort the query after this many milliseconds. */
  timeoutMs?: number;
  /** route to the read replica. */
  readonly?: boolean;
}
