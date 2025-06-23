from fastapi import APIRouter
from models import EXPERIENCE_DATA, ExperienceItem

router = APIRouter(prefix="/api/experience", tags=["experience"])

@router.get("/", response_model=list[ExperienceItem])
async def list_experience():
    return EXPERIENCE_DATA
