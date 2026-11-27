# Portfolio site: static rebuild on branch `redesign`

Goal: a one-page, minimal, editorial site for Ian Combe. Recruiters read it in 30 seconds; it ranks first for "Ian Combe"; the repo is clean enough to impress an engineer. Target roles: Integration Engineer, Platform Engineer, DevOps Engineer, internal-tools Software Engineer. Design brief: `docs/design.md`.

## Hard rules
- Never invent anything. Use only content Ian supplied. If something is missing, ask.
- No employer internals. Describe Sedna only with public technology names: Python, GitLab CI/CD, Proxmox, NetBox, iTop. No internal tool names, clients or metrics.
- Work on branch `redesign`. Ask before deleting files, pushing or merging.
- Plain static files: HTML, one CSS file, at most a few lines of JS (theme toggle only, only if needed). No framework, no build step, no web fonts, no trackers, no animation beyond subtle hover and focus states.
- System font stack, at most 4 type sizes, line length 60-75 characters. CSS custom properties; light/dark via `prefers-color-scheme`; WCAG AA contrast.
- Avoid AI-template tells: gradient blobs, glassmorphism, emoji headings, "passionate about", centered hero blurbs, skill bars, icon grids.
- Dropped content: the résumé PDF and personal email address (spam); Tipsy Taxi, Student Loan Analyzer, the 3D hero, the "2026 edition" label, all videos.
- Conventional commits. One roadmap step per session.

## Verify
Serve with `python3 -m http.server 8000` and check in a browser with JavaScript disabled. Lint and CI arrive in step 3.

## Editing the site
Read `docs/editing.md` before any content or style change. All links open in new tabs (except the 404 home link); update the footer's last-updated date on content changes.

## Roadmap
- [x] 0. Design brief. Write `docs/design.md` (audience, point of view, type scale, color tokens, ASCII layout) and this file. Stop and wait for approval.
- [x] 1. Static rebuild. Create `index.html`, `styles.css`, `assets/` (headshot as optimized webp under 60 KB, og image 1200x630), `404.html`. Remove the React/Vite/Tailwind/Three.js sources, configs, tests and `public/videos/` (list them and ask first). Done when: it renders fully with JavaScript disabled and total page weight is under 300 KB, excluding the PDF.
- [x] 2. SEO. `<title>Ian Combe | Integration Engineer in Denver</title>`; meta description naming Ian; `<link rel="canonical" href="https://icombe.github.io/">`. Open Graph and Twitter tags. JSON-LD Person: name, jobTitle, url, image, sameAs [LinkedIn, GitHub], alumniOf Colorado School of Mines, address Denver, CO. `robots.txt` and `sitemap.xml`; `lang="en"`; descriptive alt text; single `<h1>` holding the name. Commented placeholder for google-site-verification. Done when: Lighthouse SEO is 100 and the JSON-LD parses without errors.
- [ ] 3. Quality gate. GitHub Actions workflow with every action pinned to a full SHA. Runs html-validate, a lychee link check, and Lighthouse CI asserting at least 0.95 for performance, accessibility, best practices and SEO. Deploys to Pages only after those pass. Done when: CI is green on `redesign`.
- [ ] 4. Repo hygiene. README: one-line purpose, screenshot, structure, run locally (`python3 -m http.server`), deploy, quality checks. Add MIT `LICENSE`, `.editorconfig`, Prettier config and format pass, minimal `.gitignore`. Conventional commits. Done when: the repo root has 12 entries or fewer.
- [ ] 5. Review. Run the reviewer agent on the full diff. Produce a checklist of manual tasks for Ian: Search Console verification and sitemap submission; add the site URL to LinkedIn (contact info and Featured) and the GitHub profile; optional cleanup of old video history, which needs a force-push that must not be run by Claude. Done when: Ian merges.

## Content (use exactly this; tighten wording only)
**Header.** Ian Combe. Integration Engineer · Python, CI/CD, APIs · Denver, CO. Links: GitHub (github.com/icombe), LinkedIn (linkedin.com/in/iancombe). No résumé and no personal email on the site (spam); Contact: a SimpleLogin forwarding alias (Ian creates it and supplies the address; ask before step 1 renders it).

**Now.** Integration Engineer at Sedna Inc (Aug 2026–present). Builds Python collectors and integrations that run in GitLab CI/CD, bringing infrastructure data from Proxmox and NetBox into iTop for CMDB and ticketing. Preparing for the HashiCorp Terraform Associate.

**Selected work (2-3 lines each).**
- Market Signal Summarizer (team project; React, TypeScript, REST APIs, OpenAI). Built the React/TypeScript components that display AI-generated market summaries and signal data from backend endpoints; worked with backend teammates on the API contracts.
- Campus Service Desk (Java 17, Maven, JUnit 5). Command-line service desk with separate model, repository and service layers, dependency injection, two repository backends, and status-transition rules, covered by 51 JUnit 5 tests.
- Qualcomm field session (experience, not a project card). FastAPI backend with 5 REST endpoints and Pydantic validation over MySQL and SQL Server, connected to a React frontend. Scrum Lead for a 3-person team.

**Skills (one line).** Python, Bash, SQL, Java, TypeScript · REST APIs, FastAPI · GitLab CI/CD, Linux, Proxmox, NetBox, Git · PostgreSQL, MySQL · learning OpenTofu/Terraform and AWS

**Education.** B.S. Computer Science, Colorado School of Mines, 2026
