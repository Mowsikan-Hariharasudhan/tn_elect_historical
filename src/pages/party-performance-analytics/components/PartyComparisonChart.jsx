import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PartyComparisonChart = ({ selectedParties, language, onPartyToggle }) => {
  const [chartData, setChartData] = useState([]);
  const [viewType, setViewType] = useState('voteShare');

  // Mock historical data for party performance
  const mockPartyData = {
    'DMK': {
      color: '#FF6B35',
      data: [
        { year: 1952, voteShare: 23.4, seats: 23 },
        { year: 1957, voteShare: 27.1, seats: 47 },
        { year: 1962, voteShare: 27.8, seats: 50 },
        { year: 1967, voteShare: 40.6, seats: 138 },
        { year: 1971, voteShare: 48.4, seats: 184 },
        { year: 1977, voteShare: 21.3, seats: 48 },
        { year: 1980, voteShare: 37.5, seats: 95 },
        { year: 1984, voteShare: 37.4, seats: 24 },
        { year: 1989, voteShare: 38.1, seats: 150 },
        { year: 1991, voteShare: 24.1, seats: 2 },
        { year: 1996, voteShare: 33.9, seats: 173 },
        { year: 2001, voteShare: 31.1, seats: 96 },
        { year: 2006, voteShare: 35.7, seats: 96 },
        { year: 2011, voteShare: 23.2, seats: 23 },
        { year: 2016, voteShare: 31.6, seats: 89 },
        { year: 2021, voteShare: 37.7, seats: 133 }
      ]
    },
    'AIADMK': {
      color: '#2E8B57',
      data: [
        { year: 1977, voteShare: 29.9, seats: 83 },
        { year: 1980, voteShare: 28.4, seats: 129 },
        { year: 1984, voteShare: 45.8, seats: 132 },
        { year: 1989, voteShare: 32.9, seats: 27 },
        { year: 1991, voteShare: 36.2, seats: 164 },
        { year: 1996, voteShare: 30.2, seats: 4 },
        { year: 2001, voteShare: 37.2, seats: 132 },
        { year: 2006, voteShare: 33.1, seats: 61 },
        { year: 2011, voteShare: 38.4, seats: 150 },
        { year: 2016, voteShare: 40.8, seats: 136 },
        { year: 2021, voteShare: 33.3, seats: 66 }
      ]
    },
    'INC': {
      color: '#1E40AF',
      data: [
        { year: 1952, voteShare: 45.2, seats: 152 },
        { year: 1957, voteShare: 46.1, seats: 161 },
        { year: 1962, voteShare: 45.8, seats: 139 },
        { year: 1967, voteShare: 41.9, seats: 50 },
        { year: 1971, voteShare: 37.2, seats: 23 },
        { year: 1977, voteShare: 18.2, seats: 20 },
        { year: 1980, voteShare: 28.1, seats: 32 },
        { year: 1984, voteShare: 12.5, seats: 26 },
        { year: 1989, voteShare: 18.7, seats: 26 },
        { year: 1991, voteShare: 22.4, seats: 54 },
        { year: 1996, voteShare: 15.2, seats: 9 },
        { year: 2001, voteShare: 9.8, seats: 4 },
        { year: 2006, voteShare: 8.9, seats: 10 },
        { year: 2011, voteShare: 9.2, seats: 5 },
        { year: 2016, voteShare: 6.4, seats: 8 },
        { year: 2021, voteShare: 2.8, seats: 18 }
      ]
    },
    'BJP': {
      color: '#FF8C00',
      data: [
        { year: 1991, voteShare: 2.1, seats: 1 },
        { year: 1996, voteShare: 2.8, seats: 1 },
        { year: 2001, voteShare: 3.2, seats: 1 },
        { year: 2006, voteShare: 2.5, seats: 0 },
        { year: 2011, voteShare: 5.9, seats: 0 },
        { year: 2016, voteShare: 2.8, seats: 0 },
        { year: 2021, voteShare: 2.6, seats: 4 }
      ]
    },
    'PMK': {
      color: '#8B4513',
      data: [
        { year: 1999, voteShare: 5.1, seats: 4 },
        { year: 2001, voteShare: 5.8, seats: 4 },
        { year: 2006, voteShare: 5.2, seats: 18 },
        { year: 2011, voteShare: 5.5, seats: 3 },
        { year: 2016, voteShare: 5.3, seats: 1 },
        { year: 2021, voteShare: 4.9, seats: 5 }
      ]
    }
  };

  const partyLabels = {
    en: {
      'DMK': 'Dravida Munnetra Kazhagam',
      'AIADMK': 'All India Anna Dravida Munnetra Kazhagam',
      'INC': 'Indian National Congress',
      'BJP': 'Bharatiya Janata Party',
      'PMK': 'Pattali Makkal Katchi'
    },
    ta: {
      'DMK': 'திராவிட முன்னேற்றக் கழகம்',
      'AIADMK': 'அனைத்திந்திய அண்ணா திராவிட முன்னேற்றக் கழகம்',
      'INC': 'இந்திய தேசிய காங்கிரஸ்',
      'BJP': 'பாரதீய ஜனதா கட்சி',
      'PMK': 'பட்டாலி மக்கள் கட்சி'
    }
  };

  useEffect(() => {
    if (selectedParties?.length === 0) {
      setChartData([]);
      return;
    }

    // Get all unique years from selected parties
    const allYears = new Set();
    selectedParties?.forEach(party => {
      if (mockPartyData?.[party]) {
        mockPartyData?.[party]?.data?.forEach(item => allYears?.add(item?.year));
      }
    });

    // Create chart data
    const sortedYears = Array.from(allYears)?.sort();
    const data = sortedYears?.map(year => {
      const yearData = { year };
      selectedParties?.forEach(party => {
        if (mockPartyData?.[party]) {
          const partyYearData = mockPartyData?.[party]?.data?.find(item => item?.year === year);
          if (partyYearData) {
            yearData[party] = partyYearData?.[viewType];
          }
        }
      });
      return yearData;
    });

    setChartData(data);
  }, [selectedParties, viewType]);

  const availableParties = Object.keys(mockPartyData);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="font-medium text-foreground mb-2">{`${language === 'en' ? 'Year' : 'ஆண்டு'}: ${label}`}</p>
          {payload?.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry?.color }}>
              {`${partyLabels?.[language]?.[entry?.dataKey] || entry?.dataKey}: ${entry?.value}${viewType === 'voteShare' ? '%' : ''}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card rounded-lg border border-border p-4 lg:p-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-4 lg:mb-0">
          {language === 'en' ? 'Party Performance Comparison' : 'கட்சி செயல்திறன் ஒப்பீடு'}
        </h3>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex rounded-lg border border-border overflow-hidden">
            <Button
              variant={viewType === 'voteShare' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewType('voteShare')}
              className="rounded-none border-0"
            >
              {language === 'en' ? 'Vote Share' : 'வாக்கு பங்கு'}
            </Button>
            <Button
              variant={viewType === 'seats' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewType('seats')}
              className="rounded-none border-0"
            >
              {language === 'en' ? 'Seats Won' : 'வென்ற இடங்கள்'}
            </Button>
          </div>
        </div>
      </div>
      {/* Party Selection */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-muted-foreground mb-3">
          {language === 'en' ? 'Select Parties to Compare:' : 'ஒப்பிட கட்சிகளைத் தேர்ந்தெடுக்கவும்:'}
        </h4>
        <div className="flex flex-wrap gap-2">
          {availableParties?.map(party => (
            <Button
              key={party}
              variant={selectedParties?.includes(party) ? 'default' : 'outline'}
              size="sm"
              onClick={() => onPartyToggle(party)}
              className="text-xs"
            >
              <div 
                className="w-3 h-3 rounded-full mr-2" 
                style={{ backgroundColor: mockPartyData?.[party]?.color }}
              />
              {party}
            </Button>
          ))}
        </div>
      </div>
      {/* Chart */}
      {chartData?.length > 0 ? (
        <div className="h-80 lg:h-96">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey="year" 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
              />
              <YAxis 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
                label={{ 
                  value: viewType === 'voteShare' ? 'Vote Share (%)' : 'Seats Won', 
                  angle: -90, 
                  position: 'insideLeft' 
                }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              {selectedParties?.map(party => (
                <Line
                  key={party}
                  type="monotone"
                  dataKey={party}
                  stroke={mockPartyData?.[party]?.color}
                  strokeWidth={2}
                  dot={{ fill: mockPartyData?.[party]?.color, strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: mockPartyData?.[party]?.color, strokeWidth: 2 }}
                  name={partyLabels?.[language]?.[party] || party}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="h-80 lg:h-96 flex items-center justify-center border-2 border-dashed border-border rounded-lg">
          <div className="text-center">
            <Icon name="BarChart3" size={48} className="text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">
              {language === 'en' ?'Select parties to view comparison chart' :'ஒப்பீட்டு விளக்கப்படத்தைப் பார்க்க கட்சிகளைத் தேர்ந்தெடுக்கவும்'
              }
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PartyComparisonChart;