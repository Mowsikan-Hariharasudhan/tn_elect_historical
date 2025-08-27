import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';

const SearchFilters = ({ filters, onFiltersChange, language }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const partyOptions = [
    { value: '', label: language === 'en' ? 'All Parties' : 'அனைத்து கட்சிகள்' },
    { value: 'AIADMK', label: 'AIADMK' },
    { value: 'DMK', label: 'DMK' },
    { value: 'BJP', label: 'BJP' },
    { value: 'INC', label: 'INC' },
    { value: 'PMK', label: 'PMK' },
    { value: 'MDMK', label: 'MDMK' },
    { value: 'VCK', label: 'VCK' },
    { value: 'DMDK', label: 'DMDK' },
    { value: 'TNCC', label: 'TNCC' },
    { value: 'CPI', label: 'CPI' },
    { value: 'CPM', label: 'CPM' },
    { value: 'IND', label: language === 'en' ? 'Independent' : 'சுயேச்சை' }
  ];

  const constituencyOptions = [
    { value: '', label: language === 'en' ? 'All Constituencies' : 'அனைத்து தொகுதிகள்' },
    { value: 'Chennai Central', label: language === 'en' ? 'Chennai Central' : 'சென்னை மத்திய' },
    { value: 'Chennai North', label: language === 'en' ? 'Chennai North' : 'சென்னை வடக்கு' },
    { value: 'Chennai South', label: language === 'en' ? 'Chennai South' : 'சென்னை தெற்கு' },
    { value: 'Coimbatore', label: language === 'en' ? 'Coimbatore' : 'கோயம்புத்தூர்' },
    { value: 'Madurai', label: language === 'en' ? 'Madurai' : 'மதுரை' },
    { value: 'Salem', label: language === 'en' ? 'Salem' : 'சேலம்' },
    { value: 'Tiruchirappalli', label: language === 'en' ? 'Tiruchirappalli' : 'திருச்சிராப்பள்ளி' },
    { value: 'Tirunelveli', label: language === 'en' ? 'Tirunelveli' : 'திருநெல்வேலி' },
    { value: 'Vellore', label: language === 'en' ? 'Vellore' : 'வேலூர்' },
    { value: 'Erode', label: language === 'en' ? 'Erode' : 'ஈரோடு' }
  ];

  const marginRangeOptions = [
    { value: '', label: language === 'en' ? 'All Margins' : 'அனைத்து வித்தியாசங்கள்' },
    { value: '0-1000', label: language === 'en' ? '0-1,000 votes' : '0-1,000 வாக்குகள்' },
    { value: '1000-5000', label: language === 'en' ? '1,000-5,000 votes' : '1,000-5,000 வாக்குகள்' },
    { value: '5000-10000', label: language === 'en' ? '5,000-10,000 votes' : '5,000-10,000 வாக்குகள்' },
    { value: '10000+', label: language === 'en' ? '10,000+ votes' : '10,000+ வாக்குகள்' }
  ];

  const handleFilterChange = (key, value) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  const clearFilters = () => {
    onFiltersChange({
      searchQuery: '',
      party: '',
      constituency: '',
      marginRange: ''
    });
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">
          {language === 'en' ? 'Search & Filter Results' : 'தேடல் & வடிகட்டி முடிவுகள்'}
        </h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <Icon name={isExpanded ? "ChevronUp" : "ChevronDown"} size={16} />
        </Button>
      </div>
      <div className="space-y-4">
        {/* Search Query */}
        <Input
          type="search"
          placeholder={language === 'en' ? 'Search candidates, parties, constituencies...' : 'வேட்பாளர்கள், கட்சிகள், தொகுதிகள் தேடுக...'}
          value={filters?.searchQuery}
          onChange={(e) => handleFilterChange('searchQuery', e?.target?.value)}
          className="w-full"
        />

        {/* Expanded Filters */}
        {isExpanded && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Select
              label={language === 'en' ? 'Party' : 'கட்சி'}
              options={partyOptions}
              value={filters?.party}
              onChange={(value) => handleFilterChange('party', value)}
            />

            <Select
              label={language === 'en' ? 'Constituency' : 'தொகுதி'}
              options={constituencyOptions}
              value={filters?.constituency}
              onChange={(value) => handleFilterChange('constituency', value)}
              searchable
            />

            <Select
              label={language === 'en' ? 'Victory Margin' : 'வெற்றி வித்தியாசம்'}
              options={marginRangeOptions}
              value={filters?.marginRange}
              onChange={(value) => handleFilterChange('marginRange', value)}
            />
          </div>
        )}

        {/* Clear Filters */}
        {(filters?.searchQuery || filters?.party || filters?.constituency || filters?.marginRange) && (
          <div className="flex justify-end">
            <Button
              variant="outline"
              size="sm"
              onClick={clearFilters}
            >
              <Icon name="X" size={16} className="mr-2" />
              {language === 'en' ? 'Clear Filters' : 'வடிகட்டிகளை அழிக்கவும்'}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchFilters;