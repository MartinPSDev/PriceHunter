import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      appName: 'Price Scraper',
      selectCountry: 'Select Country',
      selectStores: 'Select Stores',
      selectCategory: 'Select Category',
      selectFormat: 'Export Format',
      startScraping: 'Start Scraping',
      multiStore: 'Multi-Store Support',
      multiStoreDesc: 'Compare prices across multiple stores simultaneously',
      priceComparison: 'Smart Comparison',
      priceComparisonDesc: 'Intelligent product matching based on specifications',
      multiFormat: 'Multiple Export Formats',
      multiFormatDesc: 'Export data in various formats including PDF, Excel, and more',
    },
  },
  es: {
    translation: {
      appName: 'Comparador de Precios',
      selectCountry: 'Seleccionar País',
      selectStores: 'Seleccionar Tiendas',
      selectCategory: 'Seleccionar Categoría',
      selectFormat: 'Formato de Exportación',
      startScraping: 'Comenzar Búsqueda',
      multiStore: 'Soporte Multi-Tienda',
      multiStoreDesc: 'Compara precios en múltiples tiendas simultáneamente',
      priceComparison: 'Comparación Inteligente',
      priceComparisonDesc: 'Comparación inteligente basada en especificaciones',
      multiFormat: 'Múltiples Formatos',
      multiFormatDesc: 'Exporta datos en varios formatos incluyendo PDF, Excel y más',
    },
  },
  pt: {
    translation: {
      appName: 'Comparador de Preços',
      selectCountry: 'Selecionar País',
      selectStores: 'Selecionar Lojas',
      selectCategory: 'Selecionar Categoria',
      selectFormat: 'Formato de Exportação',
      startScraping: 'Iniciar Busca',
      multiStore: 'Suporte Multi-Loja',
      multiStoreDesc: 'Compare preços em várias lojas simultaneamente',
      priceComparison: 'Comparação Inteligente',
      priceComparisonDesc: 'Comparação inteligente baseada em especificações',
      multiFormat: 'Múltiplos Formatos',
      multiFormatDesc: 'Exporte dados em vários formatos incluindo PDF, Excel e mais',
    },
  },
  fr: {
    translation: {
      appName: 'Comparateur de Prix',
      selectCountry: 'Sélectionner Pays',
      selectStores: 'Sélectionner Magasins',
      selectCategory: 'Sélectionner Catégorie',
      selectFormat: 'Format d\'Export',
      startScraping: 'Démarrer la Recherche',
      multiStore: 'Support Multi-Magasin',
      multiStoreDesc: 'Comparez les prix dans plusieurs magasins simultanément',
      priceComparison: 'Comparaison Intelligente',
      priceComparisonDesc: 'Comparaison intelligente basée sur les spécifications',
      multiFormat: 'Formats Multiples',
      multiFormatDesc: 'Exportez les données dans différents formats dont PDF, Excel et plus',
    },
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;