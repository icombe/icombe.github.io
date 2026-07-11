# Portfolio Website

Personal portfolio site built to present selected software projects and implementation details in a clear recruiter-facing format.

Live site: https://icombe.github.io/

## What this repo includes

- Responsive React UI with reusable components and route-based project detail pages
- Dark, recruiter-facing home page with profile links and an interactive Three.js hero
- Projects page with consistent glassmorphism case-study cards
- Raw tech brutalist visual system with bright green, hot pink, cyan, and acid yellow accents
- Project media and writeups for recruiter review
- Automated GitHub Pages deployment workflow

## Tech stack

- React + TypeScript + Vite
- Tailwind CSS
- React Router
- Three.js
- Vitest + Testing Library

## Featured project coverage

- Tipsy Taxi
- Campus Service Desk
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
