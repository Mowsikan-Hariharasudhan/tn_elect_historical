import React from 'react';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';


const SortingControls = ({ sortBy, sortOrder, onSortChange, viewMode, onViewModeChange, language }) => {
  const sortOptions = [
    { value: 'name', label: language === 'en' ? 'Name' : 'பெயர்' },
    { value: 'party', label: language === 'en' ? 'Party' : 'கட்சி' },
    { value: 'electionsContested', label: language === 'en' ? 'Elections Contested' : 'போட்டியிட்ட தேர்தல்கள்' },
    { value: 'victories', label: language === 'en' ? 'Victories' : 'வெற்றிகள்' },
    { value: 'successRate', label: language === 'en' ? 'Success Rate' : 'வெற்றி விகிதம்' },
    { value: 'lastElectionYear', label: language === 'en' ? 'Last Election' : 'கடைசி தேர்தல்' },
    { value: 'age', label: language === 'en' ? 'Age' : 'வயது' }
  ];

  const handleSortChange = (field) => {
    if (sortBy === field) {
      // Toggle order if same field
      onSortChange(field, sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      // New field, default to ascending
      onSortChange(field, 'asc');
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
      {/* Sort Controls */}
      <div className="flex items-center space-x-3">
        <span className="text-sm font-medium text-muted-foreground whitespace-nowrap">
          {language === 'en' ? 'Sort by:' : 'வரிसाकरण:'}
        </span>
        <Select
          options={sortOptions}
          value={sortBy}
          onChange={(value) => handleSortChange(value)}
          className="min-w-[150px]"
        />
        <Button
          variant="outline"
          size="sm"
          onClick={() => onSortChange(sortBy, sortOrder === 'asc' ? 'desc' : 'asc')}
          iconName={sortOrder === 'asc' ? 'ArrowUp' : 'ArrowDown'}
        >
          {sortOrder === 'asc' 
            ? (language === 'en' ? 'Asc' : 'आरोही') 
            : (language === 'en' ? 'Desc' : 'अवरोही')
          }
        </Button>
      </div>

      {/* View Mode Controls */}
      <div className="flex items-center space-x-2">
        <span className="text-sm font-medium text-muted-foreground whitespace-nowrap">
          {language === 'en' ? 'View:' : 'दृश्य:'}
        </span>
        <div className="flex border border-border rounded-md overflow-hidden">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => onViewModeChange('grid')}
            iconName="Grid3X3"
            className="rounded-none border-0"
          />
          <Button
            variant={viewMode === 'list' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => onViewModeChange('list')}
            iconName="List"
            className="rounded-none border-0 border-l border-border"
          />
        </div>
      </div>
    </div>
  );
};

export default SortingControls;