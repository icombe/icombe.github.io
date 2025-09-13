from pathlib import Path
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from routes.projects import router as projects_router
from routes.games import router as games_router
from routes.experience import router as experience_router
from routes.contact import router as contact_router

app = FastAPI()

# Minimal CORS: set this to your deployed origin
ALLOWED_ORIGINS = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "https://icombe.github.io",  # GitHub Pages origin
    # "https://your-custom-domain.com",   # if you add a custom domain
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["*"],
)

# API routes
app.include_router(projects_router)
app.include_router(games_router)
app.include_router(experience_router)
app.include_router(contact_router)

# Serve built SPA
root = Path(__file__).resolve().parents[1]
dist_dir = root / "web" / "dist"
if dist_dir.exists():
    # html=True returns index.html for unknown paths (SPA fallback)
    app.mount("/", StaticFiles(directory=str(dist_dir), html=True), name="spa")
