from fastapi import APIRouter, HTTPException
from typing import List, Dict, Any
from models import PROJECT_DATA, ProjectItem, GAMES_SLUGS

router = APIRouter(prefix="/api/projects", tags=["projects"])

# Map per‑project download info to what's in /web/public/assets/downloads/
DOWNLOADS: Dict[str, Dict[str, Any]] = {
    "clue": {
        "primaryHref": "/assets/downloads/clue.jar",
        "primaryLabel": "⬇ Download Clue (JAR)",
        "secondaryHref": "https://www.java.com/en/download/manual.jsp",
        "secondaryLabel": "☕ Get Java",
    },
    # Connect Four: NO secondary link
    "connect-four": {
        "primaryHref": "/assets/downloads/ConnectFour.zip",
        "primaryLabel": "⬇ Download Connect Four (ZIP)",
        # no secondaryHref/secondaryLabel here
    },
}

def with_download(p: ProjectItem) -> Dict[str, Any]:
    data = p.model_dump()
    d = DOWNLOADS.get(p.slug)
    if d:
        # Filter out any falsy values so we don't send empty secondary buttons
        data["download"] = {k: v for k, v in d.items() if v}
    return data

@router.get("", response_model=List[Dict[str, Any]])
async def list_projects():
    return [with_download(p) for p in PROJECT_DATA if p.slug not in GAMES_SLUGS]

@router.get("/slug/{slug}", response_model=Dict[str, Any])
async def get_project_by_slug(slug: str):
    for p in PROJECT_DATA:
        if p.slug == slug and slug not in GAMES_SLUGS:
            return with_download(p)
    raise HTTPException(status_code=404, detail="Project not found")
