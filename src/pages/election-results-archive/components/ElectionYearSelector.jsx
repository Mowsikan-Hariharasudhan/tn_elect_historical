import React from 'react';
import Select from '../../../components/ui/Select';

const ElectionYearSelector = ({ selectedYear, onYearChange, availableYears = [], language }) => {
  const handleYearChange = (value) => {
    onYearChange(parseInt(value));
  };

  return (
    <div className="flex items-center space-x-3">
      <span className="text-sm font-medium text-foreground whitespace-nowrap">
        {language === 'en' ? 'Election Year:' : 'தேர்தல் ஆண்டு:'}
      </span>
      <Select
        value={selectedYear?.toString()}
        onValueChange={handleYearChange}
        className="w-32"
      >
        <Select.Trigger>
          <Select.Value placeholder={language === 'en' ? 'Select Year' : 'ஆண்டு தேர்வு'} />
        </Select.Trigger>
        <Select.Content>
          {availableYears?.map((year) => (
            <Select.Item key={year} value={year?.toString()}>
              {year}
            </Select.Item>
          ))}
        </Select.Content>
      </Select>
    </div>
  );
};

export default ElectionYearSelector;