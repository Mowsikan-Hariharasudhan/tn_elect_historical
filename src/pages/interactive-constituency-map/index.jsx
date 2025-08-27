import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import FilterPanel from './components/FilterPanel';
import ConstituencyMap from './components/ConstituencyMap';
import ConstituencyCard from './components/ConstituencyCard';
import ConstituencyModal from './components/ConstituencyModal';
import MapLegend from './components/MapLegend';
import BreadcrumbNavigation from './components/BreadcrumbNavigation';

const InteractiveConstituencyMap = () => {
  const [language, setLanguage] = useState('en');
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const [isLegendVisible, setIsLegendVisible] = useState(true);
  const [highContrast, setHighContrast] = useState(false);
  const [hoveredConstituency, setHoveredConstituency] = useState(null);
  const [hoverPosition, setHoverPosition] = useState({ x: 0, y: 0 });
  const [selectedConstituency, setSelectedConstituency] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  
  const [filters, setFilters] = useState({
    party: 'all',
    year: 'all',
    gender: 'all',
    turnout: [40, 90],
    margin: 100
  });

  // Mock search suggestions
  const allConstituencies = [
    { name: language === 'en' ? 'Chennai Central' : 'சென்னை மத்திய', district: language === 'en' ? 'Chennai' : 'சென்னை' },
    { name: language === 'en' ? 'Coimbatore North' : 'கோயம்புத்தூர் வடக்கு', district: language === 'en' ? 'Coimbatore' : 'கோயம்புத்தூர்' },
    { name: language === 'en' ? 'Madurai East' : 'மதுரை கிழக்கு', district: language === 'en' ? 'Madurai' : 'மதுரை' },
    { name: language === 'en' ? 'Salem West' : 'சேலம் மேற்கு', district: language === 'en' ? 'Salem' : 'சேலம்' },
    { name: language === 'en' ? 'Trichy Central' : 'திருச்சி மத்திய', district: language === 'en' ? 'Tiruchirappalli' : 'திருச்சிராப்பள்ளி' }
  ];

  // Load language preference from localStorage
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  // Save language preference to localStorage
  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  // Handle search
  useEffect(() => {
    if (searchQuery?.trim()) {
      const filtered = allConstituencies?.filter(constituency =>
        constituency?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        constituency?.district?.toLowerCase()?.includes(searchQuery?.toLowerCase())
      );
      setSearchSuggestions(filtered?.slice(0, 5));
    } else {
      setSearchSuggestions([]);
    }
  }, [searchQuery, language]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleFilterRemove = (key) => {
    if (key === 'turnout') {
      setFilters(prev => ({ ...prev, turnout: [40, 90] }));
    } else if (key === 'margin') {
      setFilters(prev => ({ ...prev, margin: 100 }));
    } else {
      setFilters(prev => ({ ...prev, [key]: 'all' }));
    }
  };

  const handleResetFilters = () => {
    setFilters({
      party: 'all',
      year: 'all',
      gender: 'all',
      turnout: [40, 90],
      margin: 100
    });
    setSearchQuery('');
  };

  const handleConstituencyHover = (constituency, position) => {
    setHoveredConstituency(constituency);
    if (position) {
      setHoverPosition(position);
    }
  };

  const handleConstituencyClick = (constituency) => {
    setSelectedConstituency(constituency);
    setIsModalOpen(true);
    setHoveredConstituency(null);
  };

  const handleSearchSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion?.name);
    setSearchSuggestions([]);
    // In a real app, this would zoom to the constituency
    console.log('Navigating to:', suggestion?.name);
  };

  const handleExportData = (constituency) => {
    // Mock export functionality
    const exportData = {
      constituency: constituency?.name,
      district: constituency?.district,
      currentMLA: constituency?.currentMLA,
      lastElection: constituency?.lastElection,
      totalVoters: constituency?.totalVoters,
      validVotes: constituency?.validVotes,
      exportedAt: new Date()?.toISOString()
    };
    
    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${constituency?.name?.replace(/\s+/g, '_')}_data.json`;
    link?.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>
          {language === 'en' ?'Interactive Constituency Map - TN Elect Historical' :'ஊடாடும் தொகுதி வரைபடம் - TN Elect Historical'
          }
        </title>
        <meta 
          name="description" 
          content={language === 'en' ?'Explore Tamil Nadu\'s 234 constituencies through interactive map visualization with detailed electoral data and historical analysis.'
            : 'விரிவான தேர்தல் தரவு மற்றும் வரலாற்று பகுப்பாய்வுடன் ஊடாடும் வரைபட காட்சிப்படுத்தல் மூலம் தமிழ்நாட்டின் 234 தொகுதிகளை ஆராயுங்கள்.'
          }
        />
      </Helmet>

      <Header />
      
      <BreadcrumbNavigation
        language={language}
        filters={filters}
        onFilterRemove={handleFilterRemove}
        onReset={handleResetFilters}
      />

      <div className="flex h-[calc(100vh-120px)]">
        <FilterPanel
          language={language}
          isOpen={isFilterPanelOpen}
          onToggle={() => setIsFilterPanelOpen(!isFilterPanelOpen)}
          filters={filters}
          onFilterChange={handleFilterChange}
          onReset={handleResetFilters}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          searchSuggestions={searchSuggestions}
          onSuggestionClick={handleSearchSuggestionClick}
        />

        <div className="flex-1 relative">
          <ConstituencyMap
            language={language}
            filters={filters}
            onConstituencyHover={handleConstituencyHover}
            onConstituencyClick={handleConstituencyClick}
            selectedConstituency={selectedConstituency}
            highContrast={highContrast}
          />

          {hoveredConstituency && (
            <ConstituencyCard
              constituency={hoveredConstituency}
              language={language}
              position={hoverPosition}
              onClose={() => setHoveredConstituency(null)}
              onViewDetails={handleConstituencyClick}
            />
          )}

          <MapLegend
            language={language}
            isVisible={isLegendVisible}
            onToggle={() => setIsLegendVisible(!isLegendVisible)}
            highContrast={highContrast}
            onHighContrastToggle={() => setHighContrast(!highContrast)}
          />
        </div>
      </div>

      <ConstituencyModal
        constituency={selectedConstituency}
        language={language}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedConstituency(null);
        }}
        onExport={handleExportData}
      />
    </div>
  );
};

export default InteractiveConstituencyMap;