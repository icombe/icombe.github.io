export type ProjectLink = {
  label: string;
  href: string;
  isExternal?: boolean;
};

export type ProjectMedia = {
  src?: string;
  alt: string;
  type: 'image' | 'video' | 'terminal';
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
    slug: 'campus-service-desk',
    title: 'Campus Service Desk',
    dateRange: '2026',
    summary:
      'A Java 17 terminal application built to practice object-oriented design, layered architecture, validation, and automated testing.',
    problem:
      'I wanted a project that went beyond Java syntax and forced me to model real business rules: service requests need valid data, predictable status transitions, flexible storage, useful filtering, and clear failures.',
    techStack: ['Java 17', 'Maven', 'JUnit 5', 'OOP', 'Repository pattern', 'Streams'],
    screenshots: [
      {
        type: 'terminal',
        alt: 'Campus Service Desk terminal showing a created urgent network request',
      },
    ],
    whatBuilt: [
      'A menu-driven command-line workflow for creating, finding, updating, filtering, and sorting campus service requests.',
      'A domain model with validated request data and an explicit NEW → ASSIGNED → IN_PROGRESS → RESOLVED → CLOSED lifecycle.',
      'Service and repository layers connected through dependency injection, with both List- and Map-backed repository implementations.',
      'JUnit tests covering domain rules, invalid input, status transitions, ID generation, filtering, and repository behavior.',
    ],
    whatWasHard: [
      'Deciding which rules belonged in the domain model, service layer, repository, or terminal interface.',
      'Preventing invalid state changes while still exposing the valid next statuses to the user.',
      'Keeping two repository implementations consistent and returning immutable copies so callers cannot mutate stored collections accidentally.',
    ],
    githubUrl: 'https://github.com/icombe/campus-service-desk',
    links: [
      {
        label: 'GitHub',
        href: 'https://github.com/icombe/campus-service-desk',
        isExternal: true,
      },
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
