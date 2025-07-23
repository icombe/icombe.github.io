from fastapi import APIRouter, HTTPException

from models import PROJECT_DATA, ProjectItem

router = APIRouter(prefix="/api/projects", tags=["projects"])


@router.get("/", response_model=list[ProjectItem])
async def list_projects():
    return PROJECT_DATA


@router.get("/{project_id}", response_model=ProjectItem)
async def get_project(project_id: int):
    for project in PROJECT_DATA:
        if project.id == project_id:
            return project
    raise HTTPException(status_code=404, detail="Project not found")
