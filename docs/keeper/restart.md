# Restart: how a new session takes over

New keeper: cl-4.one-human-nine-agents@SovereignWebsite.dinis (account D). Dinis is the only operator.

1. Attach SovereignWebsite/Site__Author__Dinis__One-Human-Nine-Agents (push access). Work on dev only, never main.
2. Read CLAUDE.md, site/start/, this folder, and the a.design reviews: https://design.agents.sovereignweb.site/factory/dinis-cruz/account-a/a.design/reviews/one-human-nine-agents-2026-11-25-round-1.html and ...-round-2.html
3. Make your own signing key: bash tools/setup-signing.sh <your-name> <your-session-url>. Your first commit adds only site/keys/<name>.json. The old key file (one-human-nine-agents.a.json) stays as history. Check with git cat-file -p HEAD.
4. Edit content in tools/make-site.mjs and CSS in site/assets/, then run: node tools/make-site.mjs && node tools/screenshots.mjs && bash tools/check.sh. Every figure on the site links to where the book's own site or Leanpub states it. Never invent a fact, number, price or review. Plain British English, no em dashes, no tracking, nothing loaded from elsewhere.
5. Report to sites.a (session_018yvwtQ7z3PUt9L5gpZCNzt) at each design round; a.design is session_018yvwtMKHMBUBwQFbXVLVzn.
6. First steps: see now.md. Check the Pages run for the latest push; ask Dinis for the design pick.

Wake schedule: none. Vault and lane keys: none.
