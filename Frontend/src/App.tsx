import  { useState } from 'react';
import { Settings, ShoppingCart, Search } from 'lucide-react';
import CountrySelector from './components/CountrySelector';
import StoreSelector from './components/StoreSelector';
import CategorySelector from './components/CategorySelector';
import ExportFormatSelector from './components/ExportFormatSelector';
import LanguageSelector from './components/LanguageSelector';
import { useTranslation } from 'react-i18next';

function App() {
  const { t } = useTranslation();
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedStores, setSelectedStores] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [exportFormat, setExportFormat] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleStartScraping = async () => {
    setErrorMessage(''); 
    setSuccessMessage(''); 

    try {
      const response = await fetch('http://127.0.0.1:8000/api/scraping/scrape', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: selectedCategory, 
          stores: selectedStores,
          export_format: exportFormat,
          filename: 'resultado', 
        }),
      });

      if (!response.ok) {
        throw new Error('Error en la solicitud de scraping');
      }

      const data = await response.json();
      console.log('Resultados de scraping:', data);
      setSuccessMessage(`Resultados exportados a ${data.filename}.${data.export_format}`); 

    } catch (error) {
      console.error('Error al iniciar el scraping:', error);
      setErrorMessage('Error al iniciar el scraping. Por favor, inténtalo de nuevo.'); 
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Header */}
      <header className="bg-gray-800 shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <ShoppingCart className="w-8 h-8 text-blue-400" />
              <h1 className="text-2xl font-bold text-blue-400">
                {t('appName')}
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <LanguageSelector />
              <button className="p-2 hover:bg-gray-700 rounded-full">
                <Settings className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Selection Form */}
          <div className="bg-gray-800 rounded-lg shadow-xl p-6 space-y-6">
            <CountrySelector
              value={selectedCountry}
              onChange={setSelectedCountry}
            />
            
            {selectedCountry && (
              <StoreSelector
                country={selectedCountry}
                selectedStores={selectedStores}
                onChange={setSelectedStores}
              />
            )}
            
            {selectedStores.length > 0 && (
              <CategorySelector
                value={selectedCategory}
                onChange={setSelectedCategory}
              />
            )}
            
            {selectedCategory && (
              <ExportFormatSelector
                value={exportFormat}
                onChange={setExportFormat}
              />
            )}

            {/* Start Button */}
            {exportFormat && (
              <button
                onClick={handleStartScraping}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center space-x-2 transition duration-200"
              >
                <Search className="w-5 h-5" />
                <span>{t('startScraping')}</span>
              </button>
            )}

            {/* Mensajes de error y éxito */}
            {errorMessage && <div className="text-red-500">{errorMessage}</div>}
            {successMessage && <div className="text-green-500">{successMessage}</div>}
          </div>

          {/* Features Section */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">{t('multiStore')}</h3>
              <p className="text-gray-400">{t('multiStoreDesc')}</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">{t('priceComparison')}</h3>
              <p className="text-gray-400">{t('priceComparisonDesc')}</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">{t('multiFormat')}</h3>
              <p className="text-gray-400">{t('multiFormatDesc')}</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;