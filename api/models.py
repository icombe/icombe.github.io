from pydantic import BaseModel
from typing import List

class ExperienceItem(BaseModel):
    id: int
    company: str
    title: str
    dates: str
    bullets: List[str]

class ProjectItem(BaseModel):
    id: int
    title: str
    description: str
    link: str
    thumbnail: str # placeholder for image URL
    stack: List[str] = []
    bullets: List[str] = [] 

# For video heavy projects use a similar model
class VideoProjectItem(BaseModel):
    id: int
    title: str
    description: str
    video_embeds: List[str]      # list of iframe snippets or YouTube IDs
    thumbnail: str               # placeholder image URL
    stack: List[str] = []
    bullets: List[str] = []

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
        company="Company Two",
        title="Title Two",
        dates="Placeholder Dates 2",
        bullets=["Achievement 2.1", "Achievement 2.2"]
    ),
]

PROJECT_DATA = [
    ProjectItem(
        id=1,
        title="Testing Equipment Repair Pipeline Dashboard",
        description="A full-stack prototype built during a five-week field session to query, "
        "filter, and map test component data from multiple databases into a user-friendly interface.",
        link="", 
        thumbnail="/assets/images/dashboard-thumbnail.jpg",
        stack=[
        "FastAPI", "Python", "MySQL", "React", "TypeScript",
        "Vite", "Ant Design", "GitHub", "Jira",
        ],
        bullets=[
        "Header: “ITE Repair Pipeline Dashboard” top-center for immediate context.",
            "Pipeline Flow: Seven stage cards (Order Request → Deployment) with counts & avg times.",
            "Connectors: Dashed lines & split→merge arrow show diverging repair/build paths.",
            "Filters Panel: Controls for Component Type, Product, Site, plus Apply/View buttons.",
            "Data Table: “All Components” grid with columns for ID, Product, Type, Commitment, etc.",
            "Empty-State: Icon + “No data” helps users know when to adjust filters or wait."
        ]
    ),
    ProjectItem(
        id=2,
        title="Project Two",
        description="Description for project two.",
        link="https://example.com/project-two",
        thumbnail="thumbnail2.jpg"
    ),
]
