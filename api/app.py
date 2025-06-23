from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routes.experience import router as exp_router
from routes.projects import router as proj_router

app = FastAPI()

# Allow React dev server to call our API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/health")
async def health():
    return {"status": "ok"}

# Include our new routers
app.include_router(exp_router)
app.include_router(proj_router)
