# Restart

1. Read CLAUDE.md, site/start/, and this folder.
2. bash tools/setup-signing.sh one-human-nine-agents.a@SovereignWebsite.dinis <session-url> (a new session needs a new key; its public file replaces the old one in site/keys/).
3. git pull on dev. Edit content in tools/make-site.mjs and CSS in site/assets/, then: node tools/make-site.mjs && node tools/screenshots.mjs && bash tools/check.sh.
4. Push to dev only. Report to sites.a at each design round.
