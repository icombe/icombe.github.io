# Portfolio Website

Personal portfolio site built to present selected software projects and implementation details in a clear recruiter-facing format.

Live site: https://icombe.github.io/

## What this repo includes

- Responsive React UI with reusable components and route-based project detail pages
- Simple home page with profile links
- Projects page with consistent project writeups
- Light recruiter-facing layout with bright green accents
- Project media and writeups for recruiter review
- Automated GitHub Pages deployment workflow

## Tech stack

- React + TypeScript + Vite
- Tailwind CSS
- React Router
- Vitest + Testing Library

## Featured project coverage

- Tipsy Taxi
- Student Loan Analyzer
- Market Signal Summarizer

## Local development

```bash
npm install
npm run dev
```

## Test and build

```bash
npm run test -- --run
npm run build
```

## Deployment

Pushing to `main` triggers the GitHub Pages workflow in `.github/workflows/deploy.yml`.
