from fastapi import APIRouter, HTTPException
from typing import List
from ..services.scraping_service import ScrapingService
from pydantic import BaseModel

router = APIRouter()
scraping_service = ScrapingService()

class ScrapingRequest(BaseModel):
    query: str
    stores: List[str]
    export_format: str
    filename: str

@router.post("/scrape")
async def scrape_products(request: ScrapingRequest):
    try:
        results = await scraping_service.scrape_all_stores(
            request.query,
            request.stores
        )
        
        scraping_service.export_results(
            results,
            request.export_format,
            request.filename
        )
        
        return {
            "status": "success",
            "message": f"Results exported to {request.filename}.{request.export_format}",
            "product_count": len(results)
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))