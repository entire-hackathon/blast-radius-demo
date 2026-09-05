import { beforeEach, describe, expect, it } from "vitest";
import { db } from "../src/db/database.js";
import { linkRepo } from "../src/repo/link-repo.js";

beforeEach(() => {
  db.seed("select * from links where slug = 'xy'", [{ slug: "xy", url: "https://x.com", hits: 3 }]);
});

describe("LinkRepo", () => {
  it("reads a link by slug", () => {
    expect(linkRepo.byId("xy")).toEqual({ slug: "xy", url: "https://x.com", hits: 3 });
  });

  it("returns null for a missing slug", () => {
    expect(linkRepo.byId("missing")).toBeNull();
  });
});
