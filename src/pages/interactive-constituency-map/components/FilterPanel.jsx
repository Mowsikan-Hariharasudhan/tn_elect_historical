import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';

const FilterPanel = ({ 
  language, 
  isOpen, 
  onToggle, 
  filters, 
  onFilterChange, 
  onReset,
  searchQuery,
  onSearchChange,
  searchSuggestions,
  onSuggestionClick
}) => {
  const partyOptions = [
    { value: 'all', label: language === 'en' ? 'All Parties' : 'அனைத்து கட்சிகள்' },
    { value: 'dmk', label: language === 'en' ? 'DMK' : 'திமுக' },
    { value: 'aiadmk', label: language === 'en' ? 'AIADMK' : 'அதிமுக' },
    { value: 'bjp', label: language === 'en' ? 'BJP' : 'பாஜக' },
    { value: 'congress', label: language === 'en' ? 'Congress' : 'காங்கிரஸ்' },
    { value: 'others', label: language === 'en' ? 'Others' : 'மற்றவை' }
  ];

  const yearOptions = [
    { value: 'all', label: language === 'en' ? 'All Years' : 'அனைத்து ஆண்டுகள்' },
    { value: '2021', label: '2021' },
    { value: '2016', label: '2016' },
    { value: '2011', label: '2011' },
    { value: '2006', label: '2006' },
    { value: '2001', label: '2001' }
  ];

  const genderOptions = [
    { value: 'all', label: language === 'en' ? 'All Genders' : 'அனைத்து பாலினங்கள்' },
    { value: 'male', label: language === 'en' ? 'Male' : 'ஆண்' },
    { value: 'female', label: language === 'en' ? 'Female' : 'பெண்' }
  ];

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={onToggle}
        className="lg:hidden fixed top-20 left-4 z-30 bg-primary text-primary-foreground rounded-full p-3 shadow-lg"
        aria-label={language === 'en' ? 'Toggle filters' : 'வடிகட்டிகள் மாற்று'}
      >
        <Icon name="Filter" size={20} />
      </button>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={onToggle}
        />
      )}
      {/* Filter Panel */}
      <div className={`
        fixed lg:relative top-0 left-0 h-full w-80 bg-card border-r border-border z-50
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        overflow-y-auto
      `}>
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-foreground">
              {language === 'en' ? 'Filters' : 'வடிகட்டிகள்'}
            </h2>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={onReset}
                className="text-muted-foreground hover:text-foreground"
              >
                <Icon name="RotateCcw" size={16} />
              </Button>
              <button
                onClick={onToggle}
                className="lg:hidden text-muted-foreground hover:text-foreground"
              >
                <Icon name="X" size={20} />
              </button>
            </div>
          </div>

          {/* Search */}
          <div className="mb-6 relative">
            <Input
              type="search"
              placeholder={language === 'en' ? 'Search constituencies...' : 'தொகுதிகளை தேடுக...'}
              value={searchQuery}
              onChange={(e) => onSearchChange(e?.target?.value)}
              className="pr-10"
            />
            <Icon 
              name="Search" 
              size={16} 
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
            />
            
            {/* Search Suggestions */}
            {searchSuggestions?.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-md shadow-lg max-h-48 overflow-y-auto z-10">
                {searchSuggestions?.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => onSuggestionClick(suggestion)}
                    className="w-full px-3 py-2 text-left hover:bg-muted transition-colors text-sm"
                  >
                    <div className="font-medium">{suggestion?.name}</div>
                    <div className="text-xs text-muted-foreground">{suggestion?.district}</div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Filter Controls */}
          <div className="space-y-6">
            {/* Party Filter */}
            <div>
              <Select
                label={language === 'en' ? 'Party' : 'கட்சி'}
                options={partyOptions}
                value={filters?.party}
                onChange={(value) => onFilterChange('party', value)}
              />
            </div>

            {/* Election Year */}
            <div>
              <Select
                label={language === 'en' ? 'Election Year' : 'தேர்தல் ஆண்டு'}
                options={yearOptions}
                value={filters?.year}
                onChange={(value) => onFilterChange('year', value)}
              />
            </div>

            {/* Gender */}
            <div>
              <Select
                label={language === 'en' ? 'Gender' : 'பாலினம்'}
                options={genderOptions}
                value={filters?.gender}
                onChange={(value) => onFilterChange('gender', value)}
              />
            </div>

            {/* Turnout Range */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                {language === 'en' ? 'Voter Turnout' : 'வாக்காளர் வருகை'} ({filters?.turnout?.[0]}% - {filters?.turnout?.[1]}%)
              </label>
              <div className="px-3">
                <input
                  type="range"
                  min="40"
                  max="90"
                  value={filters?.turnout?.[0]}
                  onChange={(e) => onFilterChange('turnout', [parseInt(e?.target?.value), filters?.turnout?.[1]])}
                  className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer mb-2"
                />
                <input
                  type="range"
                  min="40"
                  max="90"
                  value={filters?.turnout?.[1]}
                  onChange={(e) => onFilterChange('turnout', [filters?.turnout?.[0], parseInt(e?.target?.value)])}
                  className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>

            {/* Victory Margin */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                {language === 'en' ? 'Victory Margin' : 'வெற்றி வித்தியாசம'} (&lt; {filters?.margin}k votes)
              </label>
              <div className="px-3">
                <input
                  type="range"
                  min="1"
                  max="100"
                  value={filters?.margin}
                  onChange={(e) => onFilterChange('margin', parseInt(e?.target?.value))}
                  className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Active Filters Count */}
          <div className="mt-6 pt-6 border-t border-border">
            <div className="text-sm text-muted-foreground">
              {language === 'en' ? 'Active Filters:' : 'செயலில் உள்ள வடிகட்டிகள்:'} 
              <span className="ml-1 font-medium text-foreground">
                {Object.values(filters)?.filter(f => 
                  f !== 'all' && f !== '' && !Array.isArray(f)
                )?.length + (
                  (filters?.turnout?.[0] !== 40 || filters?.turnout?.[1] !== 90) ? 1 : 0
                ) + (filters?.margin !== 100 ? 1 : 0)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterPanel;