from .base_scraper import BaseScraper
from typing import List, Dict, Any
from bs4 import BeautifulSoup
import re

class CotoScraper(BaseScraper):
    def __init__(self):
        super().__init__("Coto", "https://www.cotodigital.com.ar/")

    async def search_products(self, query: str) -> List[Dict[str, Any]]:
        search_url = f"{self.base_url}/search?q={query}"
        content = await self.get_page_content(search_url)
        soup = BeautifulSoup(content, 'html.parser')
        
        products = []
        items = soup.select('.product-item')[:10]  
        
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
        title_elem = item.select_one('.product-title')
        return title_elem.text.strip() if title_elem else "Título no disponible"

    def extract_price(self, item) -> float:
        price_elem = item.select_one('.product-price')
        if not price_elem:
            return 0.0
        try:
            # Eliminar caracteres no numéricos excepto el punto decimal
            price_text = re.sub(r'[^\d.]', '', price_elem.text)
            # Si hay múltiples puntos, mantener solo el último (formato argentino)
            if price_text.count('.') > 1:
                parts = price_text.split('.')
                price_text = ''.join(parts[:-1]) + '.' + parts[-1]
            return float(price_text) if price_text else 0.0
        except Exception as e:
            print(f"Error al extraer precio: {str(e)}")
            return 0.0