import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const FilterPanel = ({ filters, onFiltersChange, language, isOpen, onToggle }) => {
  const [localFilters, setLocalFilters] = useState(filters);

  const timeRangeOptions = [
    { value: 'all', label: language === 'en' ? 'All Years' : 'அனைத்து ஆண்டுகள்' },
    { value: '1950-1970', label: '1950-1970' },
    { value: '1971-1990', label: '1971-1990' },
    { value: '1991-2010', label: '1991-2010' },
    { value: '2011-2025', label: '2011-2025' }
  ];

  const constituencyTypeOptions = [
    { value: 'all', label: language === 'en' ? 'All Types' : 'அனைத்து வகைகள்' },
    { value: 'urban', label: language === 'en' ? 'Urban' : 'நகர்ப்புற' },
    { value: 'rural', label: language === 'en' ? 'Rural' : 'கிராமப்புற' },
    { value: 'semi-urban', label: language === 'en' ? 'Semi-Urban' : 'அரை நகர்ப்புற' }
  ];

  const performanceMetricOptions = [
    { value: 'voteShare', label: language === 'en' ? 'Vote Share' : 'வாக்கு பங்கு' },
    { value: 'seats', label: language === 'en' ? 'Seats Won' : 'வென்ற இடங்கள்' },
    { value: 'margin', label: language === 'en' ? 'Victory Margin' : 'வெற்றி வித்தியாசம்' },
    { value: 'turnout', label: language === 'en' ? 'Voter Turnout' : 'வாக்காளர் வருகை' }
  ];

  const allianceOptions = [
    { value: 'all', label: language === 'en' ? 'All Elections' : 'அனைத்து தேர்தல்கள்' },
    { value: 'alliance', label: language === 'en' ? 'Alliance Elections' : 'கூட்டணி தேர்தல்கள்' },
    { value: 'solo', label: language === 'en' ? 'Solo Elections' : 'தனித் தேர்தல்கள்' }
  ];

  const handleFilterChange = (key, value) => {
    const updatedFilters = { ...localFilters, [key]: value };
    setLocalFilters(updatedFilters);
    onFiltersChange(updatedFilters);
  };

  const handleCheckboxChange = (key, checked) => {
    const updatedFilters = { ...localFilters, [key]: checked };
    setLocalFilters(updatedFilters);
    onFiltersChange(updatedFilters);
  };

  const resetFilters = () => {
    const defaultFilters = {
      timeRange: 'all',
      constituencyType: 'all',
      performanceMetric: 'voteShare',
      allianceType: 'all',
      showTrends: true,
      showComparison: false,
      includeMinorParties: false
    };
    setLocalFilters(defaultFilters);
    onFiltersChange(defaultFilters);
  };

  const filterContent = (
    <div className="space-y-6">
      {/* Time Range Filter */}
      <div>
        <Select
          label={language === 'en' ? 'Time Period' : 'கால அளவு'}
          options={timeRangeOptions}
          value={localFilters?.timeRange}
          onChange={(value) => handleFilterChange('timeRange', value)}
          className="w-full"
        />
      </div>

      {/* Constituency Type Filter */}
      <div>
        <Select
          label={language === 'en' ? 'Constituency Type' : 'தொகுதி வகை'}
          options={constituencyTypeOptions}
          value={localFilters?.constituencyType}
          onChange={(value) => handleFilterChange('constituencyType', value)}
          className="w-full"
        />
      </div>

      {/* Performance Metric Filter */}
      <div>
        <Select
          label={language === 'en' ? 'Performance Metric' : 'செயல்திறன் அளவீடு'}
          options={performanceMetricOptions}
          value={localFilters?.performanceMetric}
          onChange={(value) => handleFilterChange('performanceMetric', value)}
          className="w-full"
        />
      </div>

      {/* Alliance Type Filter */}
      <div>
        <Select
          label={language === 'en' ? 'Election Type' : 'தேர்தல் வகை'}
          options={allianceOptions}
          value={localFilters?.allianceType}
          onChange={(value) => handleFilterChange('allianceType', value)}
          className="w-full"
        />
      </div>

      {/* Additional Options */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-foreground">
          {language === 'en' ? 'Display Options' : 'காட்சி விருப்பங்கள்'}
        </h4>
        
        <Checkbox
          label={language === 'en' ? 'Show trend lines' : 'போக்கு கோடுகளைக் காட்டு'}
          checked={localFilters?.showTrends}
          onChange={(e) => handleCheckboxChange('showTrends', e?.target?.checked)}
        />
        
        <Checkbox
          label={language === 'en' ? 'Enable party comparison' : 'கட்சி ஒப்பீட்டை இயக்கு'}
          checked={localFilters?.showComparison}
          onChange={(e) => handleCheckboxChange('showComparison', e?.target?.checked)}
        />
        
        <Checkbox
          label={language === 'en' ? 'Include minor parties' : 'சிறு கட்சிகளைச் சேர்க்கவும்'}
          checked={localFilters?.includeMinorParties}
          onChange={(e) => handleCheckboxChange('includeMinorParties', e?.target?.checked)}
        />
      </div>

      {/* Reset Button */}
      <div className="pt-4 border-t border-border">
        <Button
          variant="outline"
          onClick={resetFilters}
          className="w-full"
          iconName="RotateCcw"
          iconPosition="left"
        >
          {language === 'en' ? 'Reset Filters' : 'வடிகட்டிகளை மீட்டமை'}
        </Button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden mb-4">
        <Button
          variant="outline"
          onClick={onToggle}
          className="w-full"
          iconName="Filter"
          iconPosition="left"
        >
          {language === 'en' ? 'Filters' : 'வடிகட்டிகள்'}
          {isOpen && <Icon name="ChevronUp" size={16} className="ml-2" />}
          {!isOpen && <Icon name="ChevronDown" size={16} className="ml-2" />}
        </Button>
      </div>

      {/* Mobile Collapsible Panel */}
      <div className={`lg:hidden ${isOpen ? 'block' : 'hidden'} mb-6`}>
        <div className="bg-card border border-border rounded-lg p-4">
          {filterContent}
        </div>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <div className="bg-card border border-border rounded-lg p-6 sticky top-24">
          <div className="flex items-center space-x-2 mb-6">
            <Icon name="Filter" size={20} className="text-primary" />
            <h3 className="text-lg font-semibold text-foreground">
              {language === 'en' ? 'Filters' : 'வடிகட்டிகள்'}
            </h3>
          </div>
          {filterContent}
        </div>
      </div>
    </>
  );
};

export default FilterPanel;