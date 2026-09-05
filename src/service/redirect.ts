import { linkRepo } from "../repo/link-repo.js";

export interface RedirectResult {
  status: 302 | 404;
  location: string | null;
}

export class RedirectService {
  /** Resolve a slug to its target URL and record the hit. */
  resolve(slug: string): RedirectResult {
    const link = linkRepo.byId(slug);
    if (!link) return { status: 404, location: null };
    linkRepo.hit(slug);
    return { status: 302, location: link.url };
  }
}

export const redirectService = new RedirectService();
