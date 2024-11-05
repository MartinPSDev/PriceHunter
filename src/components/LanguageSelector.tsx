import React from 'react';
import Select from 'react-select';
import { useTranslation } from 'react-i18next';
import { Languages } from 'lucide-react';

const languages = [
  { value: 'en', label: 'English' },
  { value: 'es', label: 'Español' },
  { value: 'pt', label: 'Português' },
  { value: 'fr', label: 'Français' },
];

const LanguageSelector: React.FC = () => {
  const { i18n } = useTranslation();

  return (
    <div className="w-40">
      <Select
        value={languages.find(l => l.value === i18n.language)}
        onChange={(option) => option && i18n.changeLanguage(option.value)}
        options={languages}
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

export default LanguageSelector;