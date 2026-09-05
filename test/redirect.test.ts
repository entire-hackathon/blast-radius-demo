import { beforeEach, describe, expect, it } from "vitest";
import { db } from "../src/db/database.js";
import { handleRedirect } from "../src/http/redirect-handler.js";

beforeEach(() => {
  db.seed("select * from links where slug = 'abc'", [{ slug: "abc", url: "https://anthropic.com", hits: 0 }]);
});

describe("GET /:slug", () => {
  it("redirects a known slug", () => {
    const res = handleRedirect({ ip: "1.1.1.1", params: { slug: "abc" } });
    expect(res.status).toBe(302);
    expect(res.headers.location).toBe("https://anthropic.com");
  });

  it("404s an unknown slug", () => {
    const res = handleRedirect({ ip: "1.1.1.1", params: { slug: "nope" } });
    expect(res.status).toBe(404);
  });
});
