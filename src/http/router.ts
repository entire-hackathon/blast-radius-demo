import { shortenService } from "../service/shorten.js";
import { handleRedirect, type HttpRequest, type HttpResponse } from "./redirect-handler.js";

/** Minimal route table for the demo. */
export function route(method: string, path: string, req: HttpRequest): HttpResponse {
  if (method === "GET" && /^\/[a-z0-9]+$/i.test(path)) {
    return handleRedirect(req);
  }
  if (method === "POST" && path === "/api/shorten") {
    const link = shortenService.create("https://example.com");
    return { status: 201, headers: {}, body: JSON.stringify(link) };
  }
  return { status: 404, headers: {}, body: "no route" };
}
