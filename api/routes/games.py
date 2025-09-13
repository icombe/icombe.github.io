from fastapi import APIRouter, HTTPException
from typing import List, Dict, Any
from models import PROJECT_DATA, ProjectItem, GAMES_SLUGS
from routes.projects import with_download  # reuse same shaping/overrides

router = APIRouter(prefix="/api/games", tags=["games"])

@router.get("", response_model=List[Dict[str, Any]])
async def list_games():
    return [with_download(p) for p in PROJECT_DATA if p.slug in GAMES_SLUGS]

@router.get("/slug/{slug}", response_model=Dict[str, Any])
async def get_game_by_slug(slug: str):
    for p in PROJECT_DATA:
        if p.slug == slug and slug in GAMES_SLUGS:
            return with_download(p)
    raise HTTPException(status_code=404, detail="Game not found")