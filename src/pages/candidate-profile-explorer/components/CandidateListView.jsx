import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import BookmarkSystem from './BookmarkSystem';

const CandidateListView = ({ candidates, onViewProfile, language }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'text-success bg-success/10';
      case 'Retired': return 'text-muted-foreground bg-muted';
      case 'Deceased': return 'text-error bg-error/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const getSuccessRate = (candidate) => {
    if (candidate?.electionsContested === 0) return 0;
    return Math.round((candidate?.victories / candidate?.electionsContested) * 100);
  };

  return (
    <div className="space-y-4">
      {candidates?.map((candidate) => (
        <div
          key={candidate?.id}
          className="bg-card border border-border rounded-lg p-4 hover:shadow-md transition-all duration-300 hover:border-primary/20"
        >
          <div className="flex items-center space-x-4">
            {/* Photo and Party Symbol */}
            <div className="relative flex-shrink-0">
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

            {/* Main Info */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                <div className="min-w-0">
                  <h3 className="font-semibold text-foreground text-lg leading-tight">
                    {candidate?.name?.[language]}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-1">
                    {candidate?.party}
                  </p>
                  <div className="flex items-center space-x-2 mb-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(candidate?.status)}`}>
                      {candidate?.status}
                    </span>
                    {candidate?.gender && (
                      <span className="text-xs text-muted-foreground">
                        {candidate?.gender === 'M' ? (language === 'en' ? 'Male' : 'ஆண்') : (language === 'en' ? 'Female' : 'பெண்')}
                      </span>
                    )}
                    <span className="text-xs text-muted-foreground">
                      {candidate?.age} {language === 'en' ? 'years' : 'வயது'}
                    </span>
                  </div>
                  
                  {/* Current Constituency */}
                  {candidate?.currentConstituency && (
                    <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                      <Icon name="MapPin" size={14} className="text-primary" />
                      <span>{candidate?.currentConstituency?.[language]}</span>
                      <span className="text-xs">({candidate?.lastElectionYear})</span>
                    </div>
                  )}
                </div>

                {/* Statistics */}
                <div className="flex sm:flex-col items-center sm:items-end space-x-4 sm:space-x-0 sm:space-y-2">
                  <div className="text-center">
                    <div className="text-lg font-semibold text-foreground">{candidate?.electionsContested}</div>
                    <div className="text-xs text-muted-foreground">
                      {language === 'en' ? 'Contested' : 'போட்டியிட்டது'}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold text-success">{candidate?.victories}</div>
                    <div className="text-xs text-muted-foreground">
                      {language === 'en' ? 'Won' : 'வெற்றி'}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold text-primary">{getSuccessRate(candidate)}%</div>
                    <div className="text-xs text-muted-foreground">
                      {language === 'en' ? 'Success' : 'வெற்றி விகிதம்'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between mt-4 pt-3 border-t border-border">
                <div className="flex items-center space-x-2">
                  <BookmarkSystem candidate={candidate} language={language} />
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onViewProfile(candidate)}
                  iconName="Eye"
                  iconPosition="left"
                >
                  {language === 'en' ? 'View Profile' : 'விவரங்கள் பார்க்க'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CandidateListView;