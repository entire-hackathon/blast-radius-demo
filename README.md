# linkshrink

A tiny URL shortener — the demo service for
[**Blast Radius**](https://github.com/entire-hackathon/blast-radius).

```
http/router.ts
  ├─ GET /:slug   → http/redirect-handler.ts → service/redirect.ts ─┐
  └─ POST /shorten → service/shorten.ts ───────────────────────────┤
                                                                    ▼
                                          repo/link-repo.ts  (byId / save / hit)
                                                                    ▼
                                              db/database.ts  (Database.query)
```

Everything funnels through `Database.query`, which is what makes it a good demo:
a change there has a blast radius the diff never shows.

## The demo PR

Branch `feat/redirect-rate-limit` is a staged pull request. Its stated intent
(captured as an Entire checkpoint) is:

> add token-bucket rate limiting to the redirect endpoint so abusive clients get 429s

The diff does that — **and also** changes `Database.query`'s signature, rippling
through every method in `LinkRepo`. Blast Radius flags the second part as scope
drift and recommends the tests that actually cover the change.

## Run the tests

```bash
npm install
npm test
```
