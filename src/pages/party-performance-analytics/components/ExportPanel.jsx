import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const ExportPanel = ({ selectedParties, filters, language }) => {
  const [exportFormat, setExportFormat] = useState('csv');
  const [exportScope, setExportScope] = useState('filtered');
  const [includeCharts, setIncludeCharts] = useState(false);
  const [includeAnalysis, setIncludeAnalysis] = useState(true);
  const [isExporting, setIsExporting] = useState(false);

  const formatOptions = [
    { value: 'csv', label: 'CSV' },
    { value: 'xlsx', label: 'Excel (XLSX)' },
    { value: 'pdf', label: 'PDF Report' },
    { value: 'json', label: 'JSON Data' }
  ];

  const scopeOptions = [
    { 
      value: 'filtered', 
      label: language === 'en' ? 'Current Filtered Data' : 'தற்போதைய வடிகட்டப்பட்ட தரவு' 
    },
    { 
      value: 'selected', 
      label: language === 'en' ? 'Selected Parties Only' : 'தேர்ந்தெடுக்கப்பட்ட கட்சிகள் மட்டும்' 
    },
    { 
      value: 'all', 
      label: language === 'en' ? 'All Historical Data' : 'அனைத்து வரலாற்று தரவுகள்' 
    }
  ];

  const handleExport = async () => {
    setIsExporting(true);
    
    // Simulate export process
    try {
      // In a real application, this would make an API call to generate the export
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock download trigger
      const filename = `tn-party-analytics-${Date.now()}.${exportFormat}`;
      
      // Create a mock blob for demonstration
      const mockData = generateMockExportData();
      const blob = new Blob([mockData], { 
        type: getContentType(exportFormat) 
      });
      
      // Create download link
      const url = window.URL?.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body?.appendChild(link);
      link?.click();
      document.body?.removeChild(link);
      window.URL?.revokeObjectURL(url);
      
      // Show success message (in a real app, you might use a toast notification)
      alert(language === 'en' 
        ? `Export completed successfully! File: ${filename}` 
        : `ஏற்றுமதி வெற்றிகரமாக முடிந்தது! கோப்பு: ${filename}`
      );
      
    } catch (error) {
      alert(language === 'en' ?'Export failed. Please try again.' :'ஏற்றுமதி தோல்வியடைந்தது. மீண்டும் முயற்சிக்கவும்.'
      );
    } finally {
      setIsExporting(false);
    }
  };

  const generateMockExportData = () => {
    if (exportFormat === 'csv') {
      return `Party,Year,Vote Share,Seats Won,Alliance Type
DMK,2021,37.7,133,Alliance
AIADMK,2021,33.3,66,Alliance
INC,2021,2.8,18,Alliance
BJP,2021,2.6,4,Alliance
PMK,2021,4.9,5,Alliance`;
    }
    
    if (exportFormat === 'json') {
      return JSON.stringify({
        exportDate: new Date()?.toISOString(),
        filters: filters,
        selectedParties: selectedParties,
        data: [
          { party: 'DMK', year: 2021, voteShare: 37.7, seats: 133, allianceType: 'Alliance' },
          { party: 'AIADMK', year: 2021, voteShare: 33.3, seats: 66, allianceType: 'Alliance' }
        ]
      }, null, 2);
    }
    
    return `Tamil Nadu Party Performance Analytics Export
Generated on: ${new Date()?.toLocaleDateString()}
Selected Parties: ${selectedParties?.join(', ')}
Export Scope: ${exportScope}
Filters Applied: ${JSON.stringify(filters)}`;
  };

  const getContentType = (format) => {
    const types = {
      'csv': 'text/csv',
      'xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'pdf': 'application/pdf',
      'json': 'application/json'
    };
    return types?.[format] || 'text/plain';
  };

  const getExportPreview = () => {
    const partyCount = selectedParties?.length;
    const timeRange = filters?.timeRange === 'all' ? 'All Years' : filters?.timeRange;
    
    return {
      parties: partyCount,
      timeRange: timeRange,
      estimatedRecords: partyCount * (timeRange === 'All Years' ? 16 : 4),
      fileSize: exportFormat === 'pdf' ? '2-5 MB' : '50-200 KB'
    };
  };

  const preview = getExportPreview();

  return (
    <div className="bg-card rounded-lg border border-border p-4 lg:p-6">
      <div className="flex items-center space-x-3 mb-6">
        <Icon name="Download" size={24} className="text-primary" />
        <h3 className="text-lg font-semibold text-foreground">
          {language === 'en' ? 'Export Data' : 'தரவு ஏற்றுமதி'}
        </h3>
      </div>
      {/* Export Configuration */}
      <div className="space-y-6">
        {/* Format Selection */}
        <div>
          <Select
            label={language === 'en' ? 'Export Format' : 'ஏற்றுமதி வடிவம்'}
            options={formatOptions}
            value={exportFormat}
            onChange={setExportFormat}
            className="w-full"
          />
        </div>

        {/* Scope Selection */}
        <div>
          <Select
            label={language === 'en' ? 'Data Scope' : 'தரவு நோக்கம்'}
            options={scopeOptions}
            value={exportScope}
            onChange={setExportScope}
            className="w-full"
          />
        </div>

        {/* Additional Options */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-foreground">
            {language === 'en' ? 'Include Additional Content' : 'கூடுதல் உள்ளடக்கத்தைச் சேர்க்கவும்'}
          </h4>
          
          {exportFormat === 'pdf' && (
            <Checkbox
              label={language === 'en' ? 'Include charts and visualizations' : 'விளக்கப்படங்கள் மற்றும் காட்சிப்படுத்தல்களைச் சேர்க்கவும்'}
              checked={includeCharts}
              onChange={(e) => setIncludeCharts(e?.target?.checked)}
            />
          )}
          
          <Checkbox
            label={language === 'en' ? 'Include performance analysis' : 'செயல்திறன் பகுப்பாய்வைச் சேர்க்கவும்'}
            checked={includeAnalysis}
            onChange={(e) => setIncludeAnalysis(e?.target?.checked)}
          />
        </div>

        {/* Export Preview */}
        <div className="bg-muted rounded-lg p-4">
          <h4 className="text-sm font-medium text-foreground mb-3">
            {language === 'en' ? 'Export Preview' : 'ஏற்றுமதி முன்னோட்டம்'}
          </h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">
                {language === 'en' ? 'Parties:' : 'கட்சிகள்:'}
              </span>
              <span className="ml-2 font-medium text-foreground">{preview?.parties}</span>
            </div>
            <div>
              <span className="text-muted-foreground">
                {language === 'en' ? 'Time Range:' : 'கால வரம்பு:'}
              </span>
              <span className="ml-2 font-medium text-foreground">{preview?.timeRange}</span>
            </div>
            <div>
              <span className="text-muted-foreground">
                {language === 'en' ? 'Records:' : 'பதிவுகள்:'}
              </span>
              <span className="ml-2 font-medium text-foreground">~{preview?.estimatedRecords}</span>
            </div>
            <div>
              <span className="text-muted-foreground">
                {language === 'en' ? 'File Size:' : 'கோப்பு அளவு:'}
              </span>
              <span className="ml-2 font-medium text-foreground">{preview?.fileSize}</span>
            </div>
          </div>
        </div>

        {/* Selected Parties Preview */}
        {selectedParties?.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-foreground mb-2">
              {language === 'en' ? 'Selected Parties:' : 'தேர்ந்தெடுக்கப்பட்ட கட்சிகள்:'}
            </h4>
            <div className="flex flex-wrap gap-2">
              {selectedParties?.map(party => (
                <span 
                  key={party}
                  className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                >
                  {party}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Export Button */}
        <div className="pt-4 border-t border-border">
          <Button
            onClick={handleExport}
            disabled={selectedParties?.length === 0 || isExporting}
            loading={isExporting}
            className="w-full"
            iconName="Download"
            iconPosition="left"
          >
            {isExporting 
              ? (language === 'en' ? 'Exporting...' : 'ஏற்றுமதி செய்கிறது...')
              : (language === 'en' ? 'Export Data' : 'தரவு ஏற்றுமதி')
            }
          </Button>
          
          {selectedParties?.length === 0 && (
            <p className="text-xs text-muted-foreground mt-2 text-center">
              {language === 'en' ?'Please select at least one party to export data' :'தரவு ஏற்றுமதி செய்ய குறைந்தது ஒரு கட்சியையாவது தேர்ந்தெடுக்கவும்'
              }
            </p>
          )}
        </div>

        {/* Export Guidelines */}
        <div className="text-xs text-muted-foreground space-y-1">
          <p className="font-medium">
            {language === 'en' ? 'Export Guidelines:' : 'ஏற்றுமதி வழிகாட்டுதல்கள்:'}
          </p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>
              {language === 'en' ?'CSV format is best for data analysis in spreadsheet applications' :'CSV வடிவம் விரிதாள் பயன்பாடுகளில் தரவு பகுப்பாய்விற்கு சிறந்தது'
              }
            </li>
            <li>
              {language === 'en' ?'PDF format includes formatted reports with charts' :'PDF வடிவம் விளக்கப்படங்களுடன் வடிவமைக்கப்பட்ட அறிக்கைகளை உள்ளடக்கியது'
              }
            </li>
            <li>
              {language === 'en' ?'JSON format is suitable for developers and API integration' :'JSON வடிவம் டெவலப்பர்கள் மற்றும் API ஒருங்கிணைப்பிற்கு ஏற்றது'
              }
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ExportPanel;