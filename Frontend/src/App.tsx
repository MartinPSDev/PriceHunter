import React, { useState } from 'react';
import { Settings, ShoppingCart, Download, Search } from 'lucide-react';
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

  const handleStartScraping = async () => {
    // This will be implemented when we connect to the backend
    console.log('Starting scraping with:', {
      country: selectedCountry,
      stores: selectedStores,
      category: selectedCategory,
      format: exportFormat
    });
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