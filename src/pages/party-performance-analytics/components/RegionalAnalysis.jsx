import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';


const RegionalAnalysis = ({ selectedParties, language }) => {
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [viewMode, setViewMode] = useState('heatmap');

  // Mock regional performance data
  const regions = {
    'Northern TN': {
      districts: ['Chennai', 'Tiruvallur', 'Kanchipuram', 'Vellore', 'Tiruvannamalai'],
      partyPerformance: {
        'DMK': { strongholds: 15, competitive: 8, weak: 2, avgVoteShare: 42.3 },
        'AIADMK': { strongholds: 12, competitive: 10, weak: 3, avgVoteShare: 38.7 },
        'INC': { strongholds: 3, competitive: 5, weak: 17, avgVoteShare: 12.4 },
        'BJP': { strongholds: 1, competitive: 2, weak: 22, avgVoteShare: 8.9 },
        'PMK': { strongholds: 4, competitive: 6, weak: 15, avgVoteShare: 15.2 }
      }
    },
    'Western TN': {
      districts: ['Coimbatore', 'Erode', 'Salem', 'Dharmapuri', 'Krishnagiri'],
      partyPerformance: {
        'DMK': { strongholds: 8, competitive: 12, weak: 5, avgVoteShare: 35.8 },
        'AIADMK': { strongholds: 14, competitive: 8, weak: 3, avgVoteShare: 43.2 },
        'INC': { strongholds: 2, competitive: 4, weak: 19, avgVoteShare: 9.7 },
        'BJP': { strongholds: 3, competitive: 5, weak: 17, avgVoteShare: 12.1 },
        'PMK': { strongholds: 6, competitive: 8, weak: 11, avgVoteShare: 18.5 }
      }
    },
    'Central TN': {
      districts: ['Tiruchirappalli', 'Thanjavur', 'Tiruvarur', 'Nagapattinam', 'Pudukkottai'],
      partyPerformance: {
        'DMK': { strongholds: 18, competitive: 6, weak: 1, avgVoteShare: 48.9 },
        'AIADMK': { strongholds: 6, competitive: 12, weak: 7, avgVoteShare: 32.4 },
        'INC': { strongholds: 1, competitive: 3, weak: 21, avgVoteShare: 8.2 },
        'BJP': { strongholds: 0, competitive: 1, weak: 24, avgVoteShare: 4.3 },
        'PMK': { strongholds: 0, competitive: 2, weak: 23, avgVoteShare: 6.8 }
      }
    },
    'Southern TN': {
      districts: ['Madurai', 'Theni', 'Dindigul', 'Sivaganga', 'Ramanathapuram'],
      partyPerformance: {
        'DMK': { strongholds: 12, competitive: 8, weak: 5, avgVoteShare: 39.6 },
        'AIADMK': { strongholds: 10, competitive: 11, weak: 4, avgVoteShare: 37.8 },
        'INC': { strongholds: 2, competitive: 6, weak: 17, avgVoteShare: 11.9 },
        'BJP': { strongholds: 0, competitive: 2, weak: 23, avgVoteShare: 5.7 },
        'PMK': { strongholds: 1, competitive: 3, weak: 21, avgVoteShare: 7.4 }
      }
    },
    'Far South TN': {
      districts: ['Tirunelveli', 'Thoothukudi', 'Kanyakumari', 'Virudhunagar'],
      partyPerformance: {
        'DMK': { strongholds: 8, competitive: 6, weak: 4, avgVoteShare: 36.2 },
        'AIADMK': { strongholds: 6, competitive: 8, weak: 4, avgVoteShare: 34.5 },
        'INC': { strongholds: 4, competitive: 7, weak: 7, avgVoteShare: 22.8 },
        'BJP': { strongholds: 2, competitive: 4, weak: 12, avgVoteShare: 14.3 },
        'PMK': { strongholds: 0, competitive: 1, weak: 17, avgVoteShare: 4.9 }
      }
    }
  };

  const regionOptions = [
    { value: 'all', label: language === 'en' ? 'All Regions' : 'அனைத்து பகுதிகள்' },
    { value: 'Northern TN', label: language === 'en' ? 'Northern Tamil Nadu' : 'வடக்கு தமிழ்நாடு' },
    { value: 'Western TN', label: language === 'en' ? 'Western Tamil Nadu' : 'மேற்கு தமிழ்நாடு' },
    { value: 'Central TN', label: language === 'en' ? 'Central Tamil Nadu' : 'மத்திய தமிழ்நாடு' },
    { value: 'Southern TN', label: language === 'en' ? 'Southern Tamil Nadu' : 'தெற்கு தமிழ்நாடு' },
    { value: 'Far South TN', label: language === 'en' ? 'Far South Tamil Nadu' : 'தூர தெற்கு தமிழ்நாடு' }
  ];

  const getStrengthColor = (type, value) => {
    if (type === 'strongholds') {
      if (value >= 15) return 'bg-green-500';
      if (value >= 10) return 'bg-green-400';
      if (value >= 5) return 'bg-green-300';
      return 'bg-green-200';
    }
    if (type === 'competitive') {
      if (value >= 10) return 'bg-yellow-500';
      if (value >= 7) return 'bg-yellow-400';
      if (value >= 4) return 'bg-yellow-300';
      return 'bg-yellow-200';
    }
    if (type === 'weak') {
      if (value >= 15) return 'bg-red-500';
      if (value >= 10) return 'bg-red-400';
      if (value >= 5) return 'bg-red-300';
      return 'bg-red-200';
    }
    return 'bg-gray-200';
  };

  const getPartyColor = (party) => {
    const colors = {
      'DMK': 'border-red-500',
      'AIADMK': 'border-green-600',
      'INC': 'border-blue-600',
      'BJP': 'border-orange-500',
      'PMK': 'border-yellow-600'
    };
    return colors?.[party] || 'border-gray-500';
  };

  const renderRegionalData = () => {
    if (selectedRegion === 'all') {
      return Object.entries(regions)?.map(([regionName, data]) => (
        <div key={regionName} className="bg-card border border-border rounded-lg p-4 mb-4">
          <h4 className="font-semibold text-foreground mb-3">{regionName}</h4>
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-2">
            {selectedParties?.map(party => {
              const performance = data?.partyPerformance?.[party];
              if (!performance) return null;
              
              return (
                <div key={party} className={`border-2 ${getPartyColor(party)} rounded-lg p-3`}>
                  <div className="text-xs font-medium text-center mb-2">{party}</div>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">
                        {language === 'en' ? 'Strong' : 'வலிமை'}
                      </span>
                      <span className="font-medium">{performance?.strongholds}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">
                        {language === 'en' ? 'Comp' : 'போட்டி'}
                      </span>
                      <span className="font-medium">{performance?.competitive}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">
                        {language === 'en' ? 'Weak' : 'பலவீன'}
                      </span>
                      <span className="font-medium">{performance?.weak}</span>
                    </div>
                    <div className="text-xs text-center font-medium text-primary">
                      {performance?.avgVoteShare}%
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ));
    } else {
      const regionData = regions?.[selectedRegion];
      if (!regionData) return null;

      return (
        <div className="space-y-6">
          {/* Districts */}
          <div className="bg-muted rounded-lg p-4">
            <h4 className="font-medium text-foreground mb-3">
              {language === 'en' ? 'Districts in this region:' : 'இந்த பகுதியில் உள்ள மாவட்டங்கள்:'}
            </h4>
            <div className="flex flex-wrap gap-2">
              {regionData?.districts?.map(district => (
                <span key={district} className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">
                  {district}
                </span>
              ))}
            </div>
          </div>
          {/* Party Performance */}
          <div className="grid gap-4">
            {selectedParties?.map(party => {
              const performance = regionData?.partyPerformance?.[party];
              if (!performance) return null;

              return (
                <div key={party} className="bg-card border border-border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h5 className="font-semibold text-foreground">{party}</h5>
                    <span className="text-sm text-muted-foreground">
                      {language === 'en' ? 'Avg Vote Share:' : 'சராசரி வாக்கு பங்கு:'} {performance?.avgVoteShare}%
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className={`w-12 h-12 ${getStrengthColor('strongholds', performance?.strongholds)} rounded-lg flex items-center justify-center mx-auto mb-2`}>
                        <span className="text-white font-bold">{performance?.strongholds}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {language === 'en' ? 'Strongholds' : 'கோட்டைகள்'}
                      </p>
                    </div>
                    
                    <div className="text-center">
                      <div className={`w-12 h-12 ${getStrengthColor('competitive', performance?.competitive)} rounded-lg flex items-center justify-center mx-auto mb-2`}>
                        <span className="text-white font-bold">{performance?.competitive}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {language === 'en' ? 'Competitive' : 'போட்டியிடும்'}
                      </p>
                    </div>
                    
                    <div className="text-center">
                      <div className={`w-12 h-12 ${getStrengthColor('weak', performance?.weak)} rounded-lg flex items-center justify-center mx-auto mb-2`}>
                        <span className="text-white font-bold">{performance?.weak}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {language === 'en' ? 'Weak Areas' : 'பலவீன பகுதிகள்'}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      );
    }
  };

  if (selectedParties?.length === 0) {
    return (
      <div className="bg-card rounded-lg border border-border p-8 text-center">
        <Icon name="Map" size={48} className="text-muted-foreground mx-auto mb-4" />
        <p className="text-muted-foreground">
          {language === 'en' ?'Select parties to view regional analysis' :'பிராந்திய பகுப்பாய்வைப் பார்க்க கட்சிகளைத் தேர்ந்தெடுக்கவும்'
          }
        </p>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-lg border border-border p-4 lg:p-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-4 lg:mb-0">
          {language === 'en' ? 'Regional Performance Analysis' : 'பிராந்திய செயல்திறன் பகுப்பாய்வு'}
        </h3>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e?.target?.value)}
            className="px-3 py-2 border border-border rounded-md bg-input text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          >
            {regionOptions?.map(option => (
              <option key={option?.value} value={option?.value}>
                {option?.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      {/* Legend */}
      <div className="mb-6 p-4 bg-muted rounded-lg">
        <h4 className="text-sm font-medium text-foreground mb-3">
          {language === 'en' ? 'Performance Legend:' : 'செயல்திறன் குறியீடு:'}
        </h4>
        <div className="grid grid-cols-3 gap-4 text-xs">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-green-500 rounded"></div>
            <span className="text-muted-foreground">
              {language === 'en' ? 'Strongholds (>40% vote share)' : 'கோட்டைகள் (>40% வாக்கு பங்கு)'}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-yellow-500 rounded"></div>
            <span className="text-muted-foreground">
              {language === 'en' ? 'Competitive (20-40%)' : 'போட்டியிடும் (20-40%)'}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-red-500 rounded"></div>
            <span className="text-muted-foreground">
              {language === 'en' ? 'Weak Areas (<20%)' : 'பலவீன பகுதிகள் (<20%)'}
            </span>
          </div>
        </div>
      </div>
      {/* Regional Data */}
      {renderRegionalData()}
    </div>
  );
};

export default RegionalAnalysis;