# Design brief

## Audience

1. **Recruiters** for Integration, Platform, DevOps and internal-tools roles. They skim for 30 seconds: name, role, location, current job, one or two proof points, a way to make contact.
2. **Search crawlers.** Every word must be in the HTML source; no JavaScript is needed to read it. The page should rank first for "Ian Combe".
3. **Engineers** who open the repo. It should look deliberate and be small and readable: three source files plus assets.

## Point of view

A working engineer's notes page, not a marketing page. Plain statements of what I build and with what. Technical terms are set in monospace. Nothing decorative: hierarchy comes from type size, weight and space.

Voice: first person, past or present tense, concrete nouns. No "passionate about", no superlatives, no metrics beyond those in the brief.

Avoided on purpose: gradient blobs, glassmorphism, emoji headings, centered hero blurbs, skill bars, icon grids, web fonts, animation beyond hover/focus states.

## Constraints

- Static files only: `index.html`, `styles.css`, assets. No framework, no build step, no trackers.
- JS: none by default. At most a few lines for a theme toggle, and only if `prefers-color-scheme` alone proves insufficient. Current plan: no JS.
- Page weight under 300 KB.

## Type scale

System font stacks only. Four sizes.

| Token | Size | Use |
| --- | --- | --- |
| `--step-0` | 0.875rem (14px) | Mono stack lines, dates, footer |
| `--step-1` | 1rem (16px) | Body, links, list items |
| `--step-2` | 1.25rem (20px) | Section headings, project titles |
| `--step-3` | 2.25rem (36px) | `<h1>` name only |

- Body and headings: system serif, `Charter, "Iowan Old Style", "Palatino Linotype", Georgia, serif`, line-height 1.65 (serif gets extra leading). Chosen over the usual system sans so the page has a voice of its own without a web font.
- Mono: `ui-monospace, "SF Mono", Menlo, Consolas, monospace`, only for stack lines under each project and dates. Not for section labels.
- Measure: `max-width: 38rem` on the column, about 65 characters at 16px.
- Weights: 400 and 600 only.

## Color tokens

One accent, used for links and the focus ring. All pairs meet WCAG AA for normal text (4.5:1); ratios computed against the page background.

| Token | Light | Dark | Contrast (L / D) |
| --- | --- | --- | --- |
| `--bg` | `#f7f8fa` | `#13151a` | n/a |
| `--text` | `#16181d` | `#e6e8ec` | 16.7 / 14.9 |
| `--muted` | `#555b66` | `#a0a6b2` | 6.4 / 7.5 |
| `--accent` | `#1d5a9e` | `#86b6ee` | 6.6 / 8.6 |

Cool neutral grays rather than cream, to avoid the common warm-paper look. No hairline rules: sections are separated by space alone.

Switching: `:root` holds the light values and `@media (prefers-color-scheme: dark)` overrides them. Set `color-scheme: light dark`.

States: links are underlined at rest; hover thickens the underline; `:focus-visible` shows a 2px accent outline with 2px offset.

## Layout

One column, left-aligned, 38rem max, 1.25rem side padding on phones, 4rem top padding on desktop. Sections separated by space, not by cards, boxes or rules. Section headings are plain sentence-case serif, with no eyebrow labels.

```
┌────────────────────────────────────────────────────────┐
│                                                        │
│   Ian Combe                          <- h1, step-3     │
│   Integration Engineer · Python,     <- step-1, muted  │
│   CI/CD, APIs · Denver, CO                             │
│                                                        │
│   GitHub  LinkedIn  contact           <- inline links   │
│   [headshot, small, right of name on ≥40rem,           │
│    stacked above on phones]                            │
│                                                        │
│   ────────────────────────────────                     │
│   now                                <- h2, step-0 mono│
│   Integration Engineer at Sedna Inc  (Aug 2026–present)│
│   I build Python collectors ... Proxmox and NetBox     │
│   into iTop ... Preparing for the HashiCorp Terraform  │
│   Associate.                                           │
│                                                        │
│   ────────────────────────────────                     │
│   selected work                                        │
│   Market Signal Summarizer           <- h3, step-2     │
│   team project · React, TypeScript, REST APIs, OpenAI │
│   2-3 lines of prose                                   │
│                                                        │
│   Campus Service Desk                                  │
│   Java 17 · Maven · JUnit 5                            │
│   2-3 lines (links to repo)                            │
│                                                        │
│   Qualcomm field session             <- experience     │
│   FastAPI · Pydantic · MySQL · SQL Server · React      │
│   2-3 lines                                            │
│                                                        │
│   ────────────────────────────────                     │
│   skills                                               │
│   one paragraph, mono-separated groups                 │
│                                                        │
│   ────────────────────────────────                     │
│   education                                            │
│   B.S. Computer Science, Colorado School of Mines,2026│
│                                                        │
│   footer: © Ian Combe (step-0, muted)                  │
└────────────────────────────────────────────────────────┘
```

Semantic structure: `<header>`, `<main>` with one `<section>` per block, `<footer>`. One `<h1>`; section headings `<h2>`; project titles `<h3>`. Skip link not needed (page is short), but landmarks are present.

## Decisions from Ian (step 0 review)
- No public résumé and no personal email on the page (spam). Drop `resume.pdf` and the Résumé link; roadmap step 1 updated.
- Contact: LinkedIn and GitHub links. Email via a free SimpleLogin forwarding alias (Proton-owned, open source), shown as plain text. Ian creates the alias and supplies the address; it can be disabled if it attracts spam.
- Headshot source: `public/assets/images/ian-combe-headshot.png` (copy and convert in step 1 before `public/` is removed).
- Campus Service Desk links to its repo.
- Qualcomm field session (May 2025 to June 2025): shown without dates, since the brief asks only for the experience.
