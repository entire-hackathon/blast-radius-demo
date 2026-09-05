import { describe, expect, it } from "vitest";
import { shortenService } from "../src/service/shorten.js";

describe("ShortenService", () => {
  it("creates a link with a slug and zero hits", () => {
    const link = shortenService.create("https://example.org");
    expect(link.url).toBe("https://example.org");
    expect(link.hits).toBe(0);
    expect(link.slug).toMatch(/^[a-z0-9]+$/);
  });
});
