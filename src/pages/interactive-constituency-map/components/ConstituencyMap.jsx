import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const ConstituencyMap = ({ 
  language, 
  filters, 
  onConstituencyHover, 
  onConstituencyClick, 
  selectedConstituency,
  highContrast 
}) => {
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const mapRef = useRef(null);

  // Mock constituency data with SVG paths (simplified for demo)
  const constituencies = [
    {
      id: 1,
      name: language === 'en' ? 'Chennai Central' : 'சென்னை மத்திய',
      district: language === 'en' ? 'Chennai' : 'சென்னை',
      path: "M100,50 L150,50 L150,100 L100,100 Z",
      party: 'DMK',
      currentMLA: {
        name: language === 'en' ? 'Dayanidhi Maran' : 'தயானிதி மாறன்',
        party: 'DMK',
        photo: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg'
      },
      lastElection: { year: 2021, margin: 15234, turnout: 68.5 },
      totalVoters: 245678,
      validVotes: 168214
    },
    {
      id: 2,
      name: language === 'en' ? 'Coimbatore North' : 'கோயம்புத்தூர் வடக்கு',
      district: language === 'en' ? 'Coimbatore' : 'கோயம்புத்தூர்',
      path: "M200,80 L250,80 L250,130 L200,130 Z",
      party: 'AIADMK',
      currentMLA: {
        name: language === 'en' ? 'Amrita Arora' : 'அம்ரிதா அரோரா',
        party: 'AIADMK',
        photo: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg'
      },
      lastElection: { year: 2021, margin: 8956, turnout: 72.3 },
      totalVoters: 198765,
      validVotes: 143678
    },
    {
      id: 3,
      name: language === 'en' ? 'Madurai East' : 'மதுரை கிழக்கு',
      district: language === 'en' ? 'Madurai' : 'மதுரை',
      path: "M300,120 L350,120 L350,170 L300,170 Z",
      party: 'Congress',
      currentMLA: {
        name: language === 'en' ? 'Priya Sharma' : 'பிரியா சர்மா',
        party: 'Congress',
        photo: 'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg'
      },
      lastElection: { year: 2021, margin: 12456, turnout: 75.8 },
      totalVoters: 187432,
      validVotes: 142087
    },
    {
      id: 4,
      name: language === 'en' ? 'Salem West' : 'சேலம் மேற்கு',
      district: language === 'en' ? 'Salem' : 'சேலம்',
      path: "M180,200 L230,200 L230,250 L180,250 Z",
      party: 'BJP',
      currentMLA: {
        name: language === 'en' ? 'Rajesh Kumar' : 'ராஜேஷ் குமார்',
        party: 'BJP',
        photo: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg'
      },
      lastElection: { year: 2021, margin: 5678, turnout: 69.2 },
      totalVoters: 156789,
      validVotes: 108562
    },
    {
      id: 5,
      name: language === 'en' ? 'Trichy Central' : 'திருச்சி மத்திய',
      district: language === 'en' ? 'Tiruchirappalli' : 'திருச்சிராப்பள்ளி',
      path: "M120,280 L170,280 L170,330 L120,330 Z",
      party: 'DMK',
      currentMLA: {
        name: language === 'en' ? 'Kavitha Devi' : 'கவிதா தேவி',
        party: 'DMK',
        photo: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg'
      },
      lastElection: { year: 2021, margin: 18923, turnout: 71.4 },
      totalVoters: 203456,
      validVotes: 145287
    }
  ];

  const partyColors = {
    'DMK': highContrast ? '#FF0000' : '#FF0000',
    'AIADMK': highContrast ? '#228B22' : '#228B22',
    'BJP': highContrast ? '#FF9933' : '#FF9933',
    'Congress': highContrast ? '#19AAED' : '#19AAED',
    'Others': highContrast ? '#000000' : '#808080'
  };

  // Filter constituencies based on active filters
  const filteredConstituencies = constituencies.filter(constituency => {
    if (filters.party !== 'all' && constituency.party.toLowerCase() !== filters.party) return false;
    if (filters.year !== 'all' && constituency.lastElection.year.toString() !== filters.year) return false;
    if (filters.gender !== 'all') {
      // Mock gender filtering logic
      const isFemale = constituency.currentMLA.name.includes('Priya') || 
                      constituency.currentMLA.name.includes('Kavitha') || 
                      constituency.currentMLA.name.includes('Amrita');
      if (filters.gender === 'female' && !isFemale) return false;
      if (filters.gender === 'male' && isFemale) return false;
    }
    if (constituency.lastElection.turnout < filters.turnout[0] || 
        constituency.lastElection.turnout > filters.turnout[1]) return false;
    if (constituency.lastElection.margin > filters.margin * 1000) return false;
    
    return true;
  });

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev * 1.2, 3));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev / 1.2, 0.5));
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      setPan({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, dragStart]);

  return (
    <div className="relative w-full h-full bg-muted overflow-hidden">
      {/* Map Controls */}
      <div className="absolute top-4 right-4 z-20 flex flex-col space-y-2">
        <button
          onClick={handleZoomIn}
          className="bg-card border border-border rounded-md p-2 shadow-md hover:shadow-lg transition-shadow"
          aria-label={language === 'en' ? 'Zoom in' : 'பெரிதாக்கு'}
        >
          <Icon name="Plus" size={20} className="text-foreground" />
        </button>
        <button
          onClick={handleZoomOut}
          className="bg-card border border-border rounded-md p-2 shadow-md hover:shadow-lg transition-shadow"
          aria-label={language === 'en' ? 'Zoom out' : 'சிறிதாக்கு'}
        >
          <Icon name="Minus" size={20} className="text-foreground" />
        </button>
        <button
          onClick={() => {
            setZoom(1);
            setPan({ x: 0, y: 0 });
          }}
          className="bg-card border border-border rounded-md p-2 shadow-md hover:shadow-lg transition-shadow"
          aria-label={language === 'en' ? 'Reset view' : 'பார்வை மீட்டமை'}
        >
          <Icon name="Home" size={20} className="text-foreground" />
        </button>
      </div>

      {/* Map Container */}
      <div 
        ref={mapRef}
        className="w-full h-full cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
      >
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 500 400"
          className="w-full h-full"
          style={{
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
            transformOrigin: 'center center'
          }}
        >
          {/* Tamil Nadu Outline */}
          <path
            d="M50,50 L450,50 L450,350 L50,350 Z"
            fill="none"
            stroke={highContrast ? "#000000" : "#E5E7EB"}
            strokeWidth="2"
          />
          
          {/* Constituencies */}
          {filteredConstituencies.map((constituency) => (
            <path
              key={constituency.id}
              d={constituency.path}
              fill={partyColors[constituency.party] || partyColors['Others']}
              stroke={highContrast ? "#000000" : "#FFFFFF"}
              strokeWidth="1"
              opacity={selectedConstituency?.id === constituency.id ? 1 : 0.8}
              className="cursor-pointer transition-opacity duration-200 hover:opacity-100"
              onMouseEnter={(e) => {
                const rect = mapRef.current.getBoundingClientRect();
                onConstituencyHover(constituency, {
                  x: e.clientX - rect.left,
                  y: e.clientY - rect.top
                });
              }}
              onMouseLeave={() => onConstituencyHover(null)}
              onClick={() => onConstituencyClick(constituency)}
            />
          ))}
          
          {/* Constituency Labels (visible at higher zoom levels) */}
          {zoom > 1.5 && filteredConstituencies.map((constituency) => (
            <text
              key={`label-${constituency.id}`}
              x={constituency.id * 80 + 125}
              y={constituency.id * 60 + 75}
              textAnchor="middle"
              className="text-xs font-medium pointer-events-none"
              fill={highContrast ? "#000000" : "#374151"}
            >
              {constituency.name.length > 15 
                ? constituency.name.substring(0, 15) + '...' 
                : constituency.name
              }
            </text>
          ))}
        </svg>
      </div>

      {/* Status Bar */}
      <div className="absolute bottom-4 left-4 bg-card border border-border rounded-md px-3 py-2 shadow-md">
        <div className="flex items-center space-x-4 text-sm">
          <span className="text-muted-foreground">
            {language === 'en' ? 'Showing:' : 'காட்டுகிறது:'}
          </span>
          <span className="font-medium text-foreground">
            {filteredConstituencies.length} / {constituencies.length}
          </span>
          <span className="text-muted-foreground">
            {language === 'en' ? 'constituencies' : 'தொகுதிகள்'}
          </span>
          <span className="text-muted-foreground">|</span>
          <span className="text-muted-foreground">
            {language === 'en' ? 'Zoom:' : 'பெரிதாக்கல்:'} {Math.round(zoom * 100)}%
          </span>
        </div>
      </div>
    </div>
  );
};

export default ConstituencyMap;