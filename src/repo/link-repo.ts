import { db, type Row } from "../db/database.js";
import type { QueryOptions } from "../db/types.js";

export interface Link {
  slug: string;
  url: string;
  hits: number;
}

function toLink(row: Row): Link {
  return { slug: String(row.slug), url: String(row.url), hits: Number(row.hits ?? 0) };
}

export class LinkRepo {
  /** Look up a link by its slug. */
  byId(slug: string, opts?: QueryOptions): Link | null {
    const rows = db.query(`select * from links where slug = '${slug}'`, opts);
    return rows[0] ? toLink(rows[0]) : null;
  }

  /** Persist a new link. */
  save(link: Link, opts?: QueryOptions): void {
    db.query(
      `insert into links (slug, url, hits) values ('${link.slug}', '${link.url}', ${link.hits})`,
      opts,
    );
  }

  /** Increment the hit counter for a slug. */
  hit(slug: string, opts?: QueryOptions): void {
    db.query(`update links set hits = hits + 1 where slug = '${slug}'`, opts);
  }
}

export const linkRepo = new LinkRepo();
