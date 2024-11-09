from fastapi import FastAPI
from .scraping import router as scraping_router

app = FastAPI()

app.include_router(scraping_router, prefix="/api/scraping", tags=["scraping"])