# Editing guide

The site is plain files. No build step: save and reload.

| File | What it holds |
| --- | --- |
| `index.html` | All content, in commented blocks |
| `styles.css` | All styling. Tokens in section 1, dark mode in section 2 |
| `404.html` | Not-found page (its home link stays in the same tab on purpose) |
| `assets/` | Headshot (`ian-combe.webp`), social image (`og.png`), `favicon.svg` |
| `docs/design.md` | Why the design looks the way it does |

Preview: `python3 -m http.server 8000`, then open http://localhost:8000.

## Rules that must hold after any edit
- Use only facts Ian supplied. If something is missing, ask. No employer internals (see `CLAUDE.md`).
- Every `<a>` has `target="_blank" rel="noopener noreferrer"`, except the 404 home link.
- Four type sizes only (`--step-0` to `--step-3`). System fonts. No JavaScript, no trackers.
- Text contrast stays at or above 4.5:1 in light and dark.
- Update the footer's "Last updated" date (`<time datetime>` and its visible text) whenever content changes.
- Total page weight stays under 300 KB.

## Common changes and the prompt that does them
Each can be given to Claude as one prompt. Claude should read this file first.

| Change | Example prompt |
| --- | --- |
| Add a project | "Add a project to Selected work: name, stack, 2 lines of description, optional link." Copy one `<article class="entry">`. |
| Edit the current role | "Update the Now section to say ..." Edit the `.lede` block. |
| Add or reorder a section | "Add a section called X after Skills." Copy a `<section class="section">`; keep the `aria-labelledby` and heading `id` matched. |
| Change a color | "Make the accent green." Edit `--accent` (light) and its dark value, then recheck contrast. |
| Change the font | "Use a serif body." Edit `--font`. System stacks only. |
| Change width or spacing | Edit `--measure`, `--margin-col`, `--section-space`. |
| Swap the headshot | Replace `assets/ian-combe.webp` (square, under 60 KB) and keep the `alt` text accurate. |
| Add a link | Copy an existing `<a>` so the new-tab attributes come along. |

## Section pattern
```html
<section class="section" aria-labelledby="ID">
  <h2 class="section__title" id="ID">Heading</h2>
  <div class="section__body"> ...paragraphs or entries... </div>
</section>
```

## Entry pattern
```html
<article class="entry">
  <h3 class="entry__title">Title</h3>
  <p class="entry__stack">Tech, tech, tech</p>
  <p>Two or three lines.</p>
</article>
```

## Check before committing
1. Reload the page in light and dark mode and at phone width.
2. Confirm no `<script>` was added and total size is still small (`du -sh` on the repo root files, excluding `.git`).
3. Commit with a conventional message, for example `content: add project X`.
