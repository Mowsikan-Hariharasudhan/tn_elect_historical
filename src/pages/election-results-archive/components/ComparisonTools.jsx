import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const ComparisonTools = ({ language }) => {
  const [selectedElections, setSelectedElections] = useState([]);
  const [comparisonType, setComparisonType] = useState('constituency');

  const electionOptions = [
    { value: '2021', label: '2021 Assembly Election' },
    { value: '2019', label: '2019 Lok Sabha Election' },
    { value: '2016', label: '2016 Assembly Election' },
    { value: '2014', label: '2014 Lok Sabha Election' },
    { value: '2011', label: '2011 Assembly Election' },
    { value: '2009', label: '2009 Lok Sabha Election' }
  ];

  const comparisonTypes = [
    { 
      value: 'constituency', 
      label: { en: 'By Constituency', ta: 'தொகுதி வாரியாக' }
    },
    { 
      value: 'party', 
      label: { en: 'By Party Performance', ta: 'கட்சி செயல்பாடு வாரியாக' }
    },
    { 
      value: 'turnout', 
      label: { en: 'By Voter Turnout', ta: 'வாக்காளர் வருகை வாரியாக' }
    },
    { 
      value: 'margin', 
      label: { en: 'By Victory Margins', ta: 'வெற்றி வித்தியாசம் வாரியாக' }
    }
  ];

  const handleCompare = () => {
    if (selectedElections?.length >= 2) {
      console.log('Comparing elections:', selectedElections, 'by', comparisonType);
      // Implement comparison logic
    }
  };

  const mockComparisonData = [
    {
      constituency: { en: 'Chennai Central', ta: 'சென்னை மத்திய' },
      elections: {
        '2021': { winner: 'DMK', votes: 89456, margin: 15234 },
        '2016': { winner: 'AIADMK', votes: 76543, margin: 8765 },
        '2011': { winner: 'DMK', votes: 82345, margin: 12456 }
      }
    },
    {
      constituency: { en: 'Coimbatore', ta: 'கோயம்புத்தூர்' },
      elections: {
        '2021': { winner: 'BJP', votes: 95678, margin: 23456 },
        '2016': { winner: 'AIADMK', votes: 87654, margin: 18765 },
        '2011': { winner: 'INC', votes: 79876, margin: 9876 }
      }
    }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center space-x-3 mb-6">
        <Icon name="BarChart3" size={24} className="text-primary" />
        <h3 className="text-xl font-semibold text-foreground">
          {language === 'en' ? 'Election Comparison Tool' : 'தேர்தல் ஒப்பீட்டு கருவி'}
        </h3>
      </div>
      {/* Comparison Setup */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <Select
            label={language === 'en' ? 'Select Elections to Compare' : 'ஒப்பிட வேண்டிய தேர்தல்களைத் தேர்ந்தெடுக்கவும்'}
            description={language === 'en' ? 'Choose 2 or more elections' : '2 அல்லது அதற்கு மேற்பட்ட தேர்தல்களைத் தேர்ந்தெடுக்கவும்'}
            options={electionOptions}
            value={selectedElections}
            onChange={setSelectedElections}
            multiple
            searchable
          />
        </div>

        <div>
          <Select
            label={language === 'en' ? 'Comparison Type' : 'ஒப்பீட்டு வகை'}
            options={comparisonTypes?.map(type => ({
              value: type?.value,
              label: type?.label?.[language]
            }))}
            value={comparisonType}
            onChange={setComparisonType}
          />
        </div>
      </div>
      {/* Compare Button */}
      <div className="flex justify-center mb-6">
        <Button
          onClick={handleCompare}
          disabled={selectedElections?.length < 2}
          iconName="GitCompare"
          iconPosition="left"
          size="lg"
        >
          {language === 'en' ? 'Compare Elections' : 'தேர்தல்களை ஒப்பிடுக'}
        </Button>
      </div>
      {/* Sample Comparison Results */}
      {selectedElections?.length >= 2 && (
        <div className="space-y-6">
          <h4 className="text-lg font-semibold text-foreground">
            {language === 'en' ? 'Comparison Results' : 'ஒப்பீட்டு முடிவுகள்'}
          </h4>

          <div className="overflow-x-auto">
            <table className="w-full border border-border rounded-lg">
              <thead className="bg-muted">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-foreground">
                    {language === 'en' ? 'Constituency' : 'தொகுதி'}
                  </th>
                  {selectedElections?.map(year => (
                    <th key={year} className="px-4 py-3 text-center text-sm font-medium text-foreground">
                      {year}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {mockComparisonData?.map((row, index) => (
                  <tr key={index} className="hover:bg-muted/50">
                    <td className="px-4 py-3 font-medium text-foreground">
                      {row?.constituency?.[language]}
                    </td>
                    {selectedElections?.map(year => {
                      const data = row?.elections?.[year];
                      return (
                        <td key={year} className="px-4 py-3 text-center">
                          {data ? (
                            <div className="space-y-1">
                              <div className="font-medium text-foreground">{data?.winner}</div>
                              <div className="text-sm text-muted-foreground">
                                {data?.votes?.toLocaleString('en-IN')} votes
                              </div>
                              <div className="text-xs text-success">
                                +{data?.margin?.toLocaleString('en-IN')}
                              </div>
                            </div>
                          ) : (
                            <span className="text-muted-foreground">-</span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Insights */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start space-x-2">
              <Icon name="Lightbulb" size={16} className="text-blue-600 mt-0.5" />
              <div>
                <h5 className="text-sm font-medium text-blue-800 mb-2">
                  {language === 'en' ? 'Key Insights' : 'முக்கிய நுண்ணறிவுகள்'}
                </h5>
                <ul className="text-xs text-blue-700 space-y-1">
                  <li>
                    {language === 'en' ?'• DMK gained Chennai Central in 2021 after losing in 2016' :'• DMK 2016 இல் தோற்ற பிறகு 2021 இல் சென்னை மத்தியை வென்றது'
                    }
                  </li>
                  <li>
                    {language === 'en' ?'• BJP made significant gains in Coimbatore constituency' :'• BJP கோயம்புத்தூர் தொகுதியில் குறிப்பிடத்தக்க வெற்றி பெற்றது'
                    }
                  </li>
                  <li>
                    {language === 'en' ?'• Victory margins have generally increased over time' :'• வெற்றி வித்தியாசங்கள் காலப்போக்கில் பொதுவாக அதிகரித்துள்ளன'
                    }
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ComparisonTools;