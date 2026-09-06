/** The one place SQL actually runs. Everything goes through here. */
import type { QueryOptions } from "./types.js";

export interface Row {
  [column: string]: string | number | null;
}

const store = new Map<string, Row[]>();

export class Database {
  /** Run a query and return the rows. */
  query(sql: string, opts: QueryOptions = {}): Row[] {
    const key = sql.trim().toLowerCase();
    if (opts.timeoutMs !== undefined && opts.timeoutMs <= 0) return [];
    return store.get(key) ?? [];
  }

  /** test seam */
  seed(sql: string, rows: Row[]): void {
    store.set(sql.trim().toLowerCase(), rows);
  }
}

export const db = new Database();
