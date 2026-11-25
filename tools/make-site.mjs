// Writes the five design directions, the compare page and the picker into site/ (static files, committed).
//   node tools/make-site.mjs
// Content lives once, in CONTENT below. Every fact on the site comes from the book's own site, its Leanpub page, or this
// site's own record, and the page it comes from is linked beside it. Nothing here is invented.
import { writeFileSync, mkdirSync, readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const HOST = 'https://one-human-nine-agents.dinis.author.sovereignweb.site';
const BOOK = 'https://the-ultimate-insider.book.sgit.ai';
const LEAN = 'https://leanpub.com/one-human-nine-agents-nineteen-hours';
const TITLE = 'One Human, Nine Agents, Nineteen Hours';
const TODAY = '25 November 2026';
const SHARE = `${HOST}/assets/share/card-1200x630.jpg`;
const root = new URL('../site/', import.meta.url).pathname;
const w = (p, s) => { mkdirSync(join(root, p, '..'), { recursive: true }); writeFileSync(join(root, p), s); };

const DESIGNS = [
  { n: 1, slug: 'ledger', name: 'Ledger', idea: 'Numbers first: three big figures, each linked to its source, then the editions as a table.', best: 'Readers who want proof before a pitch.', weak: 'Quiet; the book itself has no visual presence.', dark: 'no' },
  { n: 2, slug: 'poster', name: 'Poster', idea: 'Dark and loud: the title set huge in the cover colours, with the two ways to read the book as big buttons.', best: 'First impression and sharing.', weak: 'Less room for detail; the small print sits low.', dark: 'yes, in light mode too' },
  { n: 3, slug: 'day', name: 'The Day', idea: 'A vertical timeline from the first commit at 00:16 to the talk at 19:00, with the numbers hung on it.', best: 'Telling the story of the nineteen hours.', weak: 'Readers who want the editions have to scroll past the story.', dark: 'no' },
  { n: 4, slug: 'editions', name: 'Editions', idea: 'Pick a length first: bars sized by page count for the 3, 10, 30, 70 and 150 page editions.', best: 'Someone deciding how much to read today.', weak: 'The story and numbers come second.', dark: 'no' },
  { n: 5, slug: 'questions', name: 'Questions', idea: 'Five plain questions, each a fold-out answer: who is it for, what can I do after, what is in it, can I trust the numbers, where do I read it.', best: 'Sceptical first-time visitors on a phone.', weak: 'Answers are hidden until opened.', dark: 'no' },
];
const dir = (d) => (d.n === 1 ? '/' : `/d${d.n}/`);

const num = (v, label, src, href) => ({ v, label, src, href });
const C = {
  lead: 'On 29 October 2026 one person worked with a factory of nine AI agents and gave a talk about nineteen hours after the first commit. The book tells how the factory worked, and how to set up your own, starting the same day.',
  whoQuote: 'For anyone with an idea and no team yet.',
  after: [
    'Set up your own agent.',
    'Write one page of rules, in your own words.',
    'Write one brief.',
    'Finish one small piece of work on the first day.',
  ],
  afterNote: 'A second agent is added only when the first is busy. This is how the Leanpub page describes it.',
  numbers: [
    num('9', 'agents staffed on the day. A tenth, security, was proposed and never staffed (C011).', 'Book site, home page', `${BOOK}/`),
    num('18 h 44 min', 'from the first commit at 00:16 to the start of the talk at 19:00: the nineteen hours of the title (C010, C100).', 'Book site, home page', `${BOOK}/`),
    num('814', 'commits by 18:46: 603 by Claude, 210 release commits by GitHub Actions, 1 by the editor (C004).', 'Book site, home page', `${BOOK}/`),
  ],
  editions: [
    { pages: 3, name: '3 pages', text: 'Cover, title page, three pages and the series page.', href: `${BOOK}/editions/one-human-nine-agents-edition-03.pdf`, link: 'PDF' },
    { pages: 10, name: '10 pages', text: 'The stop at 18:44 told plainly, and five steps to start your own factory.', href: `${BOOK}/editions/one-human-nine-agents-edition-10.pdf`, link: 'PDF' },
    { pages: 30, name: '30 pages', text: 'A 30-page draft. See the editions page on the book\'s site.', href: `${BOOK}/editions.html`, link: 'Editions page' },
    { pages: 70, name: '70 pages', text: 'A 70-page draft. See the editions page on the book\'s site.', href: `${BOOK}/editions.html`, link: 'Editions page' },
    { pages: 150, name: '150 pages', text: 'The full book, read online: 32 chapters.', href: `${BOOK}/review/rc2-150/index.html`, link: 'Read online' },
  ],
  editionsNote: 'The book\'s site says the shorter editions are kept for the record and are no longer kept up to date. RC2, the full book, is the one it rebuilds at each release.',
  stores: [
    { name: 'Leanpub', text: 'The book is in progress: Leanpub shows it as 90% complete, last updated 14 November 2026. Suggested price $19; the minimum price is free. Check the page for the price today.', href: LEAN, link: 'Get it on Leanpub' },
    { name: 'RC2, the full book (PDF)', text: 'A draft in review, rebuilt at every release, free from the book\'s own site.', href: `${BOOK}/rc2/one-human-nine-agents-rc2-full-draft.pdf`, link: 'Download the PDF' },
  ],
  record: [
    { name: 'Decisions', text: 'What the editor decides. The editor decides by signing; open and decided items are listed with their IDs.', href: `${BOOK}/decisions/index.html` },
    { name: 'Sources', text: 'Where the book comes from: the record, pinned to the talk\'s repository at commit 298be4e.', href: `${BOOK}/sources/index.html` },
    { name: 'Updates', text: 'The conductor\'s briefs: after every run the conductor writes the editor a brief.', href: `${BOOK}/updates/index.html` },
    { name: 'Team', text: 'Who writes the book: the editor and the agents, each with a folder.', href: `${BOOK}/team/index.html` },
    { name: 'Plan', text: 'From the talk to the book in four days.', href: `${BOOK}/plan/index.html` },
    { name: 'The manuscript', text: 'The book\'s contents, with the title candidates.', href: `${BOOK}/book/index.html` },
    { name: 'RC2', text: 'The release page: the full book in review, with the commit and time of each release.', href: `${BOOK}/rc2.html` },
  ],
};

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const ext = (href, t) => `<a href="${href}">${t}</a>`;

// ---------- shared shell ----------
const FAMILY = `<details class="family-credit">
  <summary>Sovereign Website</summary>
  <ul>
    <li><a href="/start/">Start here</a></li>
    <li><a href="/agents/">Use with your AI</a></li>
    <li class="family-gap"><a href="/admin/">How this site was made</a></li>
    <li><a href="https://sovereignwebsite.ai/">Sovereign Website</a></li>
    <li><a href="https://sovereignwebsite.org/">Principles</a></li>
    <li><a href="https://sovereignwebsite.site/">Hosted</a></li>
    <li><a href="https://hub.sovereignweb.site/">Hub</a></li>
    <li><a href="https://agents.sovereignweb.site/">Agents</a></li>
    <li><a href="https://vault.sovereignwebsite.site/">Vault</a></li>
    <li><a href="https://agenticcells.ai/">AgentiCCells</a></li>
    <li><a href="https://riskmandate.ai/">RiskMandate</a></li>
    <li><a href="https://newsroom.sgit.ai/">Newsroom</a></li>
  </ul>
</details>`;

export function picker(current) {
  const cards = DESIGNS.map((d) => `<li><a href="${dir(d)}"${current === d.n ? ' aria-current="page"' : ''}><img src="/assets/designs/d${d.n}.jpg" width="78" height="169" alt="Design ${d.n}, ${d.name}: ${esc(d.idea)}"><strong>${d.n}. ${d.name}</strong>${d.n === 1 ? '<em>Live</em>' : ''}</a></li>`).join('');
  return `<!--picker--><div class="pickbar"><details class="picker"><summary>Choose a design</summary><div class="picker-panel"><p class="picker-note">Not picked yet. The live site uses design 1.</p><ul class="picker-cards">${cards}</ul><p><a class="picker-all" href="/designs/">Compare all designs</a></p></div></details></div><!--/picker-->`;
}

function head({ title, desc, path, css }) {
  const url = `${HOST}${path}`;
  return `<!doctype html>
<html lang="en-GB">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="light dark">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${TITLE}">
<meta property="og:locale" content="en_GB">
<meta property="og:url" content="${url}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:image" content="${SHARE}">
<meta property="og:image:type" content="image/jpeg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="${TITLE}, a book by Dinis Cruz: nine agents, 18 h 44 min, 814 commits.">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(title)}">
<meta name="twitter:description" content="${esc(desc)}">
<meta name="twitter:image" content="${SHARE}">
<link rel="canonical" href="${url}">
<link rel="stylesheet" href="/assets/picker.css">
<link rel="stylesheet" href="/assets/base.css">
<link rel="stylesheet" href="/assets/${css}.css">
</head>`;
}

function shell(d, { path, title, desc, preview, body, record }) {
  const p = dir(d);
  const rec = d.n === 1 && path === '/from-the-record/' ? '/from-the-record/' : `${p}from-the-record/`;
  const home = p;
  const previewLine = d.n === 1 && !preview ? '' : `<p class="preview">Preview: design ${d.n}, ${d.name}. The live site uses design 1. <a href="/designs/">Compare all designs</a></p>`;
  return `${head({ title, desc, path, css: `d${d.n}` })}
<body class="d${d.n}">
<a class="skip" href="#main">Skip to content</a>
${picker(preview ? d.n : 0)}
${FAMILY}
<header class="top">
  <a class="name" href="${home}">${TITLE}</a>
  <nav class="own" aria-label="This site">
    <a href="${home}#editions">Editions</a>
    <a href="${rec}">From the record</a>
    <a href="/start/">Start here</a>
    <a href="/agents/">Use with your AI</a>
  </nav>
</header>
${previewLine ? `<aside class="previewbar" aria-label="Preview">${previewLine}</aside>` : ''}
<main id="main">
${body}
</main>
<footer>
<nav class="site-links" aria-label="About this site">
  <a href="${rec}">From the record</a>
  <a href="/designs/">Designs</a>
  <a href="/start/">Start here</a>
  <a href="/agents/">Use with your AI</a>
  <a href="/admin/">How this site was made</a>
  <a href="/policy/">How this site is governed</a>
</nav>
<p>A book by Dinis Cruz, in the Gen ZX Founders series. This site introduces it and points to the book's own site and Leanpub for the text; it does not copy chapters. No affiliate links, no cookies, no tracking, nothing loaded from anyone else. A sovereign website, made with the <a href="https://sovereignwebsite.org/">open pattern</a>. Source: <a href="https://github.com/SovereignWebsite/Site__Author__Dinis__One-Human-Nine-Agents">github.com/SovereignWebsite/Site__Author__Dinis__One-Human-Nine-Agents</a>.</p>
</footer>
</body>
</html>
`;
}

// ---------- content pieces ----------
const numberTiles = (cls = 'nums') => `<ul class="${cls}">${C.numbers.map((n) => `<li><span class="big">${n.v}</span><span class="lab">${esc(n.label)}</span><span class="src">Source: ${ext(n.href, n.src)}</span></li>`).join('')}</ul>`;
const afterList = () => `<ol class="after">${C.after.map((a) => `<li>${a}</li>`).join('')}</ol><p class="note">${C.afterNote} Source: ${ext(LEAN, 'Leanpub')}.</p>`;
const whoBlock = () => `<p class="who">&ldquo;${C.whoQuote}&rdquo; <span class="src">Leanpub, the book's page: ${ext(LEAN, 'leanpub.com')}</span></p>`;
const storeCards = () => `<ul class="stores">${C.stores.map((s) => `<li><p class="sname"><strong>${s.name}</strong></p><p>${s.text}</p><a class="btn" href="${s.href}">${s.link}</a></li>`).join('')}</ul>`;
const editionRows = () => C.editions.map((e) => `<tr><th scope="row">${e.name}</th><td>${e.text}</td><td><a href="${e.href}">${e.link}</a></td></tr>`).join('');
const editionTable = () => `<div class="table-wrap" tabindex="0" role="region" aria-label="Editions"><table><thead><tr><th scope="col">Edition</th><th scope="col">What it is</th><th scope="col">Where</th></tr></thead><tbody>${editionRows()}</tbody></table></div><p class="note">${C.editionsNote}</p>`;
const mark = (t) => `<div class="mark">${t}</div>`;
const COVER_ALT = 'Cover of the book: Gen ZX Founders. One Human, Nine Agents, Nineteen Hours, by Dinis Cruz. RC2, November 2026.';
const cover = () => `<figure class="cover"><img src="/assets/cover.svg" width="96" height="125" alt="${COVER_ALT}"><figcaption>The RC2 cover, from ${ext(BOOK + '/', 'the book\'s own site')}.</figcaption></figure>`;
const readit = () => `<p class="readit">Read it: ${ext(LEAN, 'Leanpub')}, or the ${ext(BOOK + '/rc2/one-human-nine-agents-rc2-full-draft.pdf', 'free RC2 PDF')}.</p>`;
const SUB = 'How a factory of AI agents built a presentation in a day, and how to build yours.';

// ---------- the five home pages ----------
const homes = {
  1: () => `${mark('A book by Dinis Cruz · Gen ZX Founders')}
<h1>${TITLE}</h1>
${cover()}
<p class="sub">${SUB}</p>
${readit()}
<p>${C.lead}</p>
<p class="cta"><a class="btn" href="${LEAN}">Get it on Leanpub</a> <a class="btn alt" href="${BOOK}/rc2/one-human-nine-agents-rc2-full-draft.pdf">Read RC2 (PDF)</a></p>
<h2 id="numbers">The day in three numbers</h2>
${numberTiles()}
<p class="note">Each figure is the book's own, from its researcher's register, checked against the talk's record. Follow the source link to see it in place.</p>
<h2>Who it is for</h2>
${whoBlock()}
<h2>What you can do after it</h2>
${afterList()}
<h2 id="editions">Editions and where to get them</h2>
${editionTable()}
<h2>Where to read it</h2>
${storeCards()}
<p>The sources behind the numbers are on ${`<a href="${dir(DESIGNS[0])}from-the-record/">From the record</a>`}.</p>`,

  2: () => `<div class="stripes" aria-hidden="true"><i></i><i></i><i></i><i></i></div>
${mark('Gen ZX Founders · a book by Dinis Cruz')}
<h1><span>One Human,</span> <span>Nine Agents,</span> <span>Nineteen Hours</span></h1>
${cover()}
<p class="sub">${SUB}</p>
${readit()}
<p class="cta"><a class="btn" href="${LEAN}">Get it on Leanpub</a> <a class="btn alt" href="${BOOK}/rc2/one-human-nine-agents-rc2-full-draft.pdf">Read RC2, free (PDF)</a></p>
<p class="note">The four stripes are the cover's own colours.</p>
<section class="band" aria-labelledby="b1"><h2 id="b1">The idea</h2><p>${C.lead}</p>${whoBlock()}</section>
<section class="band" aria-labelledby="numbers"><h2 id="numbers">Nine. 18 h 44 min. 814.</h2>${numberTiles('nums')}</section>
<section class="band" aria-labelledby="b3"><h2 id="b3">Do it yourself</h2>${afterList()}</section>
<section class="band" id="editions" aria-labelledby="b4"><h2 id="b4">Five lengths</h2>${editionTable()}${storeCards()}</section>`,

  3: () => `${mark('A book by Dinis Cruz · Gen ZX Founders')}
<h1>${TITLE}</h1>
${cover()}
<p class="sub">${SUB}</p>
${readit()}
<h2 id="numbers">29 October 2026, in order</h2>
<ol class="timeline">
<li><time>00:16</time><div><h3>The first commit</h3><p>Nine agents staffed on the day; a tenth, security, was proposed and never staffed (C011). <span class="src">Source: ${ext(BOOK + '/', 'Book site, home page')}</span></p></div></li>
<li><time>18:44</time><div><h3>The stop</h3><p>The 10-page edition tells the stop at 18:44 plainly. <span class="src">Source: ${ext(BOOK + '/editions.html', 'Book site, editions')}</span></p></div></li>
<li><time>18:46</time><div><h3>The last change</h3><p>814 commits by now: 603 by Claude, 210 release commits by GitHub Actions, 1 by the editor (C004). The last change landed at 18:46. <span class="src">Source: ${ext(BOOK + '/', 'Home page')} and ${ext(BOOK + '/plan/index.html', 'plan')}</span></p></div></li>
<li><time>19:00</time><div><h3>The talk begins</h3><p>18 h 44 min after the first commit, the nineteen hours of the title (C010, C100). <span class="src">Source: ${ext(BOOK + '/', 'Book site, home page')}</span></p></div></li>
</ol>
<h2 id="ladder">Then pick how much to read</h2>
<ul class="bars">${C.editions.map((e) => `<li><a href="${e.href}"><span class="bar b${e.pages}"><span class="pg">${e.pages}</span></span><span class="txt"><strong>${e.name}</strong> ${e.text} <span class="go">${e.link}</span></span></a></li>`).join('')}</ul>
<p class="cta"><a class="btn" href="${LEAN}">Get it on Leanpub</a></p>
<h2>Who it is for</h2>
<p>${C.lead}</p>
${whoBlock()}
<h2>What you can do after it</h2>
${afterList()}
<h2 id="editions">Editions and where to get them</h2>
${editionTable()}
${storeCards()}`,

  4: () => `${mark('A book by Dinis Cruz · Gen ZX Founders')}
<h1>${TITLE}</h1>
${cover()}
<p class="sub">${SUB}</p>
${readit()}
<h2 id="editions">How much do you want to read?</h2>
<ul class="bars">${C.editions.map((e) => `<li><a href="${e.href}"><span class="bar b${e.pages}"><span class="pg">${e.pages}</span></span><span class="txt"><strong>${e.name}</strong> ${e.text} <span class="go">${e.link}</span></span></a></li>`).join('')}</ul>
<p class="note">${C.editionsNote} Bar length follows the page count.</p>
${storeCards()}
<h2 id="numbers">The day in three numbers</h2>
${numberTiles()}
<h2>Who it is for</h2>
${whoBlock()}
<p>${C.lead}</p>
<h2>What you can do after it</h2>
${afterList()}`,

  5: () => `${mark('A book by Dinis Cruz · Gen ZX Founders')}
<h1>${TITLE}</h1>
${cover()}
<p class="sub">${SUB}</p>
${readit()}
<p class="cta"><a class="btn" href="${LEAN}">Get it on Leanpub</a></p>
<div class="qa">
<details id="editions" open><summary>Where do I read it, and how long is it?</summary><div>${editionTable()}${storeCards()}</div></details>
<details><summary>Who is it for?</summary><div>${whoBlock()}<p>${C.lead}</p></div></details>
<details><summary>What can I do after reading it?</summary><div>${afterList()}</div></details>
<details id="numbers"><summary>Can I trust the numbers?</summary><div><p>Each one is the book's own, from its researcher's register, checked against the talk's record. Each links to where the book states it.</p>${numberTiles()}<p>Where the book's own pages differ, we say so on <a href="${dir(DESIGNS[4])}from-the-record/">From the record</a>.</p></div></details>
<details><summary>Is the whole book on this site?</summary><div><p>No. This site introduces the book and points to the book's own site and to Leanpub for the text. It copies no chapters.</p></div></details>
</div>`,
};

// ---------- the record page ----------
const recordBody = (d) => `${mark('From the record')}
<h1>From the record</h1>
<p class="sub">The book is written in public. These are the pages on its own site where the decisions, sources and updates are kept. We link them and do not copy them. Checked ${TODAY}.</p>
<ul class="record">${C.record.map((r) => `<li><h2><a href="${r.href}">${r.name}</a></h2><p>${r.text}</p></li>`).join('')}</ul>
<h2>Where the book's own pages differ</h2>
<ul class="plain">
<li>The book's home page says nine agents were staffed on the day and a tenth, security, was proposed and never staffed (C011). Its manuscript page describes "a ten-agent team". This site uses nine, the number the home page and the decisions page give.</li>
<li>The home page gives 18 h 44 min, from the first commit at 00:16 to the talk at 19:00, and calls it the nineteen hours of the title. The decisions page says "about nineteen hours" (C010). Both are the same span; the title rounds it.</li>
<li>The team and updates pages carry dates from early to mid November 2026, so their status lines may be behind the book's home page.</li>
</ul>
<h2>The book, and its licence</h2>
<p>The book's site gives its text under CC BY 4.0 and its code under Apache-2.0, &copy; 2026 Dinis Cruz. Leanpub is the store: ${ext(LEAN, 'leanpub.com/one-human-nine-agents-nineteen-hours')}.</p>
<p><a href="${dir(d)}">Back to the book</a></p>`;

const descHome = 'Dinis Cruz\'s book on how one person and nine AI agents built a talk in nineteen hours, and how to set up your own. Editions, key numbers and where to read it.';
const descRec = 'Where the book\'s decisions, sources and updates are kept, linked from the book\'s own site, and where its pages differ.';

for (const d of DESIGNS) {
  const base = d.n === 1 ? '' : `d${d.n}/`;
  const prev = d.n !== 1;
  w(`${base}index.html`, shell(d, { path: dir(d), title: prev ? `${TITLE}: design ${d.n}, ${d.name}` : TITLE, desc: descHome, preview: prev, body: homes[d.n]() }));
  w(`${base}from-the-record/index.html`, shell(d, { path: `${dir(d)}from-the-record/`, title: `From the record: ${TITLE}`, desc: descRec, preview: prev, body: recordBody(d) }));
}
// design 1 is live at "/" and also reachable as a preview at /d1/
{
  const d = DESIGNS[0];
  w('d1/index.html', shell(d, { path: '/d1/', title: `${TITLE}: design 1, Ledger`, desc: descHome, preview: true, body: homes[1]().replace(/\/from-the-record\//g, '/d1/from-the-record/') }).replace('The live site uses design 1.', 'This is the live design.'));
  w('d1/from-the-record/index.html', shell(d, { path: '/d1/from-the-record/', title: `From the record: ${TITLE}`, desc: descRec, preview: true, body: recordBody(d).replace('href="/"', 'href="/d1/"') }).replace('The live site uses design 1.', 'This is the live design.'));
}

// ---------- /designs/ ----------
{
  const shots = DESIGNS.map((d) => `<li><a href="${dir(d)}"><img src="/assets/designs/d${d.n}.jpg" width="195" height="422" alt="Design ${d.n}, ${d.name}: ${esc(d.idea)}"><span>${d.n}. ${d.name}</span></a></li>`).join('');
  const rows = DESIGNS.map((d) => `<tr><th scope="row"><a href="${dir(d)}">${d.n}. ${d.name}</a></th><td>${esc(d.idea)}</td><td>${d.best}</td><td>${d.weak}</td><td>${d.dark}</td></tr>`).join('');
  const body = `${mark('Choose a design')}
<h1>Five designs for this site</h1>
<p class="sub">Each one is the whole site in that design: same words, same facts, different structure. First screens on a phone (390 by 844), taken ${TODAY}.</p>
<div class="shots" tabindex="0" role="region" aria-label="The five first screens, side by side"><ol>${shots}</ol></div>
<h2>The five in one table</h2>
<div class="table-wrap" tabindex="0" role="region" aria-label="The five designs compared"><table><thead><tr><th scope="col">Design</th><th scope="col">Its idea</th><th scope="col">Best for</th><th scope="col">Weakest at</th><th scope="col">Dark first</th></tr></thead><tbody>${rows}</tbody></table></div>
<h2>Who recommends what</h2>
<ul><li><strong>Keeper (this site's agent): design 3, The Day.</strong> It tells the story of the nineteen hours, then puts the editions straight after, so a visitor sees why the book exists and how much of it to read.</li><li><strong>Design reviewer (a.design): design 3, The Day.</strong> Round 1 and round 2 both recommend it, with the editions ladder after the timeline and a Read it line under the subtitle. Reviews: <a href="https://design.agents.sovereignweb.site/factory/dinis-cruz/account-a/a.design/reviews/one-human-nine-agents-2026-11-25-round-1.html">round 1</a>, <a href="https://design.agents.sovereignweb.site/factory/dinis-cruz/account-a/a.design/reviews/one-human-nine-agents-2026-11-25-round-2.html">round 2</a>.</li></ul>
<h2>The pick</h2>
<p><strong>Not picked yet.</strong> The live site uses design 1 meanwhile. Nothing in the browser records a choice.</p>
<h2>How to choose</h2>
<ol><li>Does the first screen on a phone say what this book is?</li><li>Can you do the main thing, which is to find where to read it, without hunting?</li><li>Would the owner say "wow"?</li></ol>
<p>Then say which number to keep.</p>
<h2>Rounds</h2>
<ol><li><strong>Round 2, ${TODAY}.</strong> Reviewed by a.design (<a href="https://design.agents.sovereignweb.site/factory/dinis-cruz/account-a/a.design/reviews/one-human-nine-agents-2026-11-25-round-2.html">review</a>). All six round 1 findings verified fixed. One small item, the cover on phones, fixed after it. Recommends design 3.</li><li><strong>Round 1, ${TODAY}.</strong> Reviewed by a.design (<a href="https://design.agents.sovereignweb.site/factory/dinis-cruz/account-a/a.design/reviews/one-human-nine-agents-2026-11-25-round-1.html">review</a>). Found: Poster not dark in light mode, header links cut at 390 px, no cover shown, stripes close to a tech brand's palette (now captioned as the cover's colours), Questions should open on where to read. Recommends design 3.</li></ol>
<h2>Earlier designs</h2>
<p>None yet.</p>`;
  w('designs/index.html', shell({ n: 1, name: 'Ledger' }, { path: '/designs/', title: `Choose a design: ${TITLE}`, desc: 'Five designs for this site side by side, with who recommends what and how to pick.', preview: false, body }).replace(/<a class="name" href="\/">/, '<a class="name" href="/">'));
}

// ---------- the picker on the shared pages ----------
for (const f of ['start/index.html', 'agents/index.html', 'admin/index.html']) {
  const p = join(root, f); if (!existsSync(p)) continue;
  let s = readFileSync(p, 'utf8');
  s = s.replace(/<!--picker-->[\s\S]*?<!--\/picker-->\n?/, '');
  s = s.replace(/<link rel="stylesheet" href="\/assets\/picker\.css[^"]*">\n?/, '');
  s = s.replace('</head>', '<link rel="stylesheet" href="/assets/picker.css">\n</head>');
  const skip = s.match(/<a class="skip"[^>]*>[^<]*<\/a>\n?/);
  s = skip ? s.replace(skip[0], skip[0] + picker(0) + '\n') : s.replace(/<body[^>]*>\n?/, (m) => m + picker(0) + '\n');
  writeFileSync(p, s);
}
console.log('site written');
