import React from 'react';
import Select from 'react-select';
import { useTranslation } from 'react-i18next';
import { Store } from 'lucide-react';

const storesByCountry: Record<string, Array<{ value: string; label: string }>> = {
  us: [
    { value: 'amazon', label: 'Amazon' },
    { value: 'walmart', label: 'Walmart' },
    { value: 'target', label: 'Target' },
    { value: 'bestbuy', label: 'Best Buy' },
    
  ],
  ar: [
    { value: 'mercadolibre', label: 'Mercado Libre' },
    { value: 'fravega', label: 'Frávega' },
    { value: 'garbarino', label: 'Garbarino' },
    { value: 'coto', label: 'Coto' }, 
    { value: 'carrefour', label: 'Carrefour' }, 
    { value: 'changomas', label: 'Chango Mas' }, 
    { value: 'disco', label: 'Disco' }, 
    { value: 'dia', label: 'Día' }, 
    { value: 'jumbo', label: 'Jumbo' }, 
    { value: 'musimundo', label: 'Musimundo' }, 
    { value: 'vea', label: 'Vea' }, 
    { value: 'walmart', label: 'Walmart' }, 
  ],
  
};

interface StoreSelectorProps {
  country: string;
  selectedStores: string[];
  onChange: (values: string[]) => void;
}

const StoreSelector: React.FC<StoreSelectorProps> = ({
  country,
  selectedStores,
  onChange,
}) => {
  const { t } = useTranslation();
  const stores = storesByCountry[country] || [];

  return (
    <div className="space-y-2">
      <label className="flex items-center space-x-2 text-sm font-medium text-gray-300">
        <Store className="w-4 h-4" />
        <span>{t('selectStores')}</span>
      </label>
      <Select
        isMulti
        value={stores.filter(store => selectedStores.includes(store.value))}
        onChange={(options) => onChange(options.map(opt => opt.value))}
        options={stores}
        className="react-select-container"
        classNamePrefix="react-select"
        theme={(theme) => ({
          ...theme,
          colors: {
            ...theme.colors,
            primary: '#3b82f6',
            primary75: '#60a5fa',
            primary50: '#93c5fd',
            primary25: '#dbeafe',
            neutral0: '#1f2937',
            neutral5: '#374151',
            neutral10: '#4b5563',
            neutral20: '#6b7280',
            neutral30: '#9ca3af',
            neutral40: '#d1d5db',
            neutral50: '#e5e7eb',
            neutral60: '#f3f4f6',
            neutral70: '#f9fafb',
            neutral80: '#ffffff',
            neutral90: '#ffffff',
          },
        })}
      />
    </div>
  );
};

export default StoreSelector;