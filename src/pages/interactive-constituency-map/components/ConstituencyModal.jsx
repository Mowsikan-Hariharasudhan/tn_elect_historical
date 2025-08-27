import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const ConstituencyModal = ({ constituency, language, isOpen, onClose, onExport }) => {
  const [activeTab, setActiveTab] = useState('overview');

  if (!isOpen || !constituency) return null;

  // Mock historical data
  const historicalWinners = [
    { year: 2021, winner: constituency?.currentMLA?.name, party: constituency?.currentMLA?.party, margin: 15234, turnout: 68.5 },
    { year: 2016, winner: language === 'en' ? 'Previous Winner 1' : 'முந்தைய வெற்றியாளர் 1', party: 'AIADMK', margin: 12456, turnout: 65.2 },
    { year: 2011, winner: language === 'en' ? 'Previous Winner 2' : 'முந்தைய வெற்றியாளர் 2', party: 'DMK', margin: 18923, turnout: 71.4 },
    { year: 2006, winner: language === 'en' ? 'Previous Winner 3' : 'முந்தைய வெற்றியாளர் 3', party: 'Congress', margin: 9876, turnout: 69.8 },
    { year: 2001, winner: language === 'en' ? 'Previous Winner 4' : 'முந்தைய வெற்றியாளர் 4', party: 'AIADMK', margin: 14567, turnout: 67.3 }
  ];

  const turnoutTrend = historicalWinners?.map(election => ({
    year: election?.year,
    turnout: election?.turnout,
    margin: election?.margin / 1000
  }));

  const partyPerformance = [
    { party: 'DMK', wins: 2, percentage: 40 },
    { party: 'AIADMK', wins: 2, percentage: 40 },
    { party: 'Congress', wins: 1, percentage: 20 }
  ];

  const demographics = [
    { category: language === 'en' ? 'Male Voters' : 'ஆண் வாக்காளர்கள்', count: 128456, percentage: 52.3 },
    { category: language === 'en' ? 'Female Voters' : 'பெண் வாக்காளர்கள்', count: 117222, percentage: 47.7 },
    { category: language === 'en' ? 'Young Voters (18-35)' : 'இளம் வாக்காளர்கள் (18-35)', count: 98765, percentage: 40.2 },
    { category: language === 'en' ? 'Senior Voters (60+)' : 'மூத்த வாக்காளர்கள் (60+)', count: 45678, percentage: 18.6 }
  ];

  const tabs = [
    { id: 'overview', label: language === 'en' ? 'Overview' : 'மேலோட்டம்', icon: 'Info' },
    { id: 'history', label: language === 'en' ? 'History' : 'வரலாறு', icon: 'Clock' },
    { id: 'demographics', label: language === 'en' ? 'Demographics' : 'மக்கள்தொகை', icon: 'Users' },
    { id: 'trends', label: language === 'en' ? 'Trends' : 'போக்குகள்', icon: 'TrendingUp' }
  ];

  const partyColors = {
    'DMK': '#FF0000',
    'AIADMK': '#228B22',
    'BJP': '#FF9933',
    'Congress': '#19AAED',
    'Others': '#808080'
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-card rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-2xl font-bold text-foreground">{constituency?.name}</h2>
            <p className="text-muted-foreground">
              {constituency?.district} {language === 'en' ? 'District' : 'மாவட்டம்'}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onExport(constituency)}
              iconName="Download"
              iconPosition="left"
            >
              {language === 'en' ? 'Export' : 'ஏற்றுமதி'}
            </Button>
            <button
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Icon name="X" size={24} />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-border overflow-x-auto">
          {tabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`flex items-center space-x-2 px-6 py-3 text-sm font-medium transition-colors whitespace-nowrap ${
                activeTab === tab?.id
                  ? 'text-primary border-b-2 border-primary bg-primary/5' :'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon name={tab?.icon} size={16} />
              <span>{tab?.label}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Current MLA */}
              <div className="bg-muted rounded-lg p-4">
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  {language === 'en' ? 'Current MLA' : 'தற்போதைய எம்.எல்.ஏ'}
                </h3>
                <div className="flex items-center space-x-4">
                  <Image
                    src={constituency?.currentMLA?.photo}
                    alt={constituency?.currentMLA?.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-xl font-semibold text-foreground">
                      {constituency?.currentMLA?.name}
                    </p>
                    <div className="flex items-center space-x-2 mt-1">
                      <div 
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: partyColors?.[constituency?.currentMLA?.party] }}
                      />
                      <span className="text-muted-foreground">{constituency?.currentMLA?.party}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Key Statistics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-muted rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-foreground">
                    {constituency?.totalVoters?.toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {language === 'en' ? 'Total Voters' : 'மொத்த வாக்காளர்கள்'}
                  </div>
                </div>
                <div className="bg-muted rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-foreground">
                    {constituency?.lastElection?.turnout}%
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {language === 'en' ? 'Turnout' : 'வாக்காளர் வருகை'}
                  </div>
                </div>
                <div className="bg-muted rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-foreground">
                    {constituency?.lastElection?.margin?.toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {language === 'en' ? 'Victory Margin' : 'வெற்றி வித்தியாசம்'}
                  </div>
                </div>
                <div className="bg-muted rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-foreground">
                    {constituency?.lastElection?.year}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {language === 'en' ? 'Last Election' : 'கடைசி தேர்தல்'}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'history' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-foreground">
                {language === 'en' ? 'Historical Winners' : 'வரலாற்று வெற்றியாளர்கள்'}
              </h3>
              <div className="space-y-3">
                {historicalWinners?.map((election, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="text-lg font-semibold text-foreground w-16">
                        {election?.year}
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{election?.winner}</p>
                        <div className="flex items-center space-x-2">
                          <div 
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: partyColors?.[election?.party] }}
                          />
                          <span className="text-sm text-muted-foreground">{election?.party}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-foreground">
                        {election?.margin?.toLocaleString()} {language === 'en' ? 'votes' : 'வாக்குகள்'}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {election?.turnout}% {language === 'en' ? 'turnout' : 'வருகை'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'demographics' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-foreground">
                {language === 'en' ? 'Voter Demographics' : 'வாக்காளர் மக்கள்தொகை'}
              </h3>
              <div className="space-y-4">
                {demographics?.map((demo, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                    <span className="text-foreground">{demo?.category}</span>
                    <div className="text-right">
                      <p className="font-semibold text-foreground">
                        {demo?.count?.toLocaleString()}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {demo?.percentage}%
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'trends' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  {language === 'en' ? 'Turnout Trend' : 'வாக்காளர் வருகை போக்கு'}
                </h3>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={turnoutTrend}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" />
                      <YAxis />
                      <Tooltip />
                      <Line 
                        type="monotone" 
                        dataKey="turnout" 
                        stroke="#1E3A8A" 
                        strokeWidth={2}
                        name={language === 'en' ? 'Turnout %' : 'வருகை %'}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  {language === 'en' ? 'Party Performance' : 'கட்சி செயல்திறன்'}
                </h3>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={partyPerformance}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="party" />
                      <YAxis />
                      <Tooltip />
                      <Bar 
                        dataKey="wins" 
                        fill="#1E3A8A"
                        name={language === 'en' ? 'Wins' : 'வெற்றிகள்'}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConstituencyModal;