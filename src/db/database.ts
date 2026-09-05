/** The one place SQL actually runs. Everything goes through here. */
export interface Row {
  [column: string]: string | number | null;
}

const store = new Map<string, Row[]>();

export class Database {
  /** Run a query and return the rows. */
  query(sql: string): Row[] {
    const key = sql.trim().toLowerCase();
    return store.get(key) ?? [];
  }

  /** test seam */
  seed(sql: string, rows: Row[]): void {
    store.set(sql.trim().toLowerCase(), rows);
  }
}

export const db = new Database();
