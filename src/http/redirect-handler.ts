import { redirectService } from "../service/redirect.js";
import { redirectRateLimiter } from "../service/rate-limit.js";

export interface HttpRequest {
  ip: string;
  params: { slug: string };
}

export interface HttpResponse {
  status: number;
  headers: Record<string, string>;
  body: string;
}

/** GET /:slug — redirect to the stored URL, rate-limited per client IP. */
export function handleRedirect(req: HttpRequest): HttpResponse {
  if (!redirectRateLimiter.take(req.ip)) {
    return { status: 429, headers: { "retry-after": "1" }, body: "slow down" };
  }
  const result = redirectService.resolve(req.params.slug);
  if (result.status === 404 || !result.location) {
    return { status: 404, headers: {}, body: "not found" };
  }
  return { status: 302, headers: { location: result.location }, body: "" };
}
