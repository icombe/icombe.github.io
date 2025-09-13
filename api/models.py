from pydantic import BaseModel, Field
from typing import List, Optional
from dataclasses import dataclass

class ExperienceItem(BaseModel):
    id: int
    company: str
    title: str
    dates: str
    bullets: List[str]

class ProjectItem(BaseModel):
    id: int
    slug: str                 # added: used by /api/projects/slug/{slug}
    title: str
    description: str
    link: str
    thumbnail: str
    stack: List[str] = Field(default_factory=list)    # safe default
    bullets: List[str] = Field(default_factory=list)  # safe default
    jar_url: Optional[str] = None                     # optional download
    abstract: Optional[str] = None                    # NEW: short blurb for project cards

@dataclass
class Project:
    id: str
    slug: str
    title: str
    thumbnail: str
    short_description: str
    description: str
    tech: List[str]
    video_url: Optional[str] = None
    download_url: Optional[str] = None
    zip_url: Optional[str] = None
    route: Optional[str] = None

# Real data is typically fetched from a database or an external API
EXPERIENCE_DATA = [
    ExperienceItem(
        id=1,
        company="Qualcomm (College-Sponsored Field Session)",
        title="Full-Stack Developer & Scrum Master",
        dates="5/12/2025 - 6/13/2025",
        bullets=[
            "Architected and implemented a FastAPI-based backend with RESTful endpoints, Pydantic models, and MySQL schemas to satisfy all client requirements.",
            "Integrated backend services to aggregate test data from several databases with a React/Vite frontend—consumed and debugged endpoints in real time to resolve cross-stack bugs and maintain seamless data flow.",
            "Led iterative user-testing cycles, collaborating with stakeholders to refine requirements and improve prototype usability.",
            "Served as Scrum Leader: managed weekly sprints in Jira, facilitated stand-ups, sprint planning, and retrospectives to keep the team aligned and on schedule.",
            "Employed daily tools including GitHub, Jira, VS Code + GitHub Copilot, Microsoft Teams, sqlcmd/MySQL, Ant Design, React/TypeScript, Vite, FastAPI, and Python.",
            "Supporting over 200 Engineers worldwide deploying millions of dollars of equipment for 5G wireless verification",
        ]
    ),
    ExperienceItem(
        id=2,
        company="WeRDigital",
        title="Co-Founder",
        dates="10/25/2023 - 08/05/2024",
        bullets=[
            "Co-founded a studio and set up the client pipeline; from intake and discovery to proposal, scope, scheduling, delivery, and handoff so work moved predictably.",
            "Designed and shipped small-business WordPress sites with theme customization and targeted CSS; integrated key plugins (page builders, forms, SEO, e-commerce).",
            "Created reusable templates and SOPs for briefs, pricing tiers, and change requests; collaborated on pricing and package structure.",
            "Led planning with founders and clients, translating goals into site structure, content priorities, and milestone plans; kept progress visible on a lightweight board.",
            "Explored adjacent offerings (web-based phone systems, branding/identity) to expand packages and improve proposals.",
            "Handled launch logistics end-to-end: DNS/hosting setup, basic analytics, QA checklists, and clear ownership handoff.",
        ]
    ),
]

PROJECT_DATA = [
    ProjectItem(
        id=1,
        slug="testing-equipment-repair-pipeline-dashboard",
        title="Testing Equipment Repair Pipeline Dashboard",
        abstract=("Full‑stack dashboard aggregating multi‑DB repair data across seven stages. "
                  "I owned the FastAPI/MySQL backend, integrated a React/TypeScript UI, and led Scrum to deliver in five weeks."),
        description=(
            "A full‑stack dashboard that aggregates component data from multiple databases to track repair components across "
            "seven pipeline stages. Delivered in five weeks, it normalizes disparate schemas, exposes a FastAPI "
            "service layer, and integrates with a React/TypeScript UI for fast, paginated filtering and lookups. "
            "I owned the backend architecture (FastAPI, Pydantic, MySQL), integrated the API with the frontend, and "
            "led Scrum to translate stakeholder feedback into shippable increments while negotiating scope to meet deadlines."
        ),
        link="/projects/testing-equipment-repair-pipeline-dashboard",
        thumbnail="/assets/images/dashboard-thumbnail.jpg",
        stack=[
            "FastAPI", "Python", "MySQL", "React", "TypeScript",
            "Vite", "Ant Design", "GitHub", "Jira",
        ],
        bullets=[
            "Owned backend architecture: designed data models and REST endpoints with Pydantic, authored SQL schemas, and enforced clear API contracts.",
            "Solved cross‑stack issues: fixed pagination and data‑shape mismatches so large datasets rendered correctly and quickly in the UI.",
            "Integrated API with React/TypeScript: typed fetch layer, error handling, and responsive table/filters for fast, reliable workflows.",
            "Led Scrum: facilitated stand‑ups, sprint planning, and retros; managed Jira board; kept scope and velocity aligned with client priorities.",
            "Negotiated scope to hit deadline: de‑scoped historical charts/graphical time‑series in favor of high‑value operational metrics.",
            "Authored artifacts that leveled up the team: system architecture diagram and API docs to align developers and stakeholders.",
            "Drove stakeholder communication: frequent demos and concise status updates translating technical detail into business outcomes.",
            "Unblocked teammates: environment setup help, code reviews, and pair‑debugging to keep the team moving under tight timelines.",
            "Raised quality under pressure: balanced rapid iteration with disciplined contracts/tests to minimize regressions during fast roll‑outs.",
            "Reflections: would delegate more evenly and tighten daily standups to surface blockers earlier and improve throughput."
        ]
    ),
    ProjectItem(
        id=2,
        slug="clue",
        title="Clue Game: Shopping Mall Edition",
        abstract=(
            "Java AWT desktop adaptation of the classic Clue game. Built a clean rules engine, "
            "deterministic turn system, and an event‑driven AWT UI; packaged as a single runnable JAR."
        ),
        description=(
            "A desktop adaptation of Clue implemented in pure Java AWT. The project focuses on solid object oriented design and "
            "separation of concerns: a testable rules engine (suspects, weapons, rooms, deck/shuffling, dealing, "
            "suggestions, and accusations) is decoupled from the event‑driven UI. The engine exposes a simple API "
            "for advancing turns and validating moves, while the AWT layer handles input (mouse/keyboard) and "
            "renders a tile‑based board with clear feedback for legal moves and actions. The result is a compact, "
            "deterministic game loop that’s easy to reason about and extend. Packaged as a single runnable JAR for "
            "simple distribution, download link below."
        ),
        link="/projects/clue",
        thumbnail="/assets/images/clue-thumbnail.jpg",
        stack=["Java", "AWT", "OOP", "Eclipse", "Git"],  # Eclipse + Git
        bullets=[
            "Rules Engine: Modeled suspects, rooms, weapons, deck/shuffling, dealing, suggestions, and accusations with clear invariants.",
            "Turn System & State Management: Finite‑state flow for phases (roll/move/suggest/resolve) keeps game logic predictable.",
            "Event‑Driven AWT UI: Mouse/keyboard listeners coordinate with the engine; view updates react to state changes.",
            "Rendering: Tile‑based board drawing using Java AWT with clear highlights for legal moves.",
            "Movement Targets Algorithm: Recursive flood‑fill computes all reachable tiles for a given roll (no diagonal movement), accounting for walls/doors.",
            "Testing: Robust JUnit tests for rules validation, movement targets, and turn transitions.",
            "Collaboration & Git: Pair programmed key features and maintained clean history with branches, PRs, and code reviews.",
            "Packaging & Distribution: Built as a single runnable JAR for simple distribution and easy local play.",
        ],
        jar_url="/assets/jars/clue.jar",
    ),
    ProjectItem(
        id=3,
        slug="connect-four",
        title="Connect Four",
        abstract=(
            "Simple terminal-based Connect Four implemented in modern C++. Players can choose their own symbols, and the game features a straightforward ASCII interface."
        ),
        description=(
            "A terminal-based Connect Four game implemented in modern C++. Two local players take turns dropping custom tokens into a 7x6 grid, racing to connect four in a row horizontally, vertically, or diagonally. The game alternates who starts each round for fairness, supports replaying multiple rounds in one session, and can export a nicely formatted game log (including each board state and outcomes) to a file. Built with g++ and a Makefile, the target is a statically linked Windows executable for zero-dependency distribution."
        ),
        link="/games/connect-four",  # use games route
        thumbnail="/assets/images/connectfour-thumbnail.JPG",  # match existing file in /web/public/assets/images/
        stack=["C++17", "Makefile", "Git"],
        bullets=[
            "Clear OOP Design: Classes for Game, Board, Player, and CLI handle distinct responsibilities.",
            "Reliable Gameplay Loop: Alternating turns, input validation, and win/draw detection ensure smooth play.",
            "Robust Input Handling: Validates column choices, handles invalid input gracefully, and prompts re-entry.",
            "Accurate Win Detection: Checks horizontal, vertical, and diagonal connections after each move.",
            "Clean Readable UI in Terminal: ASCII board rendering with clear prompts and status updates.",
            "Game Logging: Exports detailed game logs with board states and outcomes to a text file.",
            "Manual Memory Management: Careful use of dynamic memory and exception handling around file I/O.",
            "First Project: My first C++ project, built from scratch to learn the language and OOP principles."
        ],
    ),
]

# Slugs that should be treated as "games" instead of general projects
GAMES_SLUGS = {"clue", "connect-four"}