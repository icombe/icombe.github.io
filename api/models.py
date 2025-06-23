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
    thumbnail: str  # placeholder for now

# Placeholder data—replace these numbered items later
EXPERIENCE_DATA = [
    ExperienceItem(
        id=1,
        company="Company One",
        title="Title One",
        dates="Placeholder Dates 1",
        bullets=["Achievement 1.1", "Achievement 1.2"]
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
        title="Project One",
        description="Description for project one.",
        link="https://example.com/project-one",
        thumbnail="thumbnail1.jpg"
    ),
    ProjectItem(
        id=2,
        title="Project Two",
        description="Description for project two.",
        link="https://example.com/project-two",
        thumbnail="thumbnail2.jpg"
    ),
]
