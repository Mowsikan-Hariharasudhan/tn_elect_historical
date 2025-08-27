import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ResultCard = ({ result, language, onViewDetails }) => {
  const candidateName = language === 'en' ? result?.candidate?.name_en : result?.candidate?.name_ta;
  const constituencyName = language === 'en' ? result?.constituency?.name_en : result?.constituency?.name_ta;
  const partyName = result?.party?.short_name;
  
  const formatNumber = (num) => {
    return new Intl.NumberFormat(language === 'en' ? 'en-IN' : 'ta-IN')?.format(num || 0);
  };

  const getWinnerBadge = () => {
    if (result?.is_winner) {
      return (
        <div className="absolute top-4 right-4 bg-success text-white px-2 py-1 rounded-md text-xs font-medium">
          <Icon name="Crown" size={12} className="inline mr-1" />
          {language === 'en' ? 'Winner' : 'வெற்றி'}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-200">
      {getWinnerBadge()}
      <div className="p-6">
        {/* Candidate Info */}
        <div className="flex items-start space-x-4 mb-4">
          {result?.candidate?.photo_url ? (
            <img 
              src={result?.candidate?.photo_url} 
              alt={candidateName}
              className="w-16 h-16 rounded-full object-cover bg-muted"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
          ) : null}
          <div 
            className="w-16 h-16 rounded-full bg-muted flex items-center justify-center text-muted-foreground"
            style={{ display: result?.candidate?.photo_url ? 'none' : 'flex' }}
          >
            <Icon name="User" size={24} />
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-foreground truncate">
              {candidateName}
            </h3>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <span className="font-medium text-primary">{partyName}</span>
              <span>•</span>
              <span>{constituencyName}</span>
            </div>
          </div>
        </div>

        {/* Vote Statistics */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="text-center p-3 bg-muted/30 rounded-lg">
            <p className="text-2xl font-bold text-foreground">
              {formatNumber(result?.votes_received)}
            </p>
            <p className="text-xs text-muted-foreground">
              {language === 'en' ? 'Votes' : 'வாக்குகள்'}
            </p>
          </div>
          <div className="text-center p-3 bg-muted/30 rounded-lg">
            <p className="text-2xl font-bold text-foreground">
              {result?.vote_percentage?.toFixed(1)}%
            </p>
            <p className="text-xs text-muted-foreground">
              {language === 'en' ? 'Vote Share' : 'வாக்கு பங்கு'}
            </p>
          </div>
        </div>

        {/* Additional Stats */}
        <div className="flex justify-between items-center text-sm text-muted-foreground mb-4">
          <div className="flex items-center space-x-1">
            <Icon name="Target" size={14} />
            <span>{language === 'en' ? 'Margin:' : 'வித்தியாசம்:'}</span>
            <span className="font-medium">
              {result?.margin_votes ? formatNumber(result?.margin_votes) : 'N/A'}
            </span>
          </div>
          
          <div className="flex items-center space-x-1">
            <Icon name="Users" size={14} />
            <span>{language === 'en' ? 'Turnout:' : 'வாக்களிப்பு:'}</span>
            <span className="font-medium">
              {result?.voter_turnout_percentage?.toFixed(1) || 'N/A'}%
            </span>
          </div>
        </div>

        {/* Action Button */}
        <Button 
          onClick={() => onViewDetails?.(result)}
          variant="outline" 
          className="w-full"
          size="sm"
        >
          <Icon name="Eye" size={16} className="mr-2" />
          {language === 'en' ? 'View Details' : 'விவரங்களைப் பார்க்க'}
        </Button>
      </div>
      {/* Election Info Footer */}
      <div className="px-6 py-3 bg-muted/20 border-t border-border">
        <div className="flex justify-between items-center text-xs text-muted-foreground">
          <span>{result?.election?.name_en || result?.election?.name_ta}</span>
          <span>
            {language === 'en' ? 'Result Date:' : 'முடிவு தேதி:'} {' '}
            {result?.election?.result_date ? new Date(result.election.result_date)?.toLocaleDateString(language === 'en' ? 'en-IN' : 'ta-IN') : 'N/A'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ResultCard;