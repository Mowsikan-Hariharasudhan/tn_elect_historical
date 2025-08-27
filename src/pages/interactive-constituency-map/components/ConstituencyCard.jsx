import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const ConstituencyCard = ({ constituency, language, position, onClose, onViewDetails }) => {
  if (!constituency) return null;

  const partyColors = {
    'DMK': '#FF0000',
    'AIADMK': '#228B22',
    'BJP': '#FF9933',
    'Congress': '#19AAED',
    'Others': '#808080'
  };

  return (
    <div 
      className="absolute z-30 bg-card border border-border rounded-lg shadow-xl p-4 w-80 max-w-sm"
      style={{
        left: position?.x > window.innerWidth - 320 ? position?.x - 320 : position?.x,
        top: position?.y > window.innerHeight - 300 ? position?.y - 300 : position?.y
      }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="font-semibold text-foreground text-lg leading-tight">
            {constituency?.name}
          </h3>
          <p className="text-sm text-muted-foreground">
            {constituency?.district} {language === 'en' ? 'District' : 'மாவட்டம்'}
          </p>
        </div>
        <button
          onClick={onClose}
          className="text-muted-foreground hover:text-foreground transition-colors ml-2"
        >
          <Icon name="X" size={16} />
        </button>
      </div>
      {/* Current MLA */}
      <div className="flex items-center space-x-3 mb-4 p-3 bg-muted rounded-lg">
        <Image
          src={constituency?.currentMLA?.photo}
          alt={constituency?.currentMLA?.name}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div className="flex-1">
          <p className="font-medium text-foreground">{constituency?.currentMLA?.name}</p>
          <div className="flex items-center space-x-2">
            <div 
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: partyColors?.[constituency?.currentMLA?.party] || '#808080' }}
            />
            <span className="text-sm text-muted-foreground">
              {constituency?.currentMLA?.party}
            </span>
          </div>
        </div>
      </div>
      {/* Statistics */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="text-center p-2 bg-muted rounded">
          <div className="text-lg font-semibold text-foreground">
            {constituency?.lastElection?.margin?.toLocaleString()}
          </div>
          <div className="text-xs text-muted-foreground">
            {language === 'en' ? 'Victory Margin' : 'வெற்றி வித்தியாசம்'}
          </div>
        </div>
        <div className="text-center p-2 bg-muted rounded">
          <div className="text-lg font-semibold text-foreground">
            {constituency?.lastElection?.turnout}%
          </div>
          <div className="text-xs text-muted-foreground">
            {language === 'en' ? 'Voter Turnout' : 'வாக்காளர் வருகை'}
          </div>
        </div>
      </div>
      {/* Quick Stats */}
      <div className="space-y-2 mb-4">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">
            {language === 'en' ? 'Total Voters:' : 'மொத்த வாக்காளர்கள்:'}
          </span>
          <span className="text-foreground font-medium">
            {constituency?.totalVoters?.toLocaleString()}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">
            {language === 'en' ? 'Valid Votes:' : 'செல்லுபடியான வாக்குகள்:'}
          </span>
          <span className="text-foreground font-medium">
            {constituency?.validVotes?.toLocaleString()}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">
            {language === 'en' ? 'Election Year:' : 'தேர்தல் ஆண்டு:'}
          </span>
          <span className="text-foreground font-medium">
            {constituency?.lastElection?.year}
          </span>
        </div>
      </div>
      {/* Action Button */}
      <button
        onClick={() => onViewDetails(constituency)}
        className="w-full bg-primary text-primary-foreground py-2 px-4 rounded-md hover:bg-primary/90 transition-colors text-sm font-medium flex items-center justify-center space-x-2"
      >
        <Icon name="Eye" size={16} />
        <span>
          {language === 'en' ? 'View Details' : 'விவரங்கள் பார்க்க'}
        </span>
      </button>
    </div>
  );
};

export default ConstituencyCard;