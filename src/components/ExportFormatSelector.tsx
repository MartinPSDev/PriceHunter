import React from 'react';
import Select from 'react-select';
import { useTranslation } from 'react-i18next';
import { FileDown } from 'lucide-react';

const formats = [
  { value: 'pdf', label: 'PDF' },
  { value: 'xlsx', label: 'Excel (XLSX)' },
  { value: 'csv', label: 'CSV' },
  { value: 'json', label: 'JSON' },
  { value: 'xml', label: 'XML' },
  { value: 'txt', label: 'Text' },
];

interface ExportFormatSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

const ExportFormatSelector: React.FC<ExportFormatSelectorProps> = ({
  value,
  onChange,
}) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-2">
      <label className="flex items-center space-x-2 text-sm font-medium text-gray-300">
        <FileDown className="w-4 h-4" />
        <span>{t('selectFormat')}</span>
      </label>
      <Select
        value={formats.find(f => f.value === value)}
        onChange={(option) => onChange(option?.value || '')}
        options={formats}
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

export default ExportFormatSelector;