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

System font stacks only. Four sizes. Editing details: `docs/editing.md`.

| Token | Size | Use |
| --- | --- | --- |
| `--step-0` | 0.875rem (14px) | Mono stack lines, footer |
| `--step-1` | 1rem (16px) | Body, links, project titles |
| `--step-2` | 1.25rem (20px) | Section headings, the "Now" lede |
| `--step-3` | 2.25rem (36px) | `<h1>` name only |

- One sans family for everything: `system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`. It replaced the first draft's serif, which read as bookish rather than professional.
- Headings are bold (700) against 400 body. Headings use `--text`, so the weight and size do the work.
- Mono, for stack lines only: `ui-monospace, "SF Mono", Menlo, Consolas, monospace`.
- Measure: 35rem column, about 70 characters at 16px.

## Color tokens

One accent for links and the focus ring. Text pairs meet WCAG AA (4.5:1).

| Token | Light | Dark | Contrast (L / D) |
| --- | --- | --- | --- |
| `--bg` | `#f7f8fa` | `#13151a` | n/a |
| `--text` | `#16181d` | `#e6e8ec` | 16.7 / 14.9 |
| `--muted` | `#555b66` | `#a0a6b2` | 6.4 / 7.5 |
| `--accent` | `#1d5a9e` | `#86b6ee` | 6.6 / 8.6 |
| `--rule` | `#d6dae1` | `#2d323c` | decorative dividers only |

Cool neutral grays rather than cream. Dark mode follows `prefers-color-scheme`.

## Layout

One page-width column with a two-column grid inside it. Each section opens with a 1px divider. The heading sits in the left margin column and the content in the right column, so the eye moves down the left edge from heading to heading. Projects are separated by lighter dividers. On phones the heading stacks above its content.

```
  [portrait]  Ian Combe                                  <- h1, step-3
              Integration Engineer                       <- bold
              Python, CI/CD, APIs · Denver, CO           <- muted
              GitHub  LinkedIn  Email

  ───────────────────────────────────────────────────── divider
  Now             Integration Engineer at Sedna Inc ...   <- lede, step-2
  ───────────────────────────────────────────────────── divider
  Selected work   Market Signal Summarizer
                  Team project · React, TypeScript ...    <- mono, muted
                  2-3 lines
                  ─────────────────────────────── lighter divider
                  Campus Service Desk
                  ...
  ───────────────────────────────────────────────────── divider
  Skills          one paragraph
  ───────────────────────────────────────────────────── divider
  Education       B.S. Computer Science ...
  ───────────────────────────────────────────────────── divider
  © Ian Combe · Last updated <date> · Source on GitHub
  Plain HTML and one CSS file. No framework, no build step, no trackers.
```

Semantic structure: `<header>`, `<main>` with one `<section>` per block, `<footer>`. One `<h1>`; section headings `<h2>`; project titles `<h3>`.

## Decisions from Ian (step 0 review)
- No public résumé and no personal email on the page (spam). Drop `resume.pdf` and the Résumé link; roadmap step 1 updated.
- Contact: LinkedIn and GitHub links. Email via a free SimpleLogin forwarding alias (Proton-owned, open source), shown as plain text. Ian creates the alias and supplies the address; it can be disabled if it attracts spam.
- Headshot source: `public/assets/images/ian-combe-headshot.png` (copy and convert in step 1 before `public/` is removed).
- Campus Service Desk links to its repo.
- Qualcomm field session (May 2025 to June 2025): shown without dates, since the brief asks only for the experience.
