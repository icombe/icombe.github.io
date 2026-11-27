# Design brief

## Audience

1. **Recruiters** for Integration, Platform, DevOps and internal-tools roles. They skim for 30 seconds: name, role, location, current job, one or two proof points, a way to make contact.
2. **Search crawlers.** Every word must be in the HTML source; no JavaScript is needed to read it. The page should rank first for "Ian Combe".
3. **Engineers** who open the repo. It should look deliberate and be small and readable: three source files plus assets.

## Point of view

A working engineer's notes page, not a marketing page. Plain statements of what I build and with what. Nothing decorative: hierarchy comes from type size, italic and space. One serif family carries everything; the large regular-weight name is the page's one display moment.

Voice: first person, past or present tense, concrete nouns. No "passionate about", no superlatives, no metrics beyond those in the brief.

Avoided on purpose: gradient blobs, glassmorphism, emoji headings, centered hero blurbs, skill bars, icon grids, web fonts, animation beyond hover/focus states.

## Constraints

- Static files only: `index.html`, `styles.css`, assets. No framework, no build step, no trackers.
- JS: none by default (the JSON-LD block is data, not script). At most a few lines for a theme toggle, and only if `prefers-color-scheme` alone proves insufficient. Current plan: no JS.
- Page weight under 300 KB.

## Type scale

System font stacks only. Four sizes. Editing details: `docs/editing.md`.

| Token | Size | Use |
| --- | --- | --- |
| `--step-0` | 0.875rem (14px) | Italic stack lines, source links, footer |
| `--step-1` | 1.0625rem (17px) | Body, italic section headings, bold project titles |
| `--step-2` | 1.3125rem (21px) | Italic role line, the "Now" lede |
| `--step-3` | 2.75rem (44px; 36px on phones) | `<h1>` name only, regular weight |

- One system serif stack for everything: `"Iowan Old Style", "Palatino Linotype", Palatino, "URW Palladio L", P052, Charter, "Bitstream Charter", Cambria, Georgia, serif` (Mac, Windows, Linux, then fallback). Ian chose serif in November 2026, reversing the step-1 sans; no web fonts.
- Body line-height 1.7 (serif needs more than sans). Old-style numerals.
- Hierarchy: name large at 400; section headings italic at body size; project titles bold. No monospace.
- Measure: `66ch`, about 66 characters. The page width is margin column + gap + measure, so dividers end where the text ends.
- Patterns borrowed from reference sites: Paco Coursey's italic tagline under the name and plain title-plus-line entries; Tania Rascia's small source link beside a project title; Tufte-style headings in the left margin.

## Color tokens

One accent for links and the focus ring. Text pairs meet WCAG AA (4.5:1).

| Token | Light | Dark | Contrast (L / D) |
| --- | --- | --- | --- |
| `--bg` | `#f6f7f5` | `#121614` | n/a |
| `--text` | `#1a1d1c` | `#e4e8e6` | 15.8 / 14.8 |
| `--muted` | `#565d5a` | `#a2aaa6` | 6.3 / 7.7 |
| `--accent` | `#1f5a4c` | `#8cc7b4` | 7.4 / 9.5 |
| `--rule` | `#d5dad6` | `#2a312e` | decorative dividers only |

Cool chalk neutrals rather than cream; a spruce-green accent rather than default link blue. Links carry a soft underline that turns solid on hover. Dark mode follows `prefers-color-scheme`.

## Layout

A two-column grid from 52rem up. The portrait and the italic section headings sit in the left margin column; the name, every section body and the footer share one left edge in the right column. Each section opens with a 1px divider; projects are separated by space only. Below 52rem everything stacks in one column.

```
  [portrait]      Ian Combe                               <- h1, step-3, regular
                  Integration Engineer in Denver, Colorado <- italic, step-2
                  Python, CI/CD and APIs                  <- muted
                  GitHub  LinkedIn  Email
  ───────────────────────────────────────────────────────── divider
  Now             Integration Engineer at Sedna Inc ...   <- lede, step-2
  ───────────────────────────────────────────────────────── divider
  Selected work   Market Signal Summarizer  Source   2025  <- bold; date right, muted
                  Team project. React, TypeScript ...     <- italic, muted, step-0
                  2-3 lines
                                                          <- space, no divider
                  Campus Service Desk   Source on GitHub   Summer 2026
                  ...
  ───────────────────────────────────────────────────────── divider
  Skills          one paragraph
  ───────────────────────────────────────────────────────── divider
  Education       B.S. Computer Science ...
  ───────────────────────────────────────────────────────── divider
                  © Ian Combe. Last updated <date>. Site source
```

Semantic structure: `<header>`, `<main>` with one `<section>` per block, `<footer>`. One `<h1>`; section headings `<h2>`; project titles `<h3>`.

## Decisions from Ian (step 0 review)
- No public résumé and no personal email on the page (spam). Drop `resume.pdf` and the Résumé link; roadmap step 1 updated.
- Contact: LinkedIn and GitHub links. Email via a free SimpleLogin forwarding alias (Proton-owned, open source), shown as plain text. Ian creates the alias and supplies the address; it can be disabled if it attracts spam.
- Headshot source: `public/assets/images/ian-combe-headshot.png` (copy and convert in step 1 before `public/` is removed).
- Campus Service Desk links to its repo.
- Qualcomm field session (May 2025 to June 2025): originally undated.

## Decisions from Ian (November 2026 design pass)
- Every entry shows a date at the right of its title: Market Signal Summarizer 2025, Campus Service Desk Summer 2026, Qualcomm Summer 2025. Market Signal Summarizer links to its repo; Ian built the frontend and its integration with the backend APIs.
- No "open to roles" line: Ian is currently employed.
- Print or "Save as PDF" gives a one-page résumé: black on white, no portrait, link addresses spelled out, email hidden.

## SEO (roadmap step 2)
- Title, meta description naming Ian, canonical URL, Open Graph and Twitter card tags, `og.png` at 1200x630.
- JSON-LD `Person` (a data block, not executable JS): name, jobTitle, url, image, sameAs LinkedIn and GitHub, alumniOf Colorado School of Mines, address Denver, CO.
- `robots.txt` and `sitemap.xml`; commented placeholder for the Search Console verification tag.
