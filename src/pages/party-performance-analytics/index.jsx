import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import PartyComparisonChart from './components/PartyComparisonChart';
import PartyPerformanceCards from './components/PartyPerformanceCards';
import FilterPanel from './components/FilterPanel';
import RegionalAnalysis from './components/RegionalAnalysis';
import AudioPlayer from './components/AudioPlayer';
import ExportPanel from './components/ExportPanel';

const PartyPerformanceAnalytics = () => {
  const [language, setLanguage] = useState('en');
  const [selectedParties, setSelectedParties] = useState(['DMK', 'AIADMK']);
  const [activeTab, setActiveTab] = useState('overview');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    timeRange: 'all',
    constituencyType: 'all',
    performanceMetric: 'voteShare',
    allianceType: 'all',
    showTrends: true,
    showComparison: false,
    includeMinorParties: false
  });

  // Load language preference from localStorage
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setLanguage(savedLanguage);
  }, []);

  // Save language preference to localStorage
  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const handlePartyToggle = (party) => {
    setSelectedParties(prev => {
      if (prev?.includes(party)) {
        return prev?.filter(p => p !== party);
      } else {
        return [...prev, party];
      }
    });
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const tabs = [
    {
      id: 'overview',
      label: language === 'en' ? 'Overview' : 'மேலோட்டம்',
      icon: 'BarChart3'
    },
    {
      id: 'comparison',
      label: language === 'en' ? 'Comparison' : 'ஒப்பீடு',
      icon: 'GitCompare'
    },
    {
      id: 'regional',
      label: language === 'en' ? 'Regional' : 'பிராந்திய',
      icon: 'Map'
    },
    {
      id: 'audio',
      label: language === 'en' ? 'Theme Songs' : 'கருப்பொருள் பாடல்கள்',
      icon: 'Music'
    },
    {
      id: 'export',
      label: language === 'en' ? 'Export' : 'ஏற்றுமதி',
      icon: 'Download'
    }
  ];

  const pageTitle = language === 'en' ?'Party Performance Analytics - TN Elect Historical' :'கட்சி செயல்திறன் பகுப்பாய்வு - TN Elect Historical';

  const pageDescription = language === 'en' ?'Comprehensive analysis of political party performance across decades of Tamil Nadu elections. Compare vote shares, seat wins, and regional strongholds.' :'தமிழ்நாடு தேர்தல்களின் பல தசாப்தங்களில் அரசியல் கட்சிகளின் செயல்திறனின் விரிவான பகுப்பாய்வு. வாக்கு பங்குகள், இடங்கள் வெற்றி மற்றும் பிராந்திய கோட்டைகளை ஒப்பிடுங்கள்.';

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="max-w-7xl mx-auto px-4 lg:px-6 py-6">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="TrendingUp" size={24} color="white" />
              </div>
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-foreground">
                  {language === 'en' ? 'Party Performance Analytics' : 'கட்சி செயல்திறன் பகுப்பாய்வு'}
                </h1>
                <p className="text-muted-foreground">
                  {language === 'en' ?'Comprehensive insights into political party trends and electoral success patterns' :'அரசியல் கட்சி போக்குகள் மற்றும் தேர்தல் வெற்றி முறைகள் பற்றிய விரிவான நுண்ணறிவுகள்'
                  }
                </p>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="bg-card border border-border rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="Users" size={16} className="text-primary" />
                  <span className="text-sm text-muted-foreground">
                    {language === 'en' ? 'Major Parties' : 'முக்கிய கட்சிகள்'}
                  </span>
                </div>
                <p className="text-2xl font-bold text-foreground">5</p>
              </div>
              
              <div className="bg-card border border-border rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="Calendar" size={16} className="text-primary" />
                  <span className="text-sm text-muted-foreground">
                    {language === 'en' ? 'Elections' : 'தேர்தல்கள்'}
                  </span>
                </div>
                <p className="text-2xl font-bold text-foreground">16</p>
              </div>
              
              <div className="bg-card border border-border rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="MapPin" size={16} className="text-primary" />
                  <span className="text-sm text-muted-foreground">
                    {language === 'en' ? 'Constituencies' : 'தொகுதிகள்'}
                  </span>
                </div>
                <p className="text-2xl font-bold text-foreground">234</p>
              </div>
              
              <div className="bg-card border border-border rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="Clock" size={16} className="text-primary" />
                  <span className="text-sm text-muted-foreground">
                    {language === 'en' ? 'Years Covered' : 'ஆண்டுகள் உள்ளடக்கம்'}
                  </span>
                </div>
                <p className="text-2xl font-bold text-foreground">70+</p>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-4 gap-6">
            {/* Filter Sidebar */}
            <div className="lg:col-span-1">
              <FilterPanel
                filters={filters}
                onFiltersChange={handleFiltersChange}
                language={language}
                isOpen={isFilterOpen}
                onToggle={() => setIsFilterOpen(!isFilterOpen)}
              />
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3 space-y-6">
              {/* Tab Navigation */}
              <div className="bg-card border border-border rounded-lg p-1">
                <div className="flex flex-wrap gap-1">
                  {tabs?.map(tab => (
                    <Button
                      key={tab?.id}
                      variant={activeTab === tab?.id ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setActiveTab(tab?.id)}
                      className="flex-1 min-w-0"
                      iconName={tab?.icon}
                      iconPosition="left"
                    >
                      <span className="hidden sm:inline">{tab?.label}</span>
                      <span className="sm:hidden">
                        <Icon name={tab?.icon} size={16} />
                      </span>
                    </Button>
                  ))}
                </div>
              </div>

              {/* Tab Content */}
              <div className="space-y-6">
                {activeTab === 'overview' && (
                  <>
                    <PartyPerformanceCards 
                      selectedParties={selectedParties}
                      language={language}
                    />
                  </>
                )}

                {activeTab === 'comparison' && (
                  <>
                    <PartyComparisonChart
                      selectedParties={selectedParties}
                      language={language}
                      onPartyToggle={handlePartyToggle}
                    />
                  </>
                )}

                {activeTab === 'regional' && (
                  <>
                    <RegionalAnalysis
                      selectedParties={selectedParties}
                      language={language}
                    />
                  </>
                )}

                {activeTab === 'audio' && (
                  <>
                    <AudioPlayer
                      selectedParties={selectedParties}
                      language={language}
                    />
                  </>
                )}

                {activeTab === 'export' && (
                  <>
                    <ExportPanel
                      selectedParties={selectedParties}
                      filters={filters}
                      language={language}
                    />
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Footer Note */}
          <div className="mt-12 text-center">
            <p className="text-sm text-muted-foreground">
              {language === 'en' 
                ? `Data compiled from Election Commission of India records (1952-${new Date()?.getFullYear()})`
                : `இந்திய தேர்தல் ஆணையத்தின் பதிவுகளிலிருந்து தொகுக்கப்பட்ட தரவு (1952-${new Date()?.getFullYear()})`
              }
            </p>
          </div>
        </main>
      </div>
    </>
  );
};

export default PartyPerformanceAnalytics;