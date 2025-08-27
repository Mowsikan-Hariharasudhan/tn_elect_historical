import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const GuestAccess = ({ language }) => {
  const features = [
    {
      icon: 'Eye',
      title: language === 'en' ? 'Browse Historical Data' : 'வரலாற்று தரவுகளை உலாவவும்',
      description: language === 'en' ?'View election results and candidate information' :'தேர்தல் முடிவுகள் மற்றும் வேட்பாளர் தகவல்களைப் பார்க்கவும்'
    },
    {
      icon: 'Search',
      title: language === 'en' ? 'Search & Filter' : 'தேடல் மற்றும் வடிகட்டி',
      description: language === 'en' ?'Find specific constituencies and candidates' :'குறிப்பிட்ட தொகுதிகள் மற்றும் வேட்பாளர்களைக் கண்டறியவும்'
    },
    {
      icon: 'BarChart3',
      title: language === 'en' ? 'View Analytics' : 'பகுப்பாய்வுகளைப் பார்க்கவும்',
      description: language === 'en' ?'Access basic charts and visualizations' :'அடிப்படை விளக்கப்படங்கள் மற்றும் காட்சிப்படுத்தல்களை அணுகவும்'
    }
  ];

  const limitations = [
    {
      icon: 'BookmarkX',
      text: language === 'en' ? 'Cannot save bookmarks' : 'புக்மார்க்குகளைச் சேமிக்க முடியாது'
    },
    {
      icon: 'HeartOff',
      text: language === 'en' ? 'Cannot add favorites' : 'பிடித்தவைகளைச் சேர்க்க முடியாது'
    },
    {
      icon: 'UserX',
      text: language === 'en' ? 'No personalized experience' : 'தனிப்பயனாக்கப்பட்ட அனுபவம் இல்லை'
    },
    {
      icon: 'DownloadCloud',
      text: language === 'en' ? 'Limited export options' : 'வரையறுக்கப்பட்ட ஏற்றுமதி விருப்பங்கள்'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-card text-muted-foreground">
            {language === 'en' ? 'Or explore as guest' : 'அல்லது விருந்தினராக ஆராயுங்கள்'}
          </span>
        </div>
      </div>
      <div className="bg-muted/30 rounded-lg p-6 space-y-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
            <Icon name="UserCheck" size={20} color="var(--color-accent)" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">
              {language === 'en' ? 'Guest Access Available' : 'விருந்தினர் அணுகல் கிடைக்கிறது'}
            </h3>
            <p className="text-sm text-muted-foreground">
              {language === 'en' ?'Explore Tamil Nadu electoral history without registration' :'பதிவு செய்யாமல் தமிழ்நாடு தேர்தல் வரலாற்றை ஆராயுங்கள்'
              }
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {features?.map((feature, index) => (
            <div key={index} className="text-center space-y-2">
              <div className="w-8 h-8 bg-success/10 rounded-full flex items-center justify-center mx-auto">
                <Icon name={feature?.icon} size={16} color="var(--color-success)" />
              </div>
              <div>
                <h4 className="text-sm font-medium text-foreground">{feature?.title}</h4>
                <p className="text-xs text-muted-foreground">{feature?.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-border pt-4">
          <h4 className="text-sm font-medium text-foreground mb-3">
            {language === 'en' ? 'Guest Limitations:' : 'விருந்தினர் வரம்புகள்:'}
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {limitations?.map((limitation, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Icon name={limitation?.icon} size={14} color="var(--color-warning)" />
                <span className="text-xs text-muted-foreground">{limitation?.text}</span>
              </div>
            ))}
          </div>
        </div>

        <Link to="/historical-timeline-dashboard">
          <Button
            variant="outline"
            fullWidth
            iconName="ArrowRight"
            iconPosition="right"
          >
            {language === 'en' ? 'Continue as Guest' : 'விருந்தினராக தொடரவும்'}
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default GuestAccess;