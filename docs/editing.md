# Editing guide

The site is plain files. No build step: save and reload.

| File | What it holds |
| --- | --- |
| `index.html` | All content, in commented blocks |
| `styles.css` | All styling. Tokens in section 1, dark mode in section 2 |
| `404.html` | Not-found page (its home link stays in the same tab on purpose) |
| `assets/` | Headshot (`ian-combe.webp`), social image (`og.png`), `favicon.svg` |
| `robots.txt`, `sitemap.xml` | Crawler hints; bump `<lastmod>` in the sitemap on content changes |
| `docs/design.md` | Why the design looks the way it does |

Preview: `python3 -m http.server 8000`, then open http://localhost:8000.

## Rules that must hold after any edit
- Use only facts Ian supplied. If something is missing, ask. No employer internals (see `CLAUDE.md`).
- Every `<a>` has `target="_blank" rel="noopener noreferrer"`, except the 404 home link.
- Four type sizes only (`--step-0` to `--step-3`). System fonts. No trackers. The only script is the Save as PDF one at the end of `index.html`; add no other.
- Text contrast stays at or above 4.5:1 in light and dark.
- Update the Now stamp (`<p class="stamp">`) when Now changes.
- Update the footer's "Last updated" date (`<time datetime>` and its visible text) and the sitemap `<lastmod>` whenever content changes.
- Total page weight stays under 300 KB.

## Common changes and the prompt that does them
Each can be given to Claude as one prompt. Claude should read this file first.

| Change | Example prompt |
| --- | --- |
| Add a project | "Add a project to Projects: name, date, stack, 2-3 bullets, optional link." Copy one `<article class="entry">`. |
| Edit the current role | "Update the Now section to say ..." Edit the `.lede` block and the `.stamp` month. Keep the Experience entry in step. |
| Add or reorder a section | "Add a section called X after Skills." Copy a `<section class="section">`; keep the `aria-labelledby` and heading `id` matched. |
| Change a color | "Make the accent green." Edit `--accent` (light) and its dark value, then recheck contrast. |
| Change the font | Edit `--font`. System stacks only (currently a serif stack). |
| Change width or spacing | Edit `--measure`, `--margin-col`, `--section-space`. |
| Swap the headshot | Replace `assets/ian-combe.webp` (square, under 60 KB) and keep the `alt` text accurate. |
| Add a link | Copy an existing `<a>` so the new-tab attributes come along. |

## Section pattern
Sections, top to bottom: Now, Experience, Projects, Skills, Education.

```html
<section class="section" aria-labelledby="ID">
  <h2 class="section__title" id="ID">Heading</h2>
  <div class="section__body"> ...paragraphs or entries... </div>
</section>
```

## Entry pattern
```html
<article class="entry">
  <div class="entry__head">
    <h3 class="entry__title">Title</h3>
    <!-- optional: <a class="entry__link" href="..." target="_blank" rel="noopener noreferrer">Source on GitHub</a> -->
    <span class="entry__date">2025</span>  <!-- year or season, right-aligned -->
  </div>
  <p class="entry__stack">Tech, tech, tech</p>
  <ul class="points">
    <li>One short line per point; two to four points.</li>
  </ul>
</article>
```

## Check before committing
1. Reload the page in light and dark mode and at phone width.
2. Confirm no new executable `<script>` was added beyond the Save as PDF one (the JSON-LD `application/ld+json` block in `<head>` is data and stays; keep it in sync with the visible content) and total size is still small (`du -sh` on the repo root files, excluding `.git`).
3. Print preview (Ctrl+P) still fits one Letter page.
4. Commit with a conventional message, for example `content: add project X`.
