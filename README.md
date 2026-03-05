# Portfolio Website

Personal portfolio site built to present selected software projects, engineering experience, and implementation details in a clear format.

Live site: https://icombe.github.io/

## What this repo includes

- Responsive React UI with reusable components and route-based project detail pages
- Interactive sections for projects, skills, and contact
- Embedded Student Loan Tracker web demo with synced build artifacts
- Automated GitHub Pages deployment workflow

## Tech stack

- React + TypeScript + Vite
- Tailwind CSS + Framer Motion
- React Router
- Vitest + Testing Library

## Featured project coverage

- Student Loan Tracker (Beta web demo + linked full desktop app context)
- Market Signal Summarizer
- Testing Equipment Repair Pipeline Dashboard

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

To include the latest Student Loan Tracker demo files in the portfolio build:

```bash
npm run sync:loan-analyzer
npm run build:with-demo
```

## Deployment

Pushing to `main` triggers the GitHub Pages workflow in `.github/workflows/deploy.yml`.
