import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const FilterPanel = ({ filters, onFiltersChange, isOpen, onToggle, language }) => {
  const [localFilters, setLocalFilters] = useState(filters);

  const parties = [
    { id: 'all', name: language === 'en' ? 'All Parties' : 'அனைத்து கட்சிகள்' },
    { id: 'dmk', name: 'DMK' },
    { id: 'aiadmk', name: 'AIADMK' },
    { id: 'inc', name: 'INC' },
    { id: 'bjp', name: 'BJP' },
    { id: 'cpi', name: 'CPI' },
    { id: 'cpim', name: 'CPI(M)' }
  ];

  const constituencies = [
    { id: 'all', name: language === 'en' ? 'All Constituencies' : 'அனைத்து தொகுதிகள்' },
    { id: 'chennai-central', name: language === 'en' ? 'Chennai Central' : 'சென்னை மத்திய' },
    { id: 'coimbatore', name: language === 'en' ? 'Coimbatore' : 'கோயம்புத்தூர்' },
    { id: 'madurai', name: language === 'en' ? 'Madurai' : 'மதுரை' },
    { id: 'salem', name: language === 'en' ? 'Salem' : 'சேலம்' },
    { id: 'tiruchirappalli', name: language === 'en' ? 'Tiruchirappalli' : 'திருச்சிராப்பள்ளி' }
  ];

  const handleFilterChange = (key, value) => {
    const newFilters = { ...localFilters, [key]: value };
    setLocalFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleReset = () => {
    const resetFilters = {
      yearRange: [1952, 2021],
      party: 'all',
      constituency: 'all',
      turnoutRange: [0, 100]
    };
    setLocalFilters(resetFilters);
    onFiltersChange(resetFilters);
  };

  const content = (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">
          {language === 'en' ? 'Filters' : 'வடிகட்டிகள்'}
        </h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleReset}
          iconName="RotateCcw"
          iconSize={16}
        >
          {language === 'en' ? 'Reset' : 'மீட்டமை'}
        </Button>
      </div>

      {/* Year Range */}
      <div className="space-y-3">
        <label className="text-sm font-medium text-foreground">
          {language === 'en' ? 'Year Range' : 'ஆண்டு வரம்பு'}
        </label>
        <div className="grid grid-cols-2 gap-3">
          <Input
            type="number"
            placeholder={language === 'en' ? 'From' : 'இருந்து'}
            value={localFilters?.yearRange?.[0]}
            onChange={(e) => handleFilterChange('yearRange', [parseInt(e?.target?.value) || 1952, localFilters?.yearRange?.[1]])}
            min="1952"
            max="2021"
          />
          <Input
            type="number"
            placeholder={language === 'en' ? 'To' : 'வரை'}
            value={localFilters?.yearRange?.[1]}
            onChange={(e) => handleFilterChange('yearRange', [localFilters?.yearRange?.[0], parseInt(e?.target?.value) || 2021])}
            min="1952"
            max="2021"
          />
        </div>
      </div>

      {/* Party Filter */}
      <div className="space-y-3">
        <label className="text-sm font-medium text-foreground">
          {language === 'en' ? 'Political Party' : 'அரசியல் கட்சி'}
        </label>
        <div className="grid grid-cols-1 gap-2">
          {parties?.map((party) => (
            <label key={party?.id} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="radio"
                name="party"
                value={party?.id}
                checked={localFilters?.party === party?.id}
                onChange={(e) => handleFilterChange('party', e?.target?.value)}
                className="w-4 h-4 text-primary border-border focus:ring-ring"
              />
              <span className="text-sm text-foreground">{party?.name}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Constituency Filter */}
      <div className="space-y-3">
        <label className="text-sm font-medium text-foreground">
          {language === 'en' ? 'Constituency' : 'தொகுதி'}
        </label>
        <select
          value={localFilters?.constituency}
          onChange={(e) => handleFilterChange('constituency', e?.target?.value)}
          className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        >
          {constituencies?.map((constituency) => (
            <option key={constituency?.id} value={constituency?.id}>
              {constituency?.name}
            </option>
          ))}
        </select>
      </div>

      {/* Turnout Range */}
      <div className="space-y-3">
        <label className="text-sm font-medium text-foreground">
          {language === 'en' ? 'Voter Turnout (%)' : 'வாக்குப்பதிவு (%)'}
        </label>
        <div className="grid grid-cols-2 gap-3">
          <Input
            type="number"
            placeholder={language === 'en' ? 'Min %' : 'குறைந்தபட்ச %'}
            value={localFilters?.turnoutRange?.[0]}
            onChange={(e) => handleFilterChange('turnoutRange', [parseInt(e?.target?.value) || 0, localFilters?.turnoutRange?.[1]])}
            min="0"
            max="100"
          />
          <Input
            type="number"
            placeholder={language === 'en' ? 'Max %' : 'அதிகபட்ச %'}
            value={localFilters?.turnoutRange?.[1]}
            onChange={(e) => handleFilterChange('turnoutRange', [localFilters?.turnoutRange?.[0], parseInt(e?.target?.value) || 100])}
            min="0"
            max="100"
          />
        </div>
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
          iconName="Filter"
          iconPosition="left"
          fullWidth
        >
          {language === 'en' ? 'Filters' : 'வடிகட்டிகள்'}
        </Button>
      </div>

      {/* Mobile Filter Panel */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-background/80 backdrop-blur-sm">
          <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border rounded-t-lg p-6 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">
                {language === 'en' ? 'Filters' : 'வடிகட்டிகள்'}
              </h3>
              <Button variant="ghost" size="sm" onClick={onToggle}>
                <Icon name="X" size={20} />
              </Button>
            </div>
            {content}
          </div>
        </div>
      )}

      {/* Desktop Filter Panel */}
      <div className="hidden lg:block bg-card border border-border rounded-lg p-6">
        {content}
      </div>
    </>
  );
};

export default FilterPanel;