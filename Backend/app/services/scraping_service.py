import asyncio
from typing import List, Dict
import pandas as pd
from ..scrapers import MercadoLibreScraper, CotoScraper, scrape_store
from fastapi import HTTPException

class ScrapingService:
    def __init__(self):
        self.scrapers = {
            'mercadolibre': MercadoLibreScraper(),
            'coto': CotoScraper(),
            # Agrega más scrapers aquí si es necesario
        }

    async def scrape_all_stores(self, query: str, stores: List[str]) -> List[Dict]:
        tasks = []
        for store in stores:
            scraper = self.scrapers.get(store)
            if scraper:
                tasks.append(scrape_store(scraper, query))
            else:
                raise HTTPException(status_code=404, detail=f"Scraper for store '{store}' not found")
        
        results = await asyncio.gather(*tasks)
        return [item for sublist in results for item in sublist]

    def export_results(self, results: List[Dict], format: str, filename: str):
        # Convert results to DataFrame
        df = pd.DataFrame(results)
        df_pivot = df.pivot(columns='store', values='price', index='title')
        df_pivot = df_pivot.sort_values(by=df_pivot.columns[0])  

        if format == 'excel':
            df_pivot.to_excel(f"{filename}.xlsx")
        elif format == 'csv':
            df_pivot.to_csv(f"{filename}.csv")
        elif format == 'json':
            df_pivot.to_json(f"{filename}.json", orient='table')
        else:
            raise HTTPException(status_code=400, detail="Unsupported export format")