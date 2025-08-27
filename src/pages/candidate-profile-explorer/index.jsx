import React, { useState, useEffect, useMemo } from 'react';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import SearchFilters from './components/SearchFilters';
import CandidateCard from './components/CandidateCard';
import CandidateListView from './components/CandidateListView';
import CandidateModal from './components/CandidateModal';
import SortingControls from './components/SortingControls';

const CandidateProfileExplorer = () => {
  const [language, setLanguage] = useState('en');
  const [filters, setFilters] = useState({
    search: '',
    party: '',
    gender: '',
    status: '',
    year: '',
    education: '',
    minAge: '',
    maxAge: '',
    minElections: '',
    minVictories: ''
  });
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [viewMode, setViewMode] = useState('grid');
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);

  // Load language preference
  useEffect(() => {
    const savedLanguage = localStorage.getItem('selectedLanguage') || 'en';
    setLanguage(savedLanguage);
  }, []);

  // Mock candidate data
  const mockCandidates = [
    {
      id: 1,
      name: { en: 'M. K. Stalin', ta: 'மு. க. ஸ்டாலின்' },
      party: 'DMK',
      partySymbol: 'https://images.pexels.com/photos/8828786/pexels-photo-8828786.jpeg',
      photo: 'https://images.pexels.com/photos/6077326/pexels-photo-6077326.jpeg',
      age: 70,
      gender: 'M',
      status: 'Active',
      education: 'Graduate',
      profession: 'Politician',
      electionsContested: 8,
      victories: 6,
      politicalDebut: 1989,
      lastElectionYear: 2021,
      currentConstituency: { en: 'Kolathur', ta: 'கோலத்தூர்' },
      biography: {
        en: 'Chief Minister of Tamil Nadu and President of DMK party.',
        ta: 'தமிழ்நாடு முதலமைச்சர் மற்றும் திமுக கட்சியின் தலைவர்.'
      }
    },
    {
      id: 2,
      name: { en: 'Edappadi K. Palaniswami', ta: 'எடப்பாடி கே. பழனிசாமி' },
      party: 'AIADMK',
      partySymbol: 'https://images.pexels.com/photos/8828787/pexels-photo-8828787.jpeg',
      photo: 'https://images.pexels.com/photos/6077327/pexels-photo-6077327.jpeg',
      age: 69,
      gender: 'M',
      status: 'Active',
      education: 'Graduate',
      profession: 'Politician',
      electionsContested: 6,
      victories: 5,
      politicalDebut: 1989,
      lastElectionYear: 2021,
      currentConstituency: { en: 'Edappadi', ta: 'எடப்பாடி' },
      biography: {
        en: 'Former Chief Minister of Tamil Nadu and Leader of Opposition.',
        ta: 'தமிழ்நாட்டின் முன்னாள் முதலமைச்சர் மற்றும் எதிர்க்கட்சித் தலைவர்.'
      }
    },
    {
      id: 3,
      name: { en: 'Kanimozhi Karunanidhi', ta: 'கனிமொழி கருணாநிதி' },
      party: 'DMK',
      partySymbol: 'https://images.pexels.com/photos/8828786/pexels-photo-8828786.jpeg',
      photo: 'https://images.pexels.com/photos/7876050/pexels-photo-7876050.jpeg',
      age: 55,
      gender: 'F',
      status: 'Active',
      education: 'Post Graduate',
      profession: 'Politician, Writer',
      electionsContested: 4,
      victories: 3,
      politicalDebut: 2007,
      lastElectionYear: 2021,
      currentConstituency: { en: 'Thoothukudi', ta: 'தூத்துக்குடி' },
      biography: {
        en: 'Member of Parliament and prominent DMK leader.',
        ta: 'நாடாளுமன்ற உறுப்பினர் மற்றும் முக்கிய திமுக தலைவர்.'
      }
    },
    {
      id: 4,
      name: { en: 'Anbumani Ramadoss', ta: 'அன்புமணி ராமதாஸ்' },
      party: 'PMK',
      partySymbol: 'https://images.pexels.com/photos/8828788/pexels-photo-8828788.jpeg',
      photo: 'https://images.pexels.com/photos/6077328/pexels-photo-6077328.jpeg',
      age: 54,
      gender: 'M',
      status: 'Active',
      education: 'Professional',
      profession: 'Doctor, Politician',
      electionsContested: 5,
      victories: 4,
      politicalDebut: 2004,
      lastElectionYear: 2021,
      currentConstituency: { en: 'Dharmapuri', ta: 'தர்மபுரி' },
      biography: {
        en: 'Former Union Health Minister and PMK President.',
        ta: 'முன்னாள் மத்திய சுகாதார அமைச்சர் மற்றும் பாமக தலைவர்.'
      }
    },
    {
      id: 5,
      name: { en: 'Vaiko', ta: 'வைகோ' },
      party: 'MDMK',
      partySymbol: 'https://images.pexels.com/photos/8828789/pexels-photo-8828789.jpeg',
      photo: 'https://images.pexels.com/photos/6077329/pexels-photo-6077329.jpeg',
      age: 73,
      gender: 'M',
      status: 'Active',
      education: 'Graduate',
      profession: 'Politician',
      electionsContested: 7,
      victories: 3,
      politicalDebut: 1994,
      lastElectionYear: 2021,
      currentConstituency: { en: 'Radhapuram', ta: 'ராதாபுரம்' },
      biography: {
        en: 'Founder and General Secretary of MDMK party.',
        ta: 'மதிமுக கட்சியின் நிறுவனர் மற்றும் பொதுச் செயலாளர்.'
      }
    },
    {
      id: 6,
      name: { en: 'Thol. Thirumavalavan', ta: 'தொல். திருமாவளவன்' },
      party: 'VCK',
      partySymbol: 'https://images.pexels.com/photos/8828790/pexels-photo-8828790.jpeg',
      photo: 'https://images.pexels.com/photos/6077330/pexels-photo-6077330.jpeg',
      age: 60,
      gender: 'M',
      status: 'Active',
      education: 'Graduate',
      profession: 'Politician, Social Activist',
      electionsContested: 6,
      victories: 4,
      politicalDebut: 1999,
      lastElectionYear: 2021,
      currentConstituency: { en: 'Chidambaram', ta: 'சிதம்பரம்' },
      biography: {
        en: 'President of VCK and Member of Parliament.',
        ta: 'விசிக தலைவர் மற்றும் நாடாளுமன்ற உறுப்பினர்.'
      }
    },
    {
      id: 7,
      name: { en: 'Tamilisai Soundararajan', ta: 'தமிழிசை சௌந்தரராஜன்' },
      party: 'BJP',
      partySymbol: 'https://images.pexels.com/photos/8828791/pexels-photo-8828791.jpeg',
      photo: 'https://images.pexels.com/photos/7876051/pexels-photo-7876051.jpeg',
      age: 62,
      gender: 'F',
      status: 'Active',
      education: 'Professional',
      profession: 'Doctor, Politician',
      electionsContested: 3,
      victories: 1,
      politicalDebut: 2014,
      lastElectionYear: 2021,
      currentConstituency: { en: 'Chennai South', ta: 'சென்னை தெற்கு' },
      biography: {
        en: 'Former Governor of Telangana and BJP Tamil Nadu President.',
        ta: 'தெலங்கானா முன்னாள் ஆளுநர் மற்றும் பாஜக தமிழ்நாடு தலைவர்.'
      }
    },
    {
      id: 8,
      name: { en: 'Seeman', ta: 'சீமான்' },
      party: 'NTK',
      partySymbol: 'https://images.pexels.com/photos/8828792/pexels-photo-8828792.jpeg',
      photo: 'https://images.pexels.com/photos/6077331/pexels-photo-6077331.jpeg',
      age: 57,
      gender: 'M',
      status: 'Active',
      education: 'Graduate',
      profession: 'Film Director, Politician',
      electionsContested: 2,
      victories: 0,
      politicalDebut: 2009,
      lastElectionYear: 2021,
      currentConstituency: { en: 'Chennai Central', ta: 'சென்னை மத்திய' },
      biography: {
        en: 'Chief Coordinator of Naam Tamilar Katchi and former film director.',
        ta: 'நாம் தமிழர் கட்சியின் தலைமை ஒருங்கிணைப்பாளர் மற்றும் முன்னாள் திரைப்பட இயக்குனர்.'
      }
    }
  ];

  // Filter and sort candidates
  const filteredAndSortedCandidates = useMemo(() => {
    let filtered = mockCandidates?.filter(candidate => {
      const matchesSearch = !filters?.search || 
        candidate?.name?.en?.toLowerCase()?.includes(filters?.search?.toLowerCase()) ||
        candidate?.name?.ta?.includes(filters?.search) ||
        candidate?.party?.toLowerCase()?.includes(filters?.search?.toLowerCase()) ||
        candidate?.currentConstituency?.en?.toLowerCase()?.includes(filters?.search?.toLowerCase()) ||
        candidate?.currentConstituency?.ta?.includes(filters?.search);

      const matchesParty = !filters?.party || candidate?.party === filters?.party;
      const matchesGender = !filters?.gender || candidate?.gender === filters?.gender;
      const matchesStatus = !filters?.status || candidate?.status === filters?.status;
      const matchesYear = !filters?.year || candidate?.lastElectionYear?.toString() === filters?.year;
      const matchesEducation = !filters?.education || candidate?.education === filters?.education;
      
      const matchesMinAge = !filters?.minAge || candidate?.age >= parseInt(filters?.minAge);
      const matchesMaxAge = !filters?.maxAge || candidate?.age <= parseInt(filters?.maxAge);
      const matchesMinElections = !filters?.minElections || candidate?.electionsContested >= parseInt(filters?.minElections);
      const matchesMinVictories = !filters?.minVictories || candidate?.victories >= parseInt(filters?.minVictories);

      return matchesSearch && matchesParty && matchesGender && matchesStatus && 
             matchesYear && matchesEducation && matchesMinAge && matchesMaxAge && 
             matchesMinElections && matchesMinVictories;
    });

    // Sort candidates
    filtered?.sort((a, b) => {
      let aValue, bValue;

      switch (sortBy) {
        case 'name':
          aValue = a?.name?.[language]?.toLowerCase();
          bValue = b?.name?.[language]?.toLowerCase();
          break;
        case 'party':
          aValue = a?.party?.toLowerCase();
          bValue = b?.party?.toLowerCase();
          break;
        case 'electionsContested':
          aValue = a?.electionsContested;
          bValue = b?.electionsContested;
          break;
        case 'victories':
          aValue = a?.victories;
          bValue = b?.victories;
          break;
        case 'successRate':
          aValue = a?.electionsContested > 0 ? (a?.victories / a?.electionsContested) * 100 : 0;
          bValue = b?.electionsContested > 0 ? (b?.victories / b?.electionsContested) * 100 : 0;
          break;
        case 'lastElectionYear':
          aValue = a?.lastElectionYear;
          bValue = b?.lastElectionYear;
          break;
        case 'age':
          aValue = a?.age;
          bValue = b?.age;
          break;
        default:
          aValue = a?.name?.[language]?.toLowerCase();
          bValue = b?.name?.[language]?.toLowerCase();
      }

      if (typeof aValue === 'string') {
        return sortOrder === 'asc' ? aValue?.localeCompare(bValue) : bValue?.localeCompare(aValue);
      } else {
        return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
      }
    });

    return filtered;
  }, [mockCandidates, filters, sortBy, sortOrder, language]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedCandidates?.length / itemsPerPage);
  const paginatedCandidates = filteredAndSortedCandidates?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setFilters({
      search: '',
      party: '',
      gender: '',
      status: '',
      year: '',
      education: '',
      minAge: '',
      maxAge: '',
      minElections: '',
      minVictories: ''
    });
    setCurrentPage(1);
  };

  const handleSortChange = (field, order) => {
    setSortBy(field);
    setSortOrder(order);
    setCurrentPage(1);
  };

  const handleViewProfile = (candidate) => {
    setSelectedCandidate(candidate);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCandidate(null);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-2">
            <span>{language === 'en' ? 'Home' : 'முகப்பு'}</span>
            <Icon name="ChevronRight" size={16} />
            <span className="text-foreground font-medium">
              {language === 'en' ? 'Candidate Profile Explorer' : 'வேட்பாளர் விவர ஆய்வாளர்'}
            </span>
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            {language === 'en' ? 'Candidate Profile Explorer' : 'வேட்பாளர் விவர ஆய்வாளர்'}
          </h1>
          <p className="text-muted-foreground max-w-3xl">
            {language === 'en' ?'Explore comprehensive profiles of thousands of candidates across Tamil Nadu\'s political history. Search, filter, and discover detailed information about electoral performance, biographical data, and political journey.'
              : 'தமிழ்நாட்டின் அரசியல் வரலாற்றில் ஆயிரக்கணக்கான வேட்பாளர்களின் விரிவான விவரங்களை ஆராயுங்கள். தேர்தல் செயல்திறன், வாழ்க்கை வரலாறு மற்றும் அரசியல் பயணம் பற்றிய விரிவான தகவல்களை தேடுங்கள், வடிகட்டுங்கள் மற்றும் கண்டறியுங்கள்.'
            }
          </p>
        </div>

        {/* Search and Filters */}
        <SearchFilters
          filters={filters}
          onFiltersChange={handleFiltersChange}
          onClearFilters={handleClearFilters}
          language={language}
        />

        {/* Results Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center space-x-4">
            <h2 className="text-xl font-semibold text-foreground">
              {language === 'en' ? 'Search Results' : 'தேடல் முடிவுகள்'}
            </h2>
            <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
              {filteredAndSortedCandidates?.length} {language === 'en' ? 'candidates' : 'வேட்பாளர்கள்'}
            </span>
          </div>
        </div>

        {/* Sorting and View Controls */}
        <SortingControls
          sortBy={sortBy}
          sortOrder={sortOrder}
          onSortChange={handleSortChange}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          language={language}
        />

        {/* Results */}
        {filteredAndSortedCandidates?.length === 0 ? (
          <div className="text-center py-12">
            <Icon name="Search" size={48} className="text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">
              {language === 'en' ? 'No candidates found' : 'வேட்பாளர்கள் கிடைக்கவில்லை'}
            </h3>
            <p className="text-muted-foreground mb-4">
              {language === 'en' ?'Try adjusting your search criteria or filters to find more candidates.' :'அதிக வேட்பாளர்களைக் கண்டறிய உங்கள் தேடல் அளவுகோல்கள் அல்லது வடிகட்டிகளை சரிசெய்ய முயற்சிக்கவும்.'
              }
            </p>
            <Button variant="outline" onClick={handleClearFilters}>
              {language === 'en' ? 'Clear All Filters' : 'அனைத்து வடிகட்டிகளையும் அழிக்க'}
            </Button>
          </div>
        ) : (
          <>
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                {paginatedCandidates?.map((candidate) => (
                  <CandidateCard
                    key={candidate?.id}
                    candidate={candidate}
                    onViewProfile={handleViewProfile}
                    language={language}
                  />
                ))}
              </div>
            ) : (
              <div className="mb-8">
                <CandidateListView
                  candidates={paginatedCandidates}
                  onViewProfile={handleViewProfile}
                  language={language}
                />
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  iconName="ChevronLeft"
                >
                  {language === 'en' ? 'Previous' : 'முந்தைய'}
                </Button>
                
                <div className="flex items-center space-x-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }
                    
                    return (
                      <Button
                        key={pageNum}
                        variant={currentPage === pageNum ? "default" : "outline"}
                        size="sm"
                        onClick={() => handlePageChange(pageNum)}
                        className="w-10 h-10"
                      >
                        {pageNum}
                      </Button>
                    );
                  })}
                </div>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  iconName="ChevronRight"
                  iconPosition="right"
                >
                  {language === 'en' ? 'Next' : 'அடுத்த'}
                </Button>
              </div>
            )}
          </>
        )}
      </main>
      {/* Candidate Modal */}
      <CandidateModal
        candidate={selectedCandidate}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        language={language}
      />
    </div>
  );
};

export default CandidateProfileExplorer;