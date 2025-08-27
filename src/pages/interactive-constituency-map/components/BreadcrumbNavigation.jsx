import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BreadcrumbNavigation = ({ language, filters, onFilterRemove, onReset }) => {
  const getActiveFilters = () => {
    const active = [];
    
    if (filters?.party !== 'all') {
      active?.push({
        type: 'party',
        label: language === 'en' ? 'Party' : 'கட்சி',
        value: filters?.party?.toUpperCase(),
        key: 'party'
      });
    }
    
    if (filters?.year !== 'all') {
      active?.push({
        type: 'year',
        label: language === 'en' ? 'Year' : 'ஆண்டு',
        value: filters?.year,
        key: 'year'
      });
    }
    
    if (filters?.gender !== 'all') {
      active?.push({
        type: 'gender',
        label: language === 'en' ? 'Gender' : 'பாலினம்',
        value: language === 'en' 
          ? (filters?.gender === 'male' ? 'Male' : 'Female')
          : (filters?.gender === 'male' ? 'ஆண்' : 'பெண்'),
        key: 'gender'
      });
    }
    
    if (filters?.turnout?.[0] !== 40 || filters?.turnout?.[1] !== 90) {
      active?.push({
        type: 'turnout',
        label: language === 'en' ? 'Turnout' : 'வாக்காளர் வருகை',
        value: `${filters?.turnout?.[0]}% - ${filters?.turnout?.[1]}%`,
        key: 'turnout'
      });
    }
    
    if (filters?.margin !== 100) {
      active?.push({
        type: 'margin',
        label: language === 'en' ? 'Margin' : 'வித்தியாசம்',
        value: `< ${filters?.margin}k ${language === 'en' ? 'votes' : 'வாக்குகள்'}`,
        key: 'margin'
      });
    }
    
    return active;
  };

  const activeFilters = getActiveFilters();

  if (activeFilters?.length === 0) {
    return (
      <div className="bg-card border-b border-border px-6 py-3">
        <div className="flex items-center text-sm text-muted-foreground">
          <Icon name="Home" size={16} className="mr-2" />
          <span>
            {language === 'en' ? 'All Constituencies' : 'அனைத்து தொகுதிகள்'}
          </span>
          <span className="mx-2">•</span>
          <span>234 {language === 'en' ? 'constituencies' : 'தொகுதிகள்'}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border-b border-border px-6 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center flex-wrap gap-2">
          <div className="flex items-center text-sm text-muted-foreground mr-3">
            <Icon name="Filter" size={16} className="mr-2" />
            <span>
              {language === 'en' ? 'Filtered by:' : 'வடிகட்டப்பட்டது:'}
            </span>
          </div>
          
          {activeFilters?.map((filter, index) => (
            <div key={index} className="flex items-center">
              <div className="flex items-center bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                <span className="font-medium mr-1">{filter?.label}:</span>
                <span>{filter?.value}</span>
                <button
                  onClick={() => onFilterRemove(filter?.key)}
                  className="ml-2 hover:bg-primary/20 rounded-full p-0.5 transition-colors"
                  aria-label={`Remove ${filter?.label} filter`}
                >
                  <Icon name="X" size={12} />
                </button>
              </div>
              {index < activeFilters?.length - 1 && (
                <Icon name="ChevronRight" size={14} className="mx-2 text-muted-foreground" />
              )}
            </div>
          ))}
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={onReset}
          iconName="RotateCcw"
          iconPosition="left"
          className="text-muted-foreground hover:text-foreground"
        >
          {language === 'en' ? 'Clear All' : 'அனைத்தும் அழி'}
        </Button>
      </div>
    </div>
  );
};

export default BreadcrumbNavigation;