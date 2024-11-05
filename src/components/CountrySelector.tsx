import React from 'react';
import Select from 'react-select';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

const countries = [
  { value: 'us', label: 'United States' },
  { value: 'ar', label: 'Argentina' },
  { value: 'uy', label: 'Uruguay' },
  { value: 'cl', label: 'Chile' },
  { value: 'mx', label: 'Mexico' },
  { value: 'es', label: 'Spain' }
];

interface CountrySelectorProps {
  value: string;
  onChange: (value: string) => void;
}

const CountrySelector: React.FC<CountrySelectorProps> = ({ value, onChange }) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-2">
      <label className="flex items-center space-x-2 text-sm font-medium text-gray-300">
        <Globe className="w-4 h-4" />
        <span>{t('selectCountry')}</span>
      </label>
      <Select
        value={countries.find(c => c.value === value)}
        onChange={(option) => onChange(option?.value || '')}
        options={countries}
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

export default CountrySelector;