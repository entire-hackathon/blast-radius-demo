import { redirectService } from "../service/redirect.js";

export interface HttpRequest {
  ip: string;
  params: { slug: string };
}

export interface HttpResponse {
  status: number;
  headers: Record<string, string>;
  body: string;
}

/** GET /:slug — redirect to the stored URL. */
export function handleRedirect(req: HttpRequest): HttpResponse {
  const result = redirectService.resolve(req.params.slug);
  if (result.status === 404 || !result.location) {
    return { status: 404, headers: {}, body: "not found" };
  }
  return { status: 302, headers: { location: result.location }, body: "" };
}
