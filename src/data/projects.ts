export type ProjectLink = {
  label: string;
  href: string;
  isExternal?: boolean;
};

export type ProjectMedia = {
  src: string;
  alt: string;
  type: 'image' | 'video';
  poster?: string;
};

export type Project = {
  slug: string;
  title: string;
  dateRange: string;
  summary: string;
  problem: string;
  techStack: string[];
  screenshots: ProjectMedia[];
  whatBuilt: string[];
  whatWasHard: string[];
  githubUrl?: string;
  liveUrl?: string;
  links: ProjectLink[];
};

export const profile = {
  name: 'Ian Combe',
  roles: ['Full-Stack Developer', 'Frontend Engineer', 'Software Developer'],
  image: '/assets/images/ian-combe-headshot.png',
  skills: [
    {
      label: 'Languages',
      items: ['Python', 'TypeScript', 'Java', 'SQL', 'C++', 'HTML/CSS'],
    },
    {
      label: 'Web/API',
      items: ['React', 'FastAPI', 'REST APIs', 'Pydantic', 'Tauri'],
    },
    {
      label: 'Data & tools',
      items: ['PostgreSQL', 'Pandas', 'Git/GitHub', 'Linux', 'Godot'],
    },
    {
      label: 'Practices',
      items: ['Agile/Scrum', 'Debugging', 'Code reviews', 'OOP/SOLID', 'Documentation'],
    },
  ],
  summary:
    'I am a computer science graduate looking for a software role where I can build useful, well-made tools. I like clean interfaces, smooth user flows, and efficient workflows that make software feel easier to use than the process it replaces.',
  links: {
    resume: '/assets/images/resume.pdf',
    github: 'https://github.com/icombe',
    linkedin: 'https://www.linkedin.com/in/iancombe/',
  },
};

export const projects: Project[] = [
  {
    slug: 'tipsy-taxi',
    title: 'Tipsy Taxi',
    dateRange: 'Feb 2026 - May 2026',
    summary:
      'A Godot arcade driving game built on a four-person team with two-week sprints during my final semester.',
    problem:
      'The project needed to feel responsive and readable under arcade pressure while still being structured cleanly enough for a small team to iterate across scenes, scripts, UI, and gameplay states.',
    techStack: ['Godot', 'GDScript', 'GitHub Copilot', 'Git', 'Agile sprints', 'Playtesting'],
    screenshots: [
      {
        type: 'video',
        src: '/videos/TipsyTaxiCommercialShort.mp4',
        alt: 'Tipsy Taxi gameplay video',
        poster: '/assets/images/tipsy-taxi-thumbnail.png',
      },
    ],
    whatBuilt: [
      'Complete driving loop with responsive controls, collision handling, scoring, UI feedback, and restart/failure states.',
      'Gameplay logic split across scenes and scripts so the team could maintain clear state transitions.',
      'Difficulty and movement tuning through playtesting to improve responsiveness, readability, and game feel.',
      'Sprint-based development workflow with a four-person team over the final semester.',
    ],
    whatWasHard: [
      'Balancing controls so the game felt fast without becoming hard to read or frustrating to recover from.',
      'Keeping scene and script responsibilities clear as gameplay states, UI feedback, and failure conditions grew.',
      'Using GitHub Copilot as a development aid while still reviewing and shaping the gameplay code intentionally.',
    ],
    githubUrl: 'https://github.com/icombe/tipsy-taxi',
    links: [
      { label: 'GitHub', href: 'https://github.com/icombe/tipsy-taxi', isExternal: true },
      { label: 'Demo video', href: '/videos/TipsyTaxiCommercialShort.mp4' },
    ],
  },
  {
    slug: 'student-loan-analyzer',
    title: 'Student Loan Analyzer',
    dateRange: 'Dec 2025 - Jan 2026',
    summary:
      'A desktop-first loan planning app for comparing payoff strategies, logging payments, and seeing repayment progress in one place.',
    problem:
      'Student loan payoff decisions are hard to compare when balances, interest rates, extra payments, and repayment strategies live in separate spreadsheets or calculators.',
    techStack: ['React', 'TypeScript', 'Vite', 'Tauri', 'Local persistence', 'Tailwind CSS'],
    screenshots: [
      {
        type: 'video',
        src: '/videos/LoanTrackerDemo.mp4',
        alt: 'Student Loan Analyzer walkthrough video',
        poster: '/assets/images/student-loan-analyzer-screenshot.png',
      },
    ],
    whatBuilt: [
      'Dashboard views for balances, payoff progress, and monthly payment context.',
      'Loan management flows for adding, editing, deleting, and tracking individual loans.',
      'Planner controls for avalanche, snowball, minimum payment, extra payment, and payment frequency scenarios.',
      'Payment logging, settings, and a desktop-focused flow built around practical repayment decisions.',
    ],
    whatWasHard: [
      'Keeping repayment calculations understandable instead of burying the user in finance jargon.',
      'Designing dense screens so balances, rates, and timeline details stay readable on smaller viewports.',
      'Keeping the desktop app direction intact while trimming the portfolio presentation down to the strongest product work.',
    ],
    links: [
      { label: 'Demo video', href: '/videos/LoanTrackerDemo.mp4' },
    ],
  },
  {
    slug: 'market-signal-summarizer',
    title: 'Market Signal Summarizer',
    dateRange: 'Oct 2025 - Nov 2025',
    summary:
      'A market research tool that gathers signal data and turns it into concise summaries a user can scan quickly.',
    problem:
      'Market research usually means jumping between price movement, news, and other signals, then manually deciding what matters.',
    techStack: ['Python', 'FastAPI', 'React', 'TypeScript', 'External APIs', 'AI summarization'],
    screenshots: [
      {
        type: 'video',
        src: '/videos/MarketSignalSummarizerVideo.mp4',
        alt: 'Market Signal Summarizer walkthrough video',
        poster: '/assets/images/market-signal-summarizer-screenshot.png',
      },
    ],
    whatBuilt: [
      'React frontend for entering a ticker, reviewing returned market signals, and reading generated summaries.',
      'Frontend integration with backend API calls, including request states, returned data display, and predictable UI updates.',
      'Interface structure for portfolio metrics, signal history, trade controls, and generated recommendation output.',
      'Demo flow showing how the frontend turns backend responses into a usable market research screen.',
    ],
    whatWasHard: [
      'Keeping the UI stable while integrating backend responses with different signal and summary shapes.',
      'Making dense financial data scannable without burying the useful output.',
      'Presenting recommendations clearly without making the interface feel like financial advice.',
    ],
    githubUrl: 'https://github.com/icombe/market-signal-summarizer',
    links: [
      {
        label: 'GitHub',
        href: 'https://github.com/icombe/market-signal-summarizer',
        isExternal: true,
      },
      { label: 'Demo video', href: '/videos/MarketSignalSummarizerVideo.mp4' },
    ],
  },
];

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}
