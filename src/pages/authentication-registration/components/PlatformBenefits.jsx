import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const PlatformBenefits = ({ language }) => {
  const benefits = [
    {
      icon: 'Database',
      title: language === 'en' ? 'Complete Electoral Archive' : 'முழுமையான தேர்தல் காப்பகம்',
      description: language === 'en' ?'Access 70+ years of Tamil Nadu election data from 1952 to present' :'1952 முதல் இன்று வரை 70+ ஆண்டுகள் தமிழ்நாடு தேர்தல் தரவுகளை அணுகவும்'
    },
    {
      icon: 'TrendingUp',
      title: language === 'en' ? 'Interactive Analytics' : 'ஊடாடும் பகுப்பாய்வு',
      description: language === 'en' ?'Visualize voting patterns, party performance, and demographic trends' :'வாக்களிப்பு முறைகள், கட்சி செயல்திறன் மற்றும் மக்கள்தொகை போக்குகளை காட்சிப்படுத்தவும்'
    },
    {
      icon: 'Users',
      title: language === 'en' ? 'Candidate Profiles' : 'வேட்பாளர் சுயவிவரங்கள்',
      description: language === 'en' ?'Detailed information about thousands of candidates across decades' :'பல தசாப்தங்களில் ஆயிரக்கணக்கான வேட்பாளர்களைப் பற்றிய விரிவான தகவல்கள்'
    },
    {
      icon: 'Map',
      title: language === 'en' ? 'Constituency Mapping' : 'தொகுதி வரைபடம்',
      description: language === 'en' ?'Interactive maps showing all 234 constituencies with historical boundaries' :'வரலாற்று எல்லைகளுடன் அனைத்து 234 தொகுதிகளையும் காட்டும் ஊடாடும் வரைபடங்கள்'
    },
    {
      icon: 'BookOpen',
      title: language === 'en' ? 'Bilingual Content' : 'இருமொழி உள்ளடக்கம்',
      description: language === 'en' ?'Full platform available in Tamil and English with seamless switching' :'தமிழ் மற்றும் ஆங்கிலத்தில் முழு தளமும் தடையற்ற மாறுதலுடன் கிடைக்கிறது'
    },
    {
      icon: 'Shield',
      title: language === 'en' ? 'Verified Data' : 'சரிபார்க்கப்பட்ட தரவு',
      description: language === 'en' ?'Official Election Commission data with transparency and accuracy' :'வெளிப்படைத்தன்மை மற்றும் துல்லியத்துடன் அதிகாரப்பூர்வ தேர்தல் ஆணையத் தரவு'
    }
  ];

  const historicalImages = [
    {
      src: 'https://images.unsplash.com/photo-1586611292717-f828b167408c?w=400&h=300&fit=crop',
      alt: language === 'en' ? 'Tamil Nadu Assembly Building' : 'தமிழ்நாடு சட்டமன்ற கட்டிடம்',
      caption: language === 'en' ? 'Tamil Nadu Legislative Assembly' : 'தமிழ்நாடு சட்டமன்றம்'
    },
    {
      src: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop',
      alt: language === 'en' ? 'Voting Process' : 'வாக்களிப்பு செயல்முறை',
      caption: language === 'en' ? 'Democratic Process in Action' : 'செயலில் ஜனநாயக செயல்முறை'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
          <Icon name="Vote" size={32} color="var(--color-primary)" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-foreground">
            {language === 'en' ? 'TN Elect Historical' : 'TN Elect வரலாற்று'}
          </h2>
          <p className="text-muted-foreground">
            {language === 'en' ?'Your gateway to Tamil Nadu\'s electoral heritage' :'தமிழ்நாட்டின் தேர்தல் பாரம்பரியத்திற்கான உங்கள் நுழைவாயில்'
            }
          </p>
        </div>
      </div>
      {/* Historical Images */}
      <div className="grid grid-cols-1 gap-4">
        {historicalImages?.map((image, index) => (
          <div key={index} className="relative overflow-hidden rounded-lg">
            <Image
              src={image?.src}
              alt={image?.alt}
              className="w-full h-48 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-4 left-4 right-4">
              <p className="text-white text-sm font-medium">{image?.caption}</p>
            </div>
          </div>
        ))}
      </div>
      {/* Benefits List */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-foreground">
          {language === 'en' ? 'Platform Features' : 'தளத்தின் அம்சங்கள்'}
        </h3>
        
        <div className="space-y-4">
          {benefits?.map((benefit, index) => (
            <div key={index} className="flex space-x-4">
              <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon name={benefit?.icon} size={20} color="var(--color-accent)" />
              </div>
              <div className="space-y-1">
                <h4 className="font-medium text-foreground">{benefit?.title}</h4>
                <p className="text-sm text-muted-foreground">{benefit?.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Statistics */}
      <div className="bg-muted/30 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          {language === 'en' ? 'By the Numbers' : 'எண்களில்'}
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">70+</div>
            <div className="text-sm text-muted-foreground">
              {language === 'en' ? 'Years of Data' : 'ஆண்டுகள் தரவு'}
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">234</div>
            <div className="text-sm text-muted-foreground">
              {language === 'en' ? 'Constituencies' : 'தொகுதிகள்'}
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">15+</div>
            <div className="text-sm text-muted-foreground">
              {language === 'en' ? 'Elections' : 'தேர்தல்கள்'}
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">1000+</div>
            <div className="text-sm text-muted-foreground">
              {language === 'en' ? 'Candidates' : 'வேட்பாளர்கள்'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlatformBenefits;