import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import QuickStatsCard from './components/QuickStatsCard';
import InteractiveTimeline from './components/InteractiveTimeline';
import FilterPanel from './components/FilterPanel';
import FeaturedInsights from './components/FeaturedInsights';
import AudioControls from './components/AudioControls';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const HistoricalTimelineDashboard = () => {
  const navigate = useNavigate();
  const [language, setLanguage] = useState('en');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedElection, setSelectedElection] = useState(null);
  const [filters, setFilters] = useState({
    yearRange: [1952, 2021],
    party: 'all',
    constituency: 'all',
    turnoutRange: [0, 100]
  });

  // Load language preference from localStorage
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setLanguage(savedLanguage);
  }, []);

  // Mock election data
  const elections = [
    {
      id: 1,
      year: 1952,
      date: '27 Mar 1952',
      winningParty: 'INC',
      chiefMinister: 'C. Rajagopalachari',
      turnout: 65.2,
      seatsWon: 152,
      totalSeats: 205,
      partySymbol: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=100&h=100&fit=crop'
    },
    {
      id: 2,
      year: 1957,
      date: '31 Mar 1957',
      winningParty: 'INC',
      chiefMinister: 'K. Kamaraj',
      turnout: 68.4,
      seatsWon: 161,
      totalSeats: 206,
      partySymbol: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=100&h=100&fit=crop'
    },
    {
      id: 3,
      year: 1962,
      date: '21 Feb 1962',
      winningParty: 'INC',
      chiefMinister: 'K. Kamaraj',
      turnout: 71.8,
      seatsWon: 138,
      totalSeats: 206,
      partySymbol: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=100&h=100&fit=crop'
    },
    {
      id: 4,
      year: 1967,
      date: '21 Feb 1967',
      winningParty: 'DMK',
      chiefMinister: 'C. N. Annadurai',
      turnout: 74.2,
      seatsWon: 138,
      totalSeats: 234,
      partySymbol: 'https://images.pexels.com/photos/1550337/pexels-photo-1550337.jpeg?w=100&h=100&fit=crop'
    },
    {
      id: 5,
      year: 1971,
      date: '15 Mar 1971',
      winningParty: 'DMK',
      chiefMinister: 'M. Karunanidhi',
      turnout: 72.6,
      seatsWon: 184,
      totalSeats: 234,
      partySymbol: 'https://images.pexels.com/photos/1550337/pexels-photo-1550337.jpeg?w=100&h=100&fit=crop'
    },
    {
      id: 6,
      year: 1977,
      date: '10 Jun 1977',
      winningParty: 'AIADMK',
      chiefMinister: 'M. G. Ramachandran',
      turnout: 75.8,
      seatsWon: 130,
      totalSeats: 234,
      partySymbol: 'https://images.pixabay.com/photo/2016/11/29/13/14/attractive-1869761_1280.jpg?w=100&h=100&fit=crop'
    },
    {
      id: 7,
      year: 1980,
      date: '28 May 1980',
      winningParty: 'AIADMK',
      chiefMinister: 'M. G. Ramachandran',
      turnout: 73.4,
      seatsWon: 129,
      totalSeats: 234,
      partySymbol: 'https://images.pixabay.com/photo/2016/11/29/13/14/attractive-1869761_1280.jpg?w=100&h=100&fit=crop'
    },
    {
      id: 8,
      year: 1984,
      date: '24 Dec 1984',
      winningParty: 'AIADMK',
      chiefMinister: 'M. G. Ramachandran',
      turnout: 76.2,
      seatsWon: 132,
      totalSeats: 234,
      partySymbol: 'https://images.pixabay.com/photo/2016/11/29/13/14/attractive-1869761_1280.jpg?w=100&h=100&fit=crop'
    },
    {
      id: 9,
      year: 1989,
      date: '21 Jan 1989',
      winningParty: 'DMK',
      chiefMinister: 'M. Karunanidhi',
      turnout: 78.9,
      seatsWon: 151,
      totalSeats: 234,
      partySymbol: 'https://images.pexels.com/photos/1550337/pexels-photo-1550337.jpeg?w=100&h=100&fit=crop'
    },
    {
      id: 10,
      year: 1991,
      date: '24 Jun 1991',
      winningParty: 'AIADMK',
      chiefMinister: 'J. Jayalalithaa',
      turnout: 68.5,
      seatsWon: 164,
      totalSeats: 234,
      partySymbol: 'https://images.pixabay.com/photo/2016/11/29/13/14/attractive-1869761_1280.jpg?w=100&h=100&fit=crop'
    },
    {
      id: 11,
      year: 1996,
      date: '2 May 1996',
      winningParty: 'DMK',
      chiefMinister: 'M. Karunanidhi',
      turnout: 73.8,
      seatsWon: 173,
      totalSeats: 234,
      partySymbol: 'https://images.pexels.com/photos/1550337/pexels-photo-1550337.jpeg?w=100&h=100&fit=crop'
    },
    {
      id: 12,
      year: 2001,
      date: '10 May 2001',
      winningParty: 'AIADMK',
      chiefMinister: 'J. Jayalalithaa',
      turnout: 71.2,
      seatsWon: 132,
      totalSeats: 234,
      partySymbol: 'https://images.pixabay.com/photo/2016/11/29/13/14/attractive-1869761_1280.jpg?w=100&h=100&fit=crop'
    },
    {
      id: 13,
      year: 2006,
      date: '8 May 2006',
      winningParty: 'DMK',
      chiefMinister: 'M. Karunanidhi',
      turnout: 74.6,
      seatsWon: 163,
      totalSeats: 234,
      partySymbol: 'https://images.pexels.com/photos/1550337/pexels-photo-1550337.jpeg?w=100&h=100&fit=crop'
    },
    {
      id: 14,
      year: 2011,
      date: '13 May 2011',
      winningParty: 'AIADMK',
      chiefMinister: 'J. Jayalalithaa',
      turnout: 78.2,
      seatsWon: 150,
      totalSeats: 234,
      partySymbol: 'https://images.pixabay.com/photo/2016/11/29/13/14/attractive-1869761_1280.jpg?w=100&h=100&fit=crop'
    },
    {
      id: 15,
      year: 2016,
      date: '16 May 2016',
      winningParty: 'AIADMK',
      chiefMinister: 'J. Jayalalithaa',
      turnout: 74.3,
      seatsWon: 134,
      totalSeats: 234,
      partySymbol: 'https://images.pixabay.com/photo/2016/11/29/13/14/attractive-1869761_1280.jpg?w=100&h=100&fit=crop'
    },
    {
      id: 16,
      year: 2021,
      date: '6 Apr 2021',
      winningParty: 'DMK',
      chiefMinister: 'M. K. Stalin',
      turnout: 71.9,
      seatsWon: 133,
      totalSeats: 234,
      partySymbol: 'https://images.pexels.com/photos/1550337/pexels-photo-1550337.jpeg?w=100&h=100&fit=crop'
    }
  ];

  const handleElectionClick = (election) => {
    setSelectedElection(election);
    // Navigate to detailed election results
    navigate(`/election-results-archive?year=${election?.year}`);
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const quickStats = [
    {
      icon: 'Calendar',
      title: language === 'en' ? 'Total Elections' : 'மொத்த தேர்தல்கள்',
      value: '16',
      subtitle: language === 'en' ? 'Since 1952' : '1952 முதல்',
      trend: 'up',
      trendValue: '+1'
    },
    {
      icon: 'MapPin',
      title: language === 'en' ? 'Constituencies' : 'தொகுதிகள்',
      value: '234',
      subtitle: language === 'en' ? 'Current count' : 'தற்போதைய எண்ணிக்கை',
      trend: 'up',
      trendValue: '+29'
    },
    {
      icon: 'Users',
      title: language === 'en' ? 'Total Candidates' : 'மொத்த வேட்பாளர்கள்',
      value: '12,847',
      subtitle: language === 'en' ? 'All elections' : 'அனைத்து தேர்தல்கள்',
      trend: 'up',
      trendValue: '+15%'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
            {language === 'en' ? 'Tamil Nadu Electoral History' : 'தமிழ்நாடு தேர்தல் வரலாறு'}
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {language === 'en' ?'Explore seven decades of democratic evolution in Tamil Nadu through interactive visualizations and comprehensive data analysis from 1952 to present.' :'1952 முதல் இன்று வரை தமிழ்நாட்டின் ஏழு தசாப்த கால ஜனநாயக பரிணாம வளர்ச்சியை ஊடாடும் காட்சிப்படுத்தல் மற்றும் விரிவான தரவு பகுப்பாய்வு மூலம் ஆராயுங்கள்.'
            }
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {quickStats?.map((stat, index) => (
            <QuickStatsCard
              key={index}
              icon={stat?.icon}
              title={stat?.title}
              value={stat?.value}
              subtitle={stat?.subtitle}
              trend={stat?.trend}
              trendValue={stat?.trendValue}
              language={language}
            />
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filter Panel */}
          <div className="lg:col-span-1">
            <FilterPanel
              filters={filters}
              onFiltersChange={handleFiltersChange}
              isOpen={isFilterOpen}
              onToggle={() => setIsFilterOpen(!isFilterOpen)}
              language={language}
            />
          </div>

          {/* Timeline and Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Interactive Timeline */}
            <InteractiveTimeline
              elections={elections}
              onElectionClick={handleElectionClick}
              language={language}
            />

            {/* Quick Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button
                variant="outline"
                onClick={() => navigate('/interactive-constituency-map')}
                iconName="Map"
                iconPosition="left"
                fullWidth
              >
                {language === 'en' ? 'View Map' : 'வரைபடம் பார்க்க'}
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate('/candidate-profile-explorer')}
                iconName="Users"
                iconPosition="left"
                fullWidth
              >
                {language === 'en' ? 'Candidates' : 'வேட்பாளர்கள்'}
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate('/party-performance-analytics')}
                iconName="TrendingUp"
                iconPosition="left"
                fullWidth
              >
                {language === 'en' ? 'Analytics' : 'பகுப்பாய்வு'}
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate('/election-results-archive')}
                iconName="Archive"
                iconPosition="left"
                fullWidth
              >
                {language === 'en' ? 'Results' : 'முடிவுகள்'}
              </Button>
            </div>

            {/* Featured Insights */}
            <FeaturedInsights language={language} />
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center bg-card border border-border rounded-lg p-8">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            {language === 'en' ? 'Explore More Features' : 'மேலும் அம்சங்களை ஆராயுங்கள்'}
          </h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            {language === 'en' ?'Dive deeper into Tamil Nadu\'s electoral data with our comprehensive tools and interactive visualizations.' :'எங்கள் விரிவான கருவிகள் மற்றும் ஊடாடும் காட்சிப்படுத்தல்களுடன் தமிழ்நாட்டின் தேர்தல் தரவுகளில் ஆழமாக மூழ்குங்கள்.'
            }
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="default"
              onClick={() => navigate('/authentication-registration')}
              iconName="UserPlus"
              iconPosition="left"
            >
              {language === 'en' ? 'Create Account' : 'கணக்கு உருவாக்கு'}
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate('/interactive-constituency-map')}
              iconName="ExternalLink"
              iconPosition="right"
            >
              {language === 'en' ? 'Start Exploring' : 'ஆராய்ச்சி தொடங்கு'}
            </Button>
          </div>
        </div>
      </main>
      {/* Audio Controls */}
      <AudioControls language={language} />
      {/* Footer */}
      <footer className="bg-card border-t border-border mt-16">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                  <Icon name="Vote" size={24} color="white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">TN Elect Historical</h3>
                  <p className="text-sm text-muted-foreground">
                    {language === 'en' ? 'Electoral Data Platform' : 'தேர்தல் தரவு தளம்'}
                  </p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                {language === 'en' ?'Comprehensive historical election data visualization platform for Tamil Nadu\'s electoral history from 1952 to present.' :'1952 முதல் இன்று வரை தமிழ்நாட்டின் தேர்தல் வரலாற்றுக்கான விரிவான வரலாற்று தேர்தல் தரவு காட்சிப்படுத்தல் தளம்.'
                }
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-foreground mb-3">
                {language === 'en' ? 'Quick Links' : 'விரைவு இணைப்புகள்'}
              </h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <button onClick={() => navigate('/interactive-constituency-map')} className="hover:text-foreground transition-colors">
                    {language === 'en' ? 'Constituency Map' : 'தொகுதி வரைபடம்'}
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate('/candidate-profile-explorer')} className="hover:text-foreground transition-colors">
                    {language === 'en' ? 'Candidate Profiles' : 'வேட்பாளர் சுயவிவரங்கள்'}
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate('/party-performance-analytics')} className="hover:text-foreground transition-colors">
                    {language === 'en' ? 'Party Analytics' : 'கட்சி பகுப்பாய்வு'}
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate('/election-results-archive')} className="hover:text-foreground transition-colors">
                    {language === 'en' ? 'Results Archive' : 'முடிவுகள் காப்பகம்'}
                  </button>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-foreground mb-3">
                {language === 'en' ? 'Contact' : 'தொடர்பு'}
              </h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>info@tnelecthistorical.gov.in</p>
                <p>+91 44 2345 6789</p>
                <p>
                  {language === 'en' ?'Election Commission of Tamil Nadu' :'தமிழ்நாடு தேர்தல் ஆணையம்'
                  }
                </p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-border mt-8 pt-6 text-center text-sm text-muted-foreground">
            <p>
              © {new Date()?.getFullYear()} TN Elect Historical. {language === 'en' ? 'All rights reserved.' : 'அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.'}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HistoricalTimelineDashboard;