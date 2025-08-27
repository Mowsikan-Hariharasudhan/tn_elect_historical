import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const ExportTools = ({ results, filters, language }) => {
  const [isExporting, setIsExporting] = useState(false);
  const [exportFormat, setExportFormat] = useState('csv');

  const exportFormats = [
    { value: 'csv', label: 'CSV' },
    { value: 'excel', label: 'Excel' },
    { value: 'pdf', label: 'PDF' },
    { value: 'json', label: 'JSON' }
  ];

  const handleExport = async () => {
    setIsExporting(true);
    
    // Simulate export process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Create mock download
    const filename = `tn-election-results-${Date.now()}.${exportFormat}`;
    console.log(`Exporting ${results?.length} results to ${filename}`);
    
    setIsExporting(false);
  };

  const getFilterSummary = () => {
    const activeFilters = [];
    if (filters?.searchQuery) activeFilters?.push(`Search: "${filters?.searchQuery}"`);
    if (filters?.party) activeFilters?.push(`Party: ${filters?.party}`);
    if (filters?.constituency) activeFilters?.push(`Constituency: ${filters?.constituency}`);
    if (filters?.marginRange) activeFilters?.push(`Margin: ${filters?.marginRange}`);
    
    return activeFilters?.length > 0 ? activeFilters?.join(', ') : 
           (language === 'en' ? 'No filters applied' : 'வடிகட்டிகள் எதுவும் பயன்படுத்தப்படவில்லை');
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-foreground">
            {language === 'en' ? 'Export Results' : 'முடிவுகளை ஏற்றுமதி செய்க'}
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            {language === 'en' 
              ? `${results?.length} results found` 
              : `${results?.length} முடிவுகள் கண்டுபிடிக்கப்பட்டன`
            }
          </p>
        </div>
        <Icon name="Download" size={24} className="text-muted-foreground" />
      </div>
      {/* Active Filters Summary */}
      <div className="mb-4 p-3 bg-muted rounded-lg">
        <p className="text-sm text-muted-foreground mb-1">
          {language === 'en' ? 'Active Filters:' : 'செயலில் உள்ள வடிகட்டிகள்:'}
        </p>
        <p className="text-sm text-foreground">
          {getFilterSummary()}
        </p>
      </div>
      {/* Export Options */}
      <div className="flex items-end space-x-4">
        <div className="flex-1">
          <Select
            label={language === 'en' ? 'Export Format' : 'ஏற்றுமதி வடிவம்'}
            options={exportFormats}
            value={exportFormat}
            onChange={setExportFormat}
          />
        </div>
        
        <Button
          onClick={handleExport}
          disabled={isExporting || results?.length === 0}
          loading={isExporting}
          iconName="Download"
          iconPosition="left"
        >
          {isExporting 
            ? (language === 'en' ? 'Exporting...' : 'ஏற்றுமதி செய்கிறது...')
            : (language === 'en' ? 'Export Data' : 'தரவை ஏற்றுமதி செய்க')
          }
        </Button>
      </div>
      {/* Export Info */}
      <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="flex items-start space-x-2">
          <Icon name="Info" size={16} className="text-blue-600 mt-0.5" />
          <div>
            <p className="text-sm text-blue-800 font-medium">
              {language === 'en' ? 'Export Information' : 'ஏற்றுமதி தகவல்'}
            </p>
            <p className="text-xs text-blue-700 mt-1">
              {language === 'en' ?'Exported data includes candidate details, vote counts, margins, and constituency information based on your current filters.' :'ஏற்றுமதி செய்யப்பட்ட தரவில் வேட்பாளர் விவரங்கள், வாக்கு எண்ணிக்கை, வித்தியாசங்கள் மற்றும் உங்கள் தற்போதைய வடிகட்டிகளின் அடிப்படையில் தொகுதி தகவல்கள் அடங்கும்.'
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExportTools;