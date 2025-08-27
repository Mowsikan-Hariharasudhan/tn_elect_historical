import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';


const SearchFilters = ({ filters, onFiltersChange, onClearFilters, language }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const partyOptions = [
    { value: '', label: language === 'en' ? 'All Parties' : 'அனைத்து கட்சிகள்' },
    { value: 'DMK', label: 'DMK - Dravida Munnetra Kazhagam' },
    { value: 'AIADMK', label: 'AIADMK - All India Anna Dravida Munnetra Kazhagam' },
    { value: 'INC', label: 'INC - Indian National Congress' },
    { value: 'BJP', label: 'BJP - Bharatiya Janata Party' },
    { value: 'PMK', label: 'PMK - Pattali Makkal Katchi' },
    { value: 'MDMK', label: 'MDMK - Marumalarchi Dravida Munnetra Kazhagam' },
    { value: 'VCK', label: 'VCK - Viduthalai Chiruthaigal Katchi' },
    { value: 'DMDK', label: 'DMDK - Desiya Murpokku Dravida Kazhagam' },
    { value: 'TVK', label: 'TVK - Tamilaga Vettri Kazhagam' },
    { value: 'NTK', label: 'NTK - Naam Tamilar Katchi' }
  ];

  const genderOptions = [
    { value: '', label: language === 'en' ? 'All Genders' : 'அனைத்து பாலினம்' },
    { value: 'M', label: language === 'en' ? 'Male' : 'ஆண்' },
    { value: 'F', label: language === 'en' ? 'Female' : 'பெண்' }
  ];

  const statusOptions = [
    { value: '', label: language === 'en' ? 'All Status' : 'அனைத்து நிலை' },
    { value: 'Active', label: language === 'en' ? 'Active' : 'செயலில்' },
    { value: 'Retired', label: language === 'en' ? 'Retired' : 'ஓய்வு பெற்ற' },
    { value: 'Deceased', label: language === 'en' ? 'Deceased' : 'மறைந்த' }
  ];

  const educationOptions = [
    { value: '', label: language === 'en' ? 'All Education Levels' : 'அனைத்து கல்வி நிலை' },
    { value: 'Graduate', label: language === 'en' ? 'Graduate' : 'பட்டதாரி' },
    { value: 'Post Graduate', label: language === 'en' ? 'Post Graduate' : 'முதுகலை' },
    { value: 'Professional', label: language === 'en' ? 'Professional' : 'தொழில்முறை' },
    { value: 'Doctorate', label: language === 'en' ? 'Doctorate' : 'முனைவர்' },
    { value: 'Others', label: language === 'en' ? 'Others' : 'மற்றவை' }
  ];

  const yearOptions = [
    { value: '', label: language === 'en' ? 'All Years' : 'அனைத்து ஆண்டுகள்' },
    { value: '2021', label: '2021' },
    { value: '2016', label: '2016' },
    { value: '2011', label: '2011' },
    { value: '2006', label: '2006' },
    { value: '2001', label: '2001' },
    { value: '1996', label: '1996' },
    { value: '1991', label: '1991' },
    { value: '1989', label: '1989' },
    { value: '1984', label: '1984' },
    { value: '1980', label: '1980' },
    { value: '1977', label: '1977' },
    { value: '1971', label: '1971' },
    { value: '1967', label: '1967' },
    { value: '1962', label: '1962' },
    { value: '1957', label: '1957' },
    { value: '1952', label: '1952' }
  ];

  const handleInputChange = (field, value) => {
    onFiltersChange({
      ...filters,
      [field]: value
    });
  };

  const hasActiveFilters = () => {
    return Object.values(filters)?.some(value => value && value !== '');
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-6">
      {/* Search Input */}
      <div className="mb-4">
        <Input
          type="search"
          placeholder={language === 'en' ? 'Search candidates by name, constituency...' : 'வேட்பாளர் பெயர், தொகுதி மூலம் தேடுங்கள்...'}
          value={filters?.search}
          onChange={(e) => handleInputChange('search', e?.target?.value)}
          className="w-full"
        />
      </div>
      {/* Quick Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <Select
          placeholder={language === 'en' ? 'Select Party' : 'கட்சி தேர்வு'}
          options={partyOptions}
          value={filters?.party}
          onChange={(value) => handleInputChange('party', value)}
        />
        
        <Select
          placeholder={language === 'en' ? 'Select Gender' : 'பாலினம் தேர்வு'}
          options={genderOptions}
          value={filters?.gender}
          onChange={(value) => handleInputChange('gender', value)}
        />
        
        <Select
          placeholder={language === 'en' ? 'Select Status' : 'நிலை தேர்வு'}
          options={statusOptions}
          value={filters?.status}
          onChange={(value) => handleInputChange('status', value)}
        />
        
        <Select
          placeholder={language === 'en' ? 'Election Year' : 'தேர்தல் ஆண்டு'}
          options={yearOptions}
          value={filters?.year}
          onChange={(value) => handleInputChange('year', value)}
        />
      </div>
      {/* Advanced Filters Toggle */}
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          onClick={() => setIsExpanded(!isExpanded)}
          iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
          iconPosition="right"
          className="text-sm"
        >
          {language === 'en' ? 'Advanced Filters' : 'மேம்பட்ட வடிகட்டிகள்'}
        </Button>
        
        {hasActiveFilters() && (
          <Button
            variant="outline"
            size="sm"
            onClick={onClearFilters}
            iconName="X"
            iconPosition="left"
          >
            {language === 'en' ? 'Clear All' : 'அனைத்தையும் அழிக்க'}
          </Button>
        )}
      </div>
      {/* Advanced Filters */}
      {isExpanded && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            <Select
              label={language === 'en' ? 'Education Level' : 'கல்வி நிலை'}
              options={educationOptions}
              value={filters?.education}
              onChange={(value) => handleInputChange('education', value)}
            />
            
            <div>
              <Input
                type="number"
                label={language === 'en' ? 'Min Age' : 'குறைந்தபட்ச வயது'}
                placeholder="25"
                value={filters?.minAge}
                onChange={(e) => handleInputChange('minAge', e?.target?.value)}
                min="25"
                max="100"
              />
            </div>
            
            <div>
              <Input
                type="number"
                label={language === 'en' ? 'Max Age' : 'அதிகபட்ச வயது'}
                placeholder="80"
                value={filters?.maxAge}
                onChange={(e) => handleInputChange('maxAge', e?.target?.value)}
                min="25"
                max="100"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Input
                type="number"
                label={language === 'en' ? 'Min Elections Contested' : 'குறைந்தபட்ச தேர்தல்கள்'}
                placeholder="1"
                value={filters?.minElections}
                onChange={(e) => handleInputChange('minElections', e?.target?.value)}
                min="0"
                max="20"
              />
            </div>
            
            <div>
              <Input
                type="number"
                label={language === 'en' ? 'Min Victories' : 'குறைந்தபட்ச வெற்றிகள்'}
                placeholder="0"
                value={filters?.minVictories}
                onChange={(e) => handleInputChange('minVictories', e?.target?.value)}
                min="0"
                max="20"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchFilters;