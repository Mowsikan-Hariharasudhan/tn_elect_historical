import React from 'react';
import Icon from '../../../components/AppIcon';

const MapLegend = ({ language, isVisible, onToggle, highContrast, onHighContrastToggle }) => {
  const partyColors = [
    { party: language === 'en' ? 'AIADMK' : 'அதிமுக', color: '#228B22', seats: 66 },
    { party: language === 'en' ? 'DMK' : 'திமுக', color: '#FF0000', seats: 133 },
    { party: language === 'en' ? 'BJP' : 'பாஜக', color: '#FF9933', seats: 4 },
    { party: language === 'en' ? 'Congress' : 'காங்கிரஸ்', color: '#19AAED', seats: 18 },
    { party: language === 'en' ? 'Others' : 'மற்றவை', color: '#808080', seats: 13 }
  ];

  if (!isVisible) {
    return (
      <button
        onClick={onToggle}
        className="fixed bottom-4 right-4 z-40 bg-card border border-border rounded-lg p-3 shadow-lg hover:shadow-xl transition-shadow duration-200"
        aria-label={language === 'en' ? 'Show legend' : 'குறிப்பு காட்டு'}
      >
        <Icon name="Info" size={20} className="text-muted-foreground" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-40 bg-card border border-border rounded-lg shadow-lg max-w-xs">
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h3 className="font-semibold text-foreground">
          {language === 'en' ? 'Map Legend' : 'வரைபட குறிப்பு'}
        </h3>
        <button
          onClick={onToggle}
          className="text-muted-foreground hover:text-foreground transition-colors"
          aria-label={language === 'en' ? 'Close legend' : 'குறிப்பு மூடு'}
        >
          <Icon name="X" size={16} />
        </button>
      </div>
      <div className="p-4 space-y-3">
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-foreground">
            {language === 'en' ? 'Party Colors' : 'கட்சி நிறங்கள்'}
          </h4>
          {partyColors?.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div 
                  className="w-4 h-4 rounded border border-border"
                  style={{ backgroundColor: item?.color }}
                />
                <span className="text-sm text-foreground">{item?.party}</span>
              </div>
              <span className="text-xs text-muted-foreground">{item?.seats}</span>
            </div>
          ))}
        </div>
        
        <div className="pt-3 border-t border-border">
          <button
            onClick={onHighContrastToggle}
            className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <Icon name={highContrast ? "Eye" : "EyeOff"} size={16} />
            <span>
              {language === 'en' ? (highContrast ?'Normal View' : 'High Contrast') 
                : (highContrast ? 'சாதாரண பார்வை' : 'அதிக வேறுபாடு')
              }
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MapLegend;