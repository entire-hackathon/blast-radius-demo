import { describe, expect, it } from "vitest";
import { Database } from "../src/db/database.js";

describe("Database.query", () => {
  it("returns seeded rows", () => {
    const database = new Database();
    database.seed("select 1", [{ n: 1 }]);
    expect(database.query("select 1")).toEqual([{ n: 1 }]);
  });

  it("returns nothing for a non-positive timeout", () => {
    const database = new Database();
    database.seed("select 1", [{ n: 1 }]);
    expect(database.query("select 1", { timeoutMs: 0 })).toEqual([]);
  });

  it("honours the readonly option without error", () => {
    const database = new Database();
    expect(database.query("select 1", { readonly: true })).toEqual([]);
  });
});
