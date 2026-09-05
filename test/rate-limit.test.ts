import { describe, expect, it } from "vitest";
import { TokenBucketRateLimiter } from "../src/service/rate-limit.js";

describe("TokenBucketRateLimiter", () => {
  it("allows up to capacity then blocks", () => {
    const rl = new TokenBucketRateLimiter(3, 0);
    expect(rl.take("ip", 0)).toBe(true);
    expect(rl.take("ip", 0)).toBe(true);
    expect(rl.take("ip", 0)).toBe(true);
    expect(rl.take("ip", 0)).toBe(false);
  });

  it("refills over time", () => {
    const rl = new TokenBucketRateLimiter(1, 1);
    expect(rl.take("ip", 0)).toBe(true);
    expect(rl.take("ip", 0)).toBe(false);
    expect(rl.take("ip", 1000)).toBe(true);
  });
});
