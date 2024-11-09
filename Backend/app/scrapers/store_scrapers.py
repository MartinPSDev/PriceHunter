from .base_scraper import BaseScraper
from typing import List, Dict
from bs4 import BeautifulSoup
import re

class MercadoLibreScraper(BaseScraper):
    def __init__(self):
        super().__init__("Mercado Libre", "https://www.mercadolibre.com.ar")

    async def search_products(self, query: str) -> List[Dict]:
        search_url = f"{self.base_url}/search?q={query}"
        content = await self.get_page_content(search_url)
        soup = BeautifulSoup(content, 'html.parser')
        
        products = []
        items = soup.select('.ui-search-layout__item')
        
        for item in items[:10]:  
            try:
                title = item.select_one('.ui-search-item__title').text.strip()
                price_elem = item.select_one('.price-tag-fraction')
                price = float(re.sub(r'[^\d.]', '', price_elem.text)) if price_elem else 0
                
                products.append({
                    'store': self.store_name,
                    'title': title,
                    'price': price,
                })
            except Exception as e:
                print(f"Error parsing product: {str(e)}")
                continue
                
        return products

class CotoScraper(BaseScraper):
    def __init__(self):
        super().__init__("Coto", "https://www.coto.com.ar")

    async def search_products(self, query: str) -> List[Dict]:
        # Coto
        pass

