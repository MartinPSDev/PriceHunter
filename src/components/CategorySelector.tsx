import React from 'react';
import Select from 'react-select';
import { useTranslation } from 'react-i18next';
import { Tags } from 'lucide-react';

const categories = [
  { value: 'electronics', label: 'Electronics' },
  { value: 'perfumes', label: 'Perfumes & Cosmetics' },
  { value: 'home', label: 'Home & Garden' },
  { value: 'fashion', label: 'Fashion' },
  { value: 'sports', label: 'Sports & Outdoors' },
  { value: 'toys', label: 'Toys & Games' },
  { value: 'books', label: 'Books' },
  { value: 'automotive', label: 'Automotive' },
];

interface CategorySelectorProps {
  value: string;
  onChange: (value: string) => void;
}

const CategorySelector: React.FC<CategorySelectorProps> = ({ value, onChange }) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-2">
      <label className="flex items-center space-x-2 text-sm font-medium text-gray-300">
        <Tags className="w-4 h-4" />
        <span>{t('selectCategory')}</span>
      </label>
      <Select
        value={categories.find(c => c.value === value)}
        onChange={(option) => onChange(option?.value || '')}
        options={categories}
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

export default CategorySelector;