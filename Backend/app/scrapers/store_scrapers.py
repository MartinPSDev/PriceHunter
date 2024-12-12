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
        items = soup.select('.ui-search-layout__item')[:10]  
        
        for item in items:
            try:
                title = self.extract_title(item)
                price = self.extract_price(item)
                
                products.append({
                    'store': self.store_name,
                    'title': title,
                    'price': price,
                })
            except Exception as e:
                print(f"Error parsing product: {str(e)}")
                
        return products

    def extract_title(self, item) -> str:
        
        title_elem = item.select_one('.ui-search-item__title')
        return title_elem.text.strip() if title_elem else "Título no disponible"

    def extract_price(self, item) -> float:
        
        price_elem = item.select_one('.price-tag-fraction')
        return float(re.sub(r'[^\d.]', '', price_elem.text)) if price_elem else 0.0

class CotoScraper(BaseScraper):
    def __init__(self):
        super().__init__("Coto", "https://www.coto.com.ar")

    async def search_products(self, query: str) -> List[Dict]:
        search_url = f"{self.base_url}/search?q={query}"
        content = await self.get_page_content(search_url)
        soup = BeautifulSoup(content, 'html.parser')
        
        products = []
        items = soup.select('.product-item')  
        
        for item in items[:10]:  
            try:
                title = self.extract_title(item)
                price = self.extract_price(item)
                
                products.append({
                    'store': self.store_name,
                    'title': title,
                    'price': price,
                })
            except Exception as e:
                print(f"Error parsing product: {str(e)}")
                
        return products

    def extract_title(self, item) -> str:
        
        title_elem = item.select_one('.product-title')  
        return title_elem.text.strip() if title_elem else "Título no disponible"

    def extract_price(self, item) -> float:
        
        price_elem = item.select_one('.product-price')  
        return float(re.sub(r'[^\d.]', '', price_elem.text)) if price_elem else 0.0