# Now (25 November 2026, 18:55 UTC): handing over

Built and pushed to dev (last site commit 2f62315): five whole-site designs (d1 Ledger, live at /; d2 Poster; d3 The Day; d4 Editions; d5 Questions), each with a home and a From the record page, the Choose a design picker on every page (not /policy/, see below), /designs/ to compare, our own share card, the cover copied from the book's site and credited. tools/check.sh green. Two a.design rounds done: both recommend 3 The Day, no round 3 needed. sites.a approved it for Dinis.

## Open
- **Pick a design.** Dinis picks. Until then the live site is design 1 and /designs/ says "Not picked yet". After the pick: record it on /designs/ (the pick line, with where Dinis said it), make that design the live one at / (swap in tools/make-site.mjs), keep the others under Earlier designs, and drop the picker only when he says the pick is closed.
- **Amazon (B0HSMLFPM1):** not on the site. Fetches gave 503, then a 3.8 KB bot-check page. Add only after the page is confirmed as this book (title, author).
- **/policy/ has no picker.** It is under the ABP (site/policy/** needs the owner's yes). sites.a said leave it. Do not edit it without Dinis's yes.
- **Check the deploy:** I have not seen the Pages run for 2f62315 (cover beside the subtitle on phones) go green. sites.a's earlier check served 2cff69c over plain http. https has no certificate yet (Let's Encrypt weekly limit, expected about 27 November). Do not touch CNAME or re-save the custom domain. If a run fails with "0 artifacts", use Re-run all jobs.
- **30 and 70 page editions:** no PDF addresses found; the site links the book's editions page. Re-check the book's editions page.
- **Book pages may be stale:** team (mid-November), updates (newest brief 3 November). The book's manuscript page says "ten-agent team"; the home page says nine staffed. The site uses nine and says so on From the record.
- Leanpub: 90% complete, last updated 14 November, suggested price $19, minimum free (as read 25 November). Re-read before quoting.
