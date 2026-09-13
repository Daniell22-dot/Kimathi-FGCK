from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from routers import public, admin

app = FastAPI(title="FGCK Nyeri Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(public.router, prefix="/api", tags=["public"])
app.include_router(admin.router, prefix="/api/admin", tags=["admin"])

app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

@app.get("/")
def health():
    return {"status": "ok", "service": "FGCK Nyeri Backend"}
