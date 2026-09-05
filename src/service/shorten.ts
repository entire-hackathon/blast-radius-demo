import { linkRepo, type Link } from "../repo/link-repo.js";

function randomSlug(): string {
  return Math.random().toString(36).slice(2, 8);
}

export class ShortenService {
  /** Create a short link for a URL. */
  create(url: string): Link {
    const link: Link = { slug: randomSlug(), url, hits: 0 };
    linkRepo.save(link);
    return link;
  }
}

export const shortenService = new ShortenService();
