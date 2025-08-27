import React, { useState, useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import ElectionYearSelector from './components/ElectionYearSelector';
import SearchFilters from './components/SearchFilters';
import ResultCard from './components/ResultCard';
import ResultsTable from './components/ResultsTable';
import ResultDetailModal from './components/ResultDetailModal';
import ExportTools from './components/ExportTools';
import ComparisonTools from './components/ComparisonTools';
import { electionService } from '../../services/electionService';

const ElectionResultsArchive = () => {
  const [language, setLanguage] = useState('en');
  const [selectedYear, setSelectedYear] = useState(2021);
  const [viewMode, setViewMode] = useState('cards'); // 'cards' or 'table'
  const [selectedResult, setSelectedResult] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: 'votes_received', direction: 'desc' });
  const [showComparison, setShowComparison] = useState(false);
  const [filters, setFilters] = useState({
    searchQuery: '',
    party: '',
    constituency: '',
    marginRange: ''
  });

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [availableYears, setAvailableYears] = useState([]);
  const [statistics, setStatistics] = useState(null);

  const resultsPerPage = 12;

  // Load language preference
  useEffect(() => {
    const savedLanguage = localStorage.getItem('tnelect_language') || 'en';
    setLanguage(savedLanguage);
  }, []);

  // Load available election years
  useEffect(() => {
    let isMounted = true;

    const loadElectionYears = async () => {
      try {
        const years = await electionService?.getElectionYears();
        if (isMounted) {
          setAvailableYears(years);
          if (years?.length > 0 && !years?.includes(selectedYear)) {
            setSelectedYear(years?.[0]);
          }
        }
      } catch (error) {
        if (isMounted) {
          setError('Failed to load election years');
          console.error('Election years fetch error:', error);
        }
      }
    };

    loadElectionYears();

    return () => {
      isMounted = false;
    };
  }, [selectedYear]);

  // Load election results
  useEffect(() => {
    let isMounted = true;

    const loadResults = async () => {
      try {
        setLoading(true);
        setError('');
        
        const data = await electionService?.getElectionResults({
          year: selectedYear,
          ...filters
        });
        
        if (isMounted) {
          setResults(data || []);
        }
      } catch (error) {
        if (isMounted) {
          setError('Failed to load election results');
          console.error('Election results fetch error:', error);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadResults();

    return () => {
      isMounted = false;
    };
  }, [selectedYear, filters]);

  // Load election statistics
  useEffect(() => {
    let isMounted = true;

    const loadStatistics = async () => {
      try {
        const stats = await electionService?.getElectionStatistics(selectedYear);
        if (isMounted) {
          setStatistics(stats);
        }
      } catch (error) {
        if (isMounted) {
          console.error('Statistics fetch error:', error);
        }
      }
    };

    loadStatistics();

    return () => {
      isMounted = false;
    };
  }, [selectedYear]);

  // Filter and sort results
  const filteredResults = useMemo(() => {
    let filtered = results?.filter(result => {
      const candidateName = language === 'en' 
        ? result?.candidate?.name_en 
        : result?.candidate?.name_ta;
      const constituencyName = language === 'en' 
        ? result?.constituency?.name_en 
        : result?.constituency?.name_ta;
      const partyName = result?.party?.short_name;

      const matchesSearch = !filters?.searchQuery || 
        candidateName?.toLowerCase()?.includes(filters?.searchQuery?.toLowerCase()) ||
        constituencyName?.toLowerCase()?.includes(filters?.searchQuery?.toLowerCase()) ||
        partyName?.toLowerCase()?.includes(filters?.searchQuery?.toLowerCase());

      const matchesParty = !filters?.party || partyName === filters?.party;
      
      const matchesConstituency = !filters?.constituency || 
        constituencyName?.toLowerCase()?.includes(filters?.constituency?.toLowerCase());

      const matchesMargin = !filters?.marginRange || (() => {
        const margin = result?.margin_votes;
        switch (filters?.marginRange) {
          case '0-1000': return margin <= 1000;
          case '1000-5000': return margin > 1000 && margin <= 5000;
          case '5000-10000': return margin > 5000 && margin <= 10000;
          case '10000+': return margin > 10000;
          default: return true;
        }
      })();

      return matchesSearch && matchesParty && matchesConstituency && matchesMargin;
    }) || [];

    // Sort results
    if (sortConfig?.key) {
      filtered?.sort((a, b) => {
        let aValue = a?.[sortConfig?.key];
        let bValue = b?.[sortConfig?.key];

        if (sortConfig?.key === 'candidate') {
          aValue = language === 'en' ? a?.candidate?.name_en : a?.candidate?.name_ta;
          bValue = language === 'en' ? b?.candidate?.name_en : b?.candidate?.name_ta;
        } else if (sortConfig?.key === 'constituency') {
          aValue = language === 'en' ? a?.constituency?.name_en : a?.constituency?.name_ta;
          bValue = language === 'en' ? b?.constituency?.name_en : b?.constituency?.name_ta;
        } else if (sortConfig?.key === 'percentage') {
          aValue = a?.vote_percentage;
          bValue = b?.vote_percentage;
        } else if (sortConfig?.key === 'votes') {
          aValue = a?.votes_received;
          bValue = b?.votes_received;
        }

        if (typeof aValue === 'string') {
          aValue = aValue?.toLowerCase();
          bValue = bValue?.toLowerCase();
        }

        if (sortConfig?.direction === 'asc') {
          return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
        } else {
          return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
        }
      });
    }

    return filtered;
  }, [results, filters, sortConfig, language]);

  // Pagination
  const totalPages = Math.ceil(filteredResults?.length / resultsPerPage);
  const paginatedResults = filteredResults?.slice(
    (currentPage - 1) * resultsPerPage,
    currentPage * resultsPerPage
  );

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev?.key === key && prev?.direction === 'desc' ? 'asc' : 'desc'
    }));
  };

  const handleViewDetails = (result) => {
    setSelectedResult(result);
    setIsModalOpen(true);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Show loading state
  if (loading && results?.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <span className="ml-3 text-muted-foreground">
              {language === 'en' ? 'Loading election results...' : 'தேர்தல் முடிவுகள் ஏற்றப்படுகின்றன...'}
            </span>
          </div>
        </main>
      </div>
    );
  }

  // Show error state
  if (error && !loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
          <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-6 text-center">
            <Icon name="AlertCircle" size={48} className="text-destructive mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-destructive mb-2">
              {language === 'en' ? 'Error Loading Data' : 'தரவு ஏற்றுவதில் பிழை'}
            </h3>
            <p className="text-muted-foreground mb-4">{error}</p>
            <Button 
              onClick={() => window.location?.reload()}
              variant="outline"
            >
              {language === 'en' ? 'Retry' : 'மீண்டும் முயற்சிக்கவும்'}
            </Button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>
          {language === 'en' ?'Election Results Archive - TN Elect Historical' :'தேர்தல் முடிவுகள் காப்பகம் - TN Elect Historical'
          }
        </title>
        <meta 
          name="description" 
          content={language === 'en' ?'Complete historical election results archive for Tamil Nadu from 1952 onwards with detailed candidate information and statistics' :'தமிழ்நாட்டின் 1952 முதல் முழுமையான வரலாற்று தேர்தல் முடிவுகள் காப்பகம் விரிவான வேட்பாளர் தகவல்கள் மற்றும் புள்ளிவிவரங்களுடன்'
          } 
        />
      </Helmet>
      <Header />
      <main className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="Archive" size={24} color="white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                {language === 'en' ? 'Election Results Archive' : 'தேர்தல் முடிவுகள் காப்பகம்'}
              </h1>
              <p className="text-muted-foreground">
                {language === 'en' ?'Complete historical election data from 1952 onwards' :'1952 முதல் முழுமையான வரலாற்று தேர்தல் தரவு'
                }
              </p>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-card border border-border rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-primary">{filteredResults?.length || 0}</p>
              <p className="text-sm text-muted-foreground">
                {language === 'en' ? 'Results Found' : 'முடிவுகள் கண்டுபிடிக்கப்பட்டன'}
              </p>
            </div>
            <div className="bg-card border border-border rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-success">{statistics?.totalConstituencies || 0}</p>
              <p className="text-sm text-muted-foreground">
                {language === 'en' ? 'Constituencies' : 'தொகுதிகள்'}
              </p>
            </div>
            <div className="bg-card border border-border rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-warning">{availableYears?.length || 0}</p>
              <p className="text-sm text-muted-foreground">
                {language === 'en' ? 'Years of Data' : 'ஆண்டுகள் தரவு'}
              </p>
            </div>
            <div className="bg-card border border-border rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-accent">{Object.keys(statistics?.partyWiseResults || {})?.length || 0}</p>
              <p className="text-sm text-muted-foreground">
                {language === 'en' ? 'Political Parties' : 'அரசியல் கட்சிகள்'}
              </p>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <ElectionYearSelector
              selectedYear={selectedYear}
              onYearChange={setSelectedYear}
              availableYears={availableYears}
              language={language}
            />
            
            <div className="flex items-center space-x-2">
              <Button
                variant={viewMode === 'cards' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('cards')}
              >
                <Icon name="Grid3X3" size={16} />
              </Button>
              <Button
                variant={viewMode === 'table' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('table')}
              >
                <Icon name="Table" size={16} />
              </Button>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant={showComparison ? 'default' : 'outline'}
              onClick={() => setShowComparison(!showComparison)}
              iconName="GitCompare"
              iconPosition="left"
            >
              {language === 'en' ? 'Compare' : 'ஒப்பிடுக'}
            </Button>
            
            <Button
              variant="outline"
              onClick={() => {
                const newLang = language === 'en' ? 'ta' : 'en';
                setLanguage(newLang);
                localStorage.setItem('tnelect_language', newLang);
              }}
            >
              {language === 'en' ? 'தமிழ்' : 'ENG'}
            </Button>
          </div>
        </div>

        {/* Search and Filters */}
        <SearchFilters
          filters={filters}
          onFiltersChange={setFilters}
          language={language}
        />

        {/* Comparison Tools */}
        {showComparison && (
          <div className="mb-6">
            <ComparisonTools language={language} />
          </div>
        )}

        {/* Results */}
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          <div className="xl:col-span-3">
            {filteredResults?.length === 0 ? (
              <div className="bg-card border border-border rounded-lg p-12 text-center">
                <Icon name="Search" size={48} className="text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {language === 'en' ? 'No Results Found' : 'முடிவுகள் எதுவும் கிடைக்கவில்லை'}
                </h3>
                <p className="text-muted-foreground">
                  {language === 'en' ?'Try adjusting your search criteria or filters' :'உங்கள் தேடல் அளவுகோல்கள் அல்லது வடிகட்டிகளை சரிசெய்ய முயற்சிக்கவும்'
                  }
                </p>
              </div>
            ) : (
              <>
                {viewMode === 'cards' ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {paginatedResults?.map((result, index) => (
                      <ResultCard
                        key={result?.id || index}
                        result={result}
                        language={language}
                        onViewDetails={handleViewDetails}
                      />
                    ))}
                  </div>
                ) : (
                  <ResultsTable
                    results={paginatedResults}
                    language={language}
                    onViewDetails={handleViewDetails}
                    onSort={handleSort}
                    sortConfig={sortConfig}
                  />
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center space-x-2 mt-8">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                    >
                      <Icon name="ChevronLeft" size={16} />
                    </Button>
                    
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      const page = i + 1;
                      return (
                        <Button
                          key={page}
                          variant={currentPage === page ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => handlePageChange(page)}
                        >
                          {page}
                        </Button>
                      );
                    })}
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                    >
                      <Icon name="ChevronRight" size={16} />
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <ExportTools
              results={filteredResults}
              filters={filters}
              language={language}
            />
          </div>
        </div>
      </main>
      {/* Result Detail Modal */}
      <ResultDetailModal
        result={selectedResult}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        language={language}
      />
    </div>
  );
};

export default ElectionResultsArchive;