from fastapi import APIRouter
from models import PROJECT_DATA, ProjectItem

router = APIRouter(prefix="/api/projects", tags=["projects"])

@router.get("/", response_model=list[ProjectItem])
async def list_projects():
    return PROJECT_DATA
