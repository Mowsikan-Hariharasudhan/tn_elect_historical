import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const InteractiveTimeline = ({ elections, onElectionClick, language }) => {
  const [selectedElection, setSelectedElection] = useState(null);
  const [hoveredElection, setHoveredElection] = useState(null);
  const timelineRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e?.pageX - timelineRef?.current?.offsetLeft);
    setScrollLeft(timelineRef?.current?.scrollLeft);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e?.preventDefault();
    const x = e?.pageX - timelineRef?.current?.offsetLeft;
    const walk = (x - startX) * 2;
    timelineRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleElectionClick = (election) => {
    setSelectedElection(election);
    onElectionClick(election);
  };

  const getPartyColor = (party) => {
    const colors = {
      'DMK': '#FF0000',
      'AIADMK': '#00FF00',
      'INC': '#19AAED',
      'BJP': '#FF9933',
      'CPI': '#FF0000',
      'CPIM': '#CC0000'
    };
    return colors?.[party] || '#64748B';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">
          {language === 'en' ? 'Electoral Timeline' : 'தேர்தல் காலவரிசை'}
        </h2>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => timelineRef?.current?.scrollBy({ left: -200, behavior: 'smooth' })}
            className="p-2 hover:bg-muted rounded-md transition-colors"
          >
            <Icon name="ChevronLeft" size={20} />
          </button>
          <button
            onClick={() => timelineRef?.current?.scrollBy({ left: 200, behavior: 'smooth' })}
            className="p-2 hover:bg-muted rounded-md transition-colors"
          >
            <Icon name="ChevronRight" size={20} />
          </button>
        </div>
      </div>
      <div className="relative">
        <div
          ref={timelineRef}
          className="flex items-center space-x-8 overflow-x-auto pb-4 cursor-grab active:cursor-grabbing"
          style={{ scrollbarWidth: 'thin' }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {/* Timeline Line */}
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-border transform -translate-y-1/2 z-0" />
          
          {elections?.map((election, index) => (
            <div
              key={election?.id}
              className="relative flex-shrink-0 z-10"
              onMouseEnter={() => setHoveredElection(election)}
              onMouseLeave={() => setHoveredElection(null)}
            >
              {/* Timeline Node */}
              <div
                className={`w-16 h-16 rounded-full border-4 cursor-pointer transition-all duration-200 flex items-center justify-center ${
                  selectedElection?.id === election?.id
                    ? 'border-primary bg-primary scale-110' :'border-card bg-card hover:border-primary hover:scale-105'
                }`}
                style={{ 
                  borderColor: selectedElection?.id === election?.id ? getPartyColor(election?.winningParty) : undefined,
                  backgroundColor: selectedElection?.id === election?.id ? getPartyColor(election?.winningParty) : undefined
                }}
                onClick={() => handleElectionClick(election)}
              >
                <Image
                  src={election?.partySymbol}
                  alt={`${election?.winningParty} symbol`}
                  className="w-8 h-8 object-contain"
                />
              </div>

              {/* Year Label */}
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-center">
                <span className="text-sm font-medium text-foreground">{election?.year}</span>
              </div>

              {/* Hover Card */}
              {hoveredElection?.id === election?.id && (
                <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 bg-popover border border-border rounded-lg p-4 shadow-lg z-20 w-64">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-foreground">{election?.year} {language === 'en' ? 'Election' : 'தேர்தல்'}</h3>
                      <div
                        className="w-6 h-6 rounded-full"
                        style={{ backgroundColor: getPartyColor(election?.winningParty) }}
                      />
                    </div>
                    <div className="space-y-1 text-sm">
                      <p className="text-muted-foreground">
                        <span className="font-medium">{language === 'en' ? 'Winner:' : 'வெற்றியாளர்:'}</span> {election?.winningParty}
                      </p>
                      <p className="text-muted-foreground">
                        <span className="font-medium">{language === 'en' ? 'CM:' : 'முதலமைச்சர்:'}</span> {election?.chiefMinister}
                      </p>
                      <p className="text-muted-foreground">
                        <span className="font-medium">{language === 'en' ? 'Turnout:' : 'வாக்குப்பதிவு:'}</span> {election?.turnout}%
                      </p>
                      <p className="text-muted-foreground">
                        <span className="font-medium">{language === 'en' ? 'Seats:' : 'இடங்கள்:'}</span> {election?.seatsWon}/{election?.totalSeats}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      {/* Legend */}
      <div className="mt-6 flex flex-wrap gap-4 text-sm">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-primary" />
          <span className="text-muted-foreground">{language === 'en' ? 'Selected' : 'தேர்ந்தெடுக்கப்பட்டது'}</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full border-2 border-border bg-card" />
          <span className="text-muted-foreground">{language === 'en' ? 'Available' : 'கிடைக்கக்கூடியது'}</span>
        </div>
      </div>
    </div>
  );
};

export default InteractiveTimeline;