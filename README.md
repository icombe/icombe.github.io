# Portfolio

<div align="center">

[![React](https://img.shields.io/badge/React-19.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7.2-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-7.2.4-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.15-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Three.js](https://img.shields.io/badge/Three.js-0.181.2-000000?style=for-the-badge&logo=three.js&logoColor=white)](https://threejs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

</div>

<p align="center">
  <strong>A modern, interactive personal portfolio with stunning 3D visuals and gamification elements</strong>
</p>

<p align="center">
  Built with cutting-edge web technologies to showcase projects, skills, and experience in an engaging way.
</p>

---

## Features

### Visual Excellence
- **3D Scene Background** - Interactive Three.js scene with responsive camera controls
- **Smooth Animations** - Powered by Framer Motion for fluid page transitions and micro-interactions
- **Glassmorphism Design** - Modern frosted glass effects with backdrop blur
- **Dynamic Gradients** - Animated color gradients throughout the interface
- **Responsive Layout** - Fully optimized for mobile, tablet, and desktop devices

### Interactive Elements
- **Gamification System** - Hidden achievements and easter eggs to discover (explore to find them all!)
- **Keyboard Navigation** - Full accessibility with keyboard shortcuts and focus management
- **Interactive Microinteractions** - Hover effects, click animations, and visual feedback
- **Smooth Scrolling** - Optimized scroll behavior with scroll-based animations

### Technical Features
- **React Router** - Client-side routing with 404 handling
- **TypeScript** - Full type safety and enhanced developer experience
- **Dark/Light Theme** - System preference detection with manual toggle (coming soon)
- **Performance Optimized** - Lazy loading, code splitting, and optimized bundles
- **SEO Ready** - Meta tags, semantic HTML, and proper document structure

### Sections
- **Hero** - Eye-catching landing with animated text and call-to-action
- **About** - Personal introduction and background
- **Projects** - Showcase of featured work with detailed views
- **Tech Stack** - Visual representation of skills and technologies
- **Contact** - Interactive contact form with validation
- **Work Experience** - Professional timeline and achievements
- **Achievements** - Gamified progress tracking (discover them yourself!)

---

## Quick Start

### Prerequisites
- Node.js 18+ and npm/yarn/pnpm
- Modern web browser with JavaScript enabled

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/portfolio-v2.git
cd portfolio-v2

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:5173` to see the portfolio in action.

### Build for Production

```bash
# Create optimized production build
npm run build

# Preview production build locally
npm run preview
```

### Run Tests

```bash
# Run unit tests
npm run test

# Run tests with coverage
npm run test:coverage
```

---

## Project Structure

```
portfolio-v2/
├── public/
│   ├── assets/              # Static assets (images, downloads)
│   ├── data/                # JSON data files
│   └── 404.html             # Fallback page
├── src/
│   ├── components/          # React components
│   │   ├── Hero.tsx
│   │   ├── Projects.tsx
│   │   ├── Contact.tsx
│   │   ├── Scene3D.tsx      # Three.js 3D scene
│   │   └── ...
│   ├── pages/               # Route pages
│   │   ├── Home.tsx
│   │   ├── About.tsx
│   │   ├── Testimonials.tsx
│   │   └── Achievements.tsx
│   ├── context/             # React context providers
│   │   └── ThemeContext.tsx
│   ├── lib/                 # Utilities and helpers
│   │   ├── achievements.ts  # Achievement definitions
│   │   ├── easterEggs.ts    # Easter egg hooks
│   │   └── paths.ts         # Route paths
│   ├── styles/              # SCSS modules
│   ├── App.tsx              # Main app component
│   ├── main.tsx             # Entry point
│   └── index.css            # Global styles
├── .github/
│   └── workflows/
│       └── deploy.yml       # GitHub Pages deployment
├── package.json
├── tsconfig.json            # TypeScript configuration
├── vite.config.ts           # Vite configuration
└── tailwind.config.js       # Tailwind CSS configuration
```

---

## Customization

### Color Palette

Edit `tailwind.config.js` to customize colors:

```js
theme: {
  extend: {
    colors: {
      palette: {
        deep: '#0032db',    // Deep Blue
        blue: '#0689e4',    // Bright Blue
        green: '#71ab23',   // Green
        yellow: '#fbb905',  // Yellow
        orange: '#d55e0f',  // Orange
      },
    },
  },
}
```

### Content

- **Personal Info**: Update content in `src/components/Hero.tsx`, `src/pages/About.tsx`
- **Projects**: Modify `public/data/projects.json` to add/edit projects
- **Experience**: Edit `public/data/experience.json` for work history
- **Games/Media**: Update `public/data/games.json` for favorite games section
- **Contact Info**: Configure form handling in `src/components/ContactForm.tsx`

### Assets

- Place images in `public/assets/images/`
- Add downloadable files to `public/assets/downloads/`
- Update paths in data JSON files accordingly

---

## Deployment

### GitHub Pages (Automatic)

This project includes a GitHub Actions workflow for automatic deployment:

1. Push to the `main` branch
2. GitHub Actions automatically builds and deploys to `gh-pages` branch
3. Visit your portfolio at `https://YOUR_USERNAME.github.io/portfolio-v2/`

### Manual Deployment

```bash
# Build for production
npm run build

# Deploy dist folder to your hosting provider
# (Netlify, Vercel, Cloudflare Pages, etc.)
```

### Configuration

Update `vite.config.ts` base URL if deploying to a subdirectory:

```ts
export default defineConfig({
  base: '/your-repo-name/',  // For GitHub Pages subdomain
  // OR
  base: '/',                 // For custom domain or root deployment
})
```

---

## Technologies

### Core
- **React 19.2.0** - Latest React with hooks and concurrent features
- **TypeScript 5.7.2** - Static typing and enhanced IDE support
- **Vite 7.2.4** - Next-generation frontend tooling

### Styling
- **Tailwind CSS 3.4.15** - Utility-first CSS framework
- **SCSS Modules** - Component-scoped styles
- **Framer Motion 12.23.24** - Production-ready animation library

### 3D Graphics
- **Three.js 0.181.2** - JavaScript 3D library
- **@react-three/fiber 9.4.0** - React renderer for Three.js
- **@react-three/drei 10.0.0** - Useful helpers for R3F

### Routing & Forms
- **react-router-dom 7.1.1** - Client-side routing
- **React Hook Form** - Performant form validation

### Development
- **ESLint** - Code linting and style enforcement
- **Jest** - Unit testing framework
- **@testing-library/react** - React component testing

---

## Roadmap

- [ ] Add blog section with MDX support
- [ ] Implement advanced theme customization (multiple color schemes)
- [ ] Add analytics dashboard for visitor insights
- [ ] Create CMS integration for easier content updates
- [ ] Enhance 3D scene with more interactive elements
- [ ] Add multilingual support (i18n)
- [ ] Performance optimizations (lazy loading, code splitting)
- [ ] Add more accessibility features (ARIA labels, keyboard navigation)

---

## Contributing

While this is a personal portfolio, suggestions and bug reports are welcome!

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Contact

For any inquiries, feel free to reach out through the contact form on the portfolio or connect via social media.

---

<div align="center">

**Made with care and attention to detail**

Star this repo if you find it helpful!

</div>
