from typing import List, Dict
from .base_scraper import BaseScraper

async def scrape_store(scraper: BaseScraper, query: str) -> List[Dict]:
    return await scraper.search_products(query)