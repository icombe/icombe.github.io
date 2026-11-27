# Portfolio site: static rebuild on branch `redesign`

Goal: a one-page, minimal, editorial site for Ian Combe. Recruiters read it in 30 seconds; it ranks first for "Ian Combe"; the repo is clean enough to impress an engineer. Target roles: Integration Engineer, Platform Engineer, DevOps Engineer, internal-tools Software Engineer. Design brief: `docs/design.md`.

## Hard rules
- Never invent anything. Use only content Ian supplied. If something is missing, ask.
- No employer internals. Describe Sedna only with public technology names: Python, GitLab CI/CD, Proxmox, NetBox, iTop. No internal tool names, clients or metrics.
- Work on branch `redesign`. Ask before deleting files, pushing or merging.
- Plain static files: HTML, one CSS file, at most a few lines of JS (the Save as PDF button only). No framework, no build step, no web fonts, no trackers, no animation beyond subtle hover and focus states.
- System font stack, at most 4 type sizes, line length 60-75 characters. CSS custom properties; light/dark via `prefers-color-scheme`; WCAG AA contrast.
- Avoid AI-template tells: gradient blobs, glassmorphism, emoji headings, "passionate about", centered hero blurbs, skill bars, icon grids.
- No résumé PDF or personal email on the site (spam).
- Edit HTML/CSS with the Edit tool, never sed line deletes.
- For palette, type or layout changes, show Ian two screenshot options and get a pick before committing.

## Verify
Serve with `python3 -m http.server 8000` and check in a browser with JavaScript disabled. Lint and CI arrive in step 3. After content or CSS changes, print preview must still fit one Letter page.

## Editing the site
Read `docs/editing.md` before any content or style change. All links open in new tabs (except the 404 home link); update the footer's last-updated date on content changes.

## Roadmap
- [x] 0–2. Design brief, static rebuild, SEO (done; see docs/design.md).
- [ ] 3. Quality gate. GitHub Actions workflow with every action pinned to a full SHA. Runs html-validate, a lychee link check, and Lighthouse CI asserting at least 0.95 for performance, accessibility, best practices and SEO. Deploys to Pages only after those pass. Done when: CI is green on `redesign`.
- [ ] 4. Repo hygiene. README: one-line purpose, screenshot, structure, run locally (`python3 -m http.server`), deploy, quality checks. Add MIT `LICENSE`, `.editorconfig`, Prettier config and format pass, minimal `.gitignore`. Conventional commits. Done when: the repo root has 12 entries or fewer.
- [ ] 5. Review. Run the reviewer agent on the full diff. Produce a checklist of manual tasks for Ian: Search Console verification and sitemap submission; add the site URL to LinkedIn (contact info and Featured) and the GitHub profile; optional cleanup of old video history, which needs a force-push that must not be run by Claude. Done when: Ian merges.
