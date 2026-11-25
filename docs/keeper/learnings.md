# Learnings

- Give every picker thumbnail its own width and height, and plain colours on shapes, so it stays small if a stylesheet is stale. The deploy build adds ?v=<hash> to stylesheet links in _site, so the source can stay bare (a.design agreed and changed its standard to check the served page).
- The five designs must differ in structure on a phone first screen, not only in colour. A shared header and preview line ate most of the first screen: make the header compact per design, and put each design's idea above the fold.
- Run axe on the built _site, not file://: absolute /assets paths do not load from file://, which gives false contrast failures.
- A floated cover beside the subtitle works only if it comes before the subtitle in the markup; after it, it lands on its own row.
- The local screenshot server needs the .svg type or the cover shows as broken in thumbnails.
- Keep the book's pages that disagree visible (ten-agent versus nine staffed): say so on From the record rather than pick silently.
- Fetched pages came back as model summaries, partly truncated (the decisions page: 40,000 of 103,000 characters verbatim). Check any figure against the page itself before quoting.
- site/policy/** needs the owner's yes under the ABP; do not edit it to add the picker.
