import React from 'react';
import Icon from '../../../components/AppIcon';

const PartyPerformanceCards = ({ selectedParties, language }) => {
  // Mock performance metrics for each party
  const partyMetrics = {
    'DMK': {
      totalSeats: 1847,
      avgVoteShare: 32.4,
      bestPerformance: { year: 1971, seats: 184, voteShare: 48.4 },
      worstPerformance: { year: 1991, seats: 2, voteShare: 24.1 },
      allianceWins: 8,
      soloWins: 3,
      strongholds: ['Chennai Central', 'Thousand Lights', 'Anna Nagar'],
      founded: 1949,
      symbol: 'Rising Sun'
    },
    'AIADMK': {
      totalSeats: 1184,
      avgVoteShare: 34.8,
      bestPerformance: { year: 1991, seats: 164, voteShare: 36.2 },
      worstPerformance: { year: 1996, seats: 4, voteShare: 30.2 },
      allianceWins: 4,
      soloWins: 3,
      strongholds: ['Jayalalithaa Nagar', 'Thondamuthur', 'Pollachi'],
      founded: 1972,
      symbol: 'Two Leaves'
    },
    'INC': {
      totalSeats: 713,
      avgVoteShare: 25.1,
      bestPerformance: { year: 1957, seats: 161, voteShare: 46.1 },
      worstPerformance: { year: 2021, seats: 18, voteShare: 2.8 },
      allianceWins: 2,
      soloWins: 4,
      strongholds: ['Kanyakumari', 'Vilavancode', 'Nagercoil'],
      founded: 1885,
      symbol: 'Hand'
    },
    'BJP': {
      totalSeats: 6,
      avgVoteShare: 3.2,
      bestPerformance: { year: 2011, seats: 0, voteShare: 5.9 },
      worstPerformance: { year: 2006, seats: 0, voteShare: 2.5 },
      allianceWins: 1,
      soloWins: 0,
      strongholds: ['Modakurichi', 'Coimbatore South'],
      founded: 1980,
      symbol: 'Lotus'
    },
    'PMK': {
      totalSeats: 35,
      avgVoteShare: 5.3,
      bestPerformance: { year: 2006, seats: 18, voteShare: 5.2 },
      worstPerformance: { year: 2016, seats: 1, voteShare: 5.3 },
      allianceWins: 3,
      soloWins: 0,
      strongholds: ['Dharmapuri', 'Krishnagiri', 'Vellore'],
      founded: 1989,
      symbol: 'Mango'
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

  const getPartyColor = (party) => {
    const colors = {
      'DMK': 'bg-red-500',
      'AIADMK': 'bg-green-600',
      'INC': 'bg-blue-600',
      'BJP': 'bg-orange-500',
      'PMK': 'bg-yellow-600'
    };
    return colors?.[party] || 'bg-gray-500';
  };

  if (selectedParties?.length === 0) {
    return (
      <div className="bg-card rounded-lg border border-border p-8 text-center">
        <Icon name="Users" size={48} className="text-muted-foreground mx-auto mb-4" />
        <p className="text-muted-foreground">
          {language === 'en' ?'Select parties to view detailed performance metrics' :'விரிவான செயல்திறன் அளவீடுகளைப் பார்க்க கட்சிகளைத் தேர்ந்தெடுக்கவும்'
          }
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {selectedParties?.map(party => {
        const metrics = partyMetrics?.[party];
        if (!metrics) return null;

        return (
          <div key={party} className="bg-card rounded-lg border border-border p-6">
            {/* Party Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 ${getPartyColor(party)} rounded-lg flex items-center justify-center`}>
                  <span className="text-white font-bold text-lg">{party}</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">
                    {partyLabels?.[language]?.[party] || party}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {language === 'en' ? `Founded: ${metrics?.founded}` : `நிறுவப்பட்டது: ${metrics?.founded}`} • 
                    {language === 'en' ? ` Symbol: ${metrics?.symbol}` : ` சின்னம்: ${metrics?.symbol}`}
                  </p>
                </div>
              </div>
            </div>
            {/* Key Metrics Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="bg-muted rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="Trophy" size={16} className="text-primary" />
                  <span className="text-sm font-medium text-muted-foreground">
                    {language === 'en' ? 'Total Seats' : 'மொத்த இடங்கள்'}
                  </span>
                </div>
                <p className="text-2xl font-bold text-foreground">{metrics?.totalSeats}</p>
              </div>

              <div className="bg-muted rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="Percent" size={16} className="text-primary" />
                  <span className="text-sm font-medium text-muted-foreground">
                    {language === 'en' ? 'Avg Vote Share' : 'சராசரி வாக்கு பங்கு'}
                  </span>
                </div>
                <p className="text-2xl font-bold text-foreground">{metrics?.avgVoteShare}%</p>
              </div>

              <div className="bg-muted rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="Users" size={16} className="text-primary" />
                  <span className="text-sm font-medium text-muted-foreground">
                    {language === 'en' ? 'Alliance Wins' : 'கூட்டணி வெற்றிகள்'}
                  </span>
                </div>
                <p className="text-2xl font-bold text-foreground">{metrics?.allianceWins}</p>
              </div>

              <div className="bg-muted rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="User" size={16} className="text-primary" />
                  <span className="text-sm font-medium text-muted-foreground">
                    {language === 'en' ? 'Solo Wins' : 'தனி வெற்றிகள்'}
                  </span>
                </div>
                <p className="text-2xl font-bold text-foreground">{metrics?.soloWins}</p>
              </div>
            </div>
            {/* Performance Highlights */}
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-3">
                  <Icon name="TrendingUp" size={16} className="text-green-600" />
                  <span className="text-sm font-medium text-green-800">
                    {language === 'en' ? 'Best Performance' : 'சிறந்த செயல்திறன்'}
                  </span>
                </div>
                <p className="text-sm text-green-700">
                  <span className="font-semibold">{metrics?.bestPerformance?.year}</span> - 
                  {language === 'en' 
                    ? ` ${metrics?.bestPerformance?.seats} seats (${metrics?.bestPerformance?.voteShare}% votes)`
                    : ` ${metrics?.bestPerformance?.seats} இடங்கள் (${metrics?.bestPerformance?.voteShare}% வாக்குகள்)`
                  }
                </p>
              </div>

              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-3">
                  <Icon name="TrendingDown" size={16} className="text-red-600" />
                  <span className="text-sm font-medium text-red-800">
                    {language === 'en' ? 'Worst Performance' : 'மோசமான செயல்திறன்'}
                  </span>
                </div>
                <p className="text-sm text-red-700">
                  <span className="font-semibold">{metrics?.worstPerformance?.year}</span> - 
                  {language === 'en' 
                    ? ` ${metrics?.worstPerformance?.seats} seats (${metrics?.worstPerformance?.voteShare}% votes)`
                    : ` ${metrics?.worstPerformance?.seats} இடங்கள் (${metrics?.worstPerformance?.voteShare}% வாக்குகள்)`
                  }
                </p>
              </div>
            </div>
            {/* Strongholds */}
            <div>
              <div className="flex items-center space-x-2 mb-3">
                <Icon name="MapPin" size={16} className="text-primary" />
                <span className="text-sm font-medium text-muted-foreground">
                  {language === 'en' ? 'Key Strongholds' : 'முக்கிய கோட்டைகள்'}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {metrics?.strongholds?.map((constituency, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full"
                  >
                    {constituency}
                  </span>
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PartyPerformanceCards;