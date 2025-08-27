import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CandidateCard = ({ candidate, onViewProfile, language }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'text-success bg-success/10';
      case 'Retired': return 'text-muted-foreground bg-muted';
      case 'Deceased': return 'text-error bg-error/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const getSuccessRate = () => {
    if (candidate?.electionsContested === 0) return 0;
    return Math.round((candidate?.victories / candidate?.electionsContested) * 100);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 hover:shadow-lg transition-all duration-300 hover:border-primary/20">
      {/* Header with Photo and Basic Info */}
      <div className="flex items-start space-x-4 mb-4">
        <div className="relative">
          <div className="w-16 h-16 rounded-full overflow-hidden bg-muted">
            <Image
              src={candidate?.photo}
              alt={candidate?.name?.en}
              className="w-full h-full object-cover"
            />
          </div>
          {candidate?.partySymbol && (
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-card border border-border rounded-full p-1">
              <Image
                src={candidate?.partySymbol}
                alt={candidate?.party}
                className="w-full h-full object-contain"
              />
            </div>
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground text-lg leading-tight mb-1">
            {candidate?.name?.[language]}
          </h3>
          <p className="text-sm text-muted-foreground mb-1">
            {candidate?.party}
          </p>
          <div className="flex items-center space-x-2">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(candidate?.status)}`}>
              {candidate?.status}
            </span>
            {candidate?.gender && (
              <span className="text-xs text-muted-foreground">
                {candidate?.gender === 'M' ? (language === 'en' ? 'Male' : 'ஆண்') : (language === 'en' ? 'Female' : 'பெண்')}
              </span>
            )}
          </div>
        </div>
      </div>
      {/* Key Statistics */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="text-center p-2 bg-muted/50 rounded-md">
          <div className="text-lg font-semibold text-foreground">{candidate?.electionsContested}</div>
          <div className="text-xs text-muted-foreground">
            {language === 'en' ? 'Contested' : 'போட்டியிட்டது'}
          </div>
        </div>
        <div className="text-center p-2 bg-muted/50 rounded-md">
          <div className="text-lg font-semibold text-success">{candidate?.victories}</div>
          <div className="text-xs text-muted-foreground">
            {language === 'en' ? 'Won' : 'வெற்றி'}
          </div>
        </div>
      </div>
      {/* Success Rate Bar */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-1">
          <span className="text-xs text-muted-foreground">
            {language === 'en' ? 'Success Rate' : 'வெற்றி விகிதம்'}
          </span>
          <span className="text-xs font-medium text-foreground">{getSuccessRate()}%</span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className="bg-success h-2 rounded-full transition-all duration-300"
            style={{ width: `${getSuccessRate()}%` }}
          />
        </div>
      </div>
      {/* Current/Last Constituency */}
      {candidate?.currentConstituency && (
        <div className="flex items-center space-x-2 mb-4 p-2 bg-primary/5 rounded-md">
          <Icon name="MapPin" size={16} className="text-primary" />
          <div>
            <div className="text-sm font-medium text-foreground">
              {candidate?.currentConstituency?.[language]}
            </div>
            <div className="text-xs text-muted-foreground">
              {candidate?.lastElectionYear} - {language === 'en' ? 'Current Constituency' : 'தற்போதைய தொகுதி'}
            </div>
          </div>
        </div>
      )}
      {/* Action Button */}
      <Button
        variant="outline"
        fullWidth
        onClick={() => onViewProfile(candidate)}
        iconName="Eye"
        iconPosition="left"
        className="text-sm"
      >
        {language === 'en' ? 'View Profile' : 'விவரங்கள் பார்க்க'}
      </Button>
    </div>
  );
};

export default CandidateCard;