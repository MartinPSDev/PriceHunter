from abc import ABC, abstractmethod
from typing import List, Dict
import aiohttp
import asyncio
from bs4 import BeautifulSoup

class BaseScraper(ABC):
    def __init__(self, store_name: str, base_url: str):
        self.store_name = store_name
        self.base_url = base_url
        self.session = None

    async def init_session(self):
        if not self.session:
            self.session = aiohttp.ClientSession(
                headers={
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
                }
            )

    async def close_session(self):
        if self.session:
            await self.session.close()
            self.session = None

    @abstractmethod
    async def search_products(self, query: str) -> List[Dict]:
        pass

    async def get_page_content(self, url: str) -> str:
        await self.init_session()
        try:
            async with self.session.get(url) as response:
                return await response.text()
        except Exception as e:
            print(f"Error fetching {url}: {str(e)}")
            return ""