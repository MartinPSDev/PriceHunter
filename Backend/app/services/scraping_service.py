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
        if not query or not query.strip():
            raise HTTPException(status_code=400, detail="La consulta de búsqueda no puede estar vacía")
            
        if not stores or len(stores) == 0:
            raise HTTPException(status_code=400, detail="Debe seleccionar al menos una tienda para buscar")
            
        tasks = []
        invalid_stores = []
        
        for store in stores:
            scraper = self.scrapers.get(store.lower())
            if scraper:
                tasks.append(scrape_store(scraper, query))
            else:
                invalid_stores.append(store)
        
        if invalid_stores:
            raise HTTPException(status_code=404, detail=f"No se encontraron scrapers para las siguientes tiendas: {', '.join(invalid_stores)}")
        
        try:
            results = await asyncio.gather(*tasks, return_exceptions=True)
            
            # Procesar resultados y manejar excepciones
            processed_results = []
            for i, result in enumerate(results):
                if isinstance(result, Exception):
                    print(f"Error en el scraper {stores[i]}: {str(result)}")
                    # Continuar con otros resultados en caso de error
                else:
                    processed_results.extend(result)
            
            return processed_results
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Error durante el proceso de scraping: {str(e)}")

    def export_results(self, results: List[Dict], format: str, filename: str):
        # Verificar si hay resultados
        if not results:
            raise HTTPException(status_code=404, detail="No se encontraron productos con la búsqueda proporcionada")
            
        try:
            # Convert results to DataFrame
            df = pd.DataFrame(results)
            
            # Crear pivot table
            df_pivot = df.pivot(columns='store', values='price', index='title')
            
            # Ordenar por la primera columna si existe
            if not df_pivot.empty and len(df_pivot.columns) > 0:
                df_pivot = df_pivot.sort_values(by=df_pivot.columns[0])
            
            # Exportar según el formato solicitado
            if format.lower() == 'excel':
                df_pivot.to_excel(f"{filename}.xlsx")
            elif format.lower() == 'csv':
                df_pivot.to_csv(f"{filename}.csv")
            elif format.lower() == 'json':
                df_pivot.to_json(f"{filename}.json", orient='table')
            else:
                raise HTTPException(status_code=400, detail=f"Formato de exportación '{format}' no soportado")
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Error al exportar resultados: {str(e)}")