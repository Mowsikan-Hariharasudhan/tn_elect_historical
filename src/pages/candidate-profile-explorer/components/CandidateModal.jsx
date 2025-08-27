import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const CandidateModal = ({ candidate, isOpen, onClose, language }) => {
  const [activeTab, setActiveTab] = useState('overview');

  if (!isOpen || !candidate) return null;

  const tabs = [
    { id: 'overview', label: language === 'en' ? 'Overview' : 'கண்ணோட்டம்', icon: 'User' },
    { id: 'electoral', label: language === 'en' ? 'Electoral History' : 'தேர்தல் வரலாறு', icon: 'BarChart3' },
    { id: 'performance', label: language === 'en' ? 'Performance' : 'செயல்திறன்', icon: 'TrendingUp' },
    { id: 'gallery', label: language === 'en' ? 'Gallery' : 'படத்தொகுப்பு', icon: 'Image' }
  ];

  const electoralHistory = [
    { year: '2021', constituency: 'Chennai Central', party: 'DMK', result: 'Won', votes: 89456, margin: 12345 },
    { year: '2016', constituency: 'Chennai Central', party: 'DMK', result: 'Won', votes: 76543, margin: 8901 },
    { year: '2011', constituency: 'Chennai Central', party: 'DMK', result: 'Lost', votes: 65432, margin: -3456 },
    { year: '2006', constituency: 'Chennai South', party: 'DMK', result: 'Won', votes: 54321, margin: 5678 }
  ];

  const performanceData = [
    { year: '2006', voteShare: 45.2, turnout: 68.5 },
    { year: '2011', voteShare: 42.8, turnout: 71.2 },
    { year: '2016', voteShare: 48.6, turnout: 74.8 },
    { year: '2021', voteShare: 52.3, turnout: 76.4 }
  ];

  const galleryImages = [
    { id: 1, src: 'https://images.pexels.com/photos/6077326/pexels-photo-6077326.jpeg', caption: 'Campaign Rally 2021' },
    { id: 2, src: 'https://images.pexels.com/photos/8828786/pexels-photo-8828786.jpeg', caption: 'Community Meeting' },
    { id: 3, src: 'https://images.pexels.com/photos/8828787/pexels-photo-8828787.jpeg', caption: 'Constituency Visit' },
    { id: 4, src: 'https://images.pexels.com/photos/6077327/pexels-photo-6077327.jpeg', caption: 'Public Address' }
  ];

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${candidate?.name?.[language]} - Profile`,
        text: `Check out the electoral profile of ${candidate?.name?.[language]}`,
        url: window.location?.href
      });
    } else {
      navigator.clipboard?.writeText(window.location?.href);
      alert(language === 'en' ? 'Link copied to clipboard!' : 'இணைப்பு நகலெடுக்கப்பட்டது!');
    }
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Personal Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground mb-3">
            {language === 'en' ? 'Personal Information' : 'தனிப்பட்ட தகவல்'}
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">{language === 'en' ? 'Full Name' : 'முழு பெயர்'}:</span>
              <span className="font-medium">{candidate?.name?.[language]}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">{language === 'en' ? 'Age' : 'வயது'}:</span>
              <span className="font-medium">{candidate?.age} {language === 'en' ? 'years' : 'வயது'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">{language === 'en' ? 'Gender' : 'பாலினம்'}:</span>
              <span className="font-medium">
                {candidate?.gender === 'M' ? (language === 'en' ? 'Male' : 'ஆண்') : (language === 'en' ? 'Female' : 'பெண்')}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">{language === 'en' ? 'Education' : 'கல்வி'}:</span>
              <span className="font-medium">{candidate?.education}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">{language === 'en' ? 'Profession' : 'தொழில்'}:</span>
              <span className="font-medium">{candidate?.profession}</span>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground mb-3">
            {language === 'en' ? 'Political Information' : 'அரசியல் தகவல்'}
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">{language === 'en' ? 'Current Party' : 'தற்போதைய கட்சி'}:</span>
              <span className="font-medium">{candidate?.party}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">{language === 'en' ? 'Political Debut' : 'அரசியல் அறிமுகம்'}:</span>
              <span className="font-medium">{candidate?.politicalDebut}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">{language === 'en' ? 'Status' : 'நிலை'}:</span>
              <span className="font-medium">{candidate?.status}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">{language === 'en' ? 'Current Constituency' : 'தற்போதைய தொகுதி'}:</span>
              <span className="font-medium">{candidate?.currentConstituency?.[language]}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Biography */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-3">
          {language === 'en' ? 'Biography' : 'வாழ்க்கை வரலாறு'}
        </h3>
        <p className="text-muted-foreground leading-relaxed">
          {candidate?.biography?.[language] || (language === 'en' 
            ? `${candidate?.name?.en} is a prominent political figure in Tamil Nadu with over ${candidate?.electionsContested} elections contested. Known for their dedication to public service and constituency development, they have been a strong advocate for social justice and economic development in their region.`
            : `${candidate?.name?.ta} தமிழ்நாட்டின் முக்கிய அரசியல் தலைவர் ஆவார். ${candidate?.electionsContested} தேர்தல்களில் போட்டியிட்டுள்ளார். பொது சேவை மற்றும் தொகுதி வளர்ச்சிக்காக அர்ப்பணிப்புடன் பணியாற்றி வருகிறார்.`
          )}
        </p>
      </div>
    </div>
  );

  const renderElectoralHistory = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-foreground">
        {language === 'en' ? 'Electoral History' : 'தேர்தல் வரலாறு'}
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">
                {language === 'en' ? 'Year' : 'ஆண்டு'}
              </th>
              <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">
                {language === 'en' ? 'Constituency' : 'தொகுதி'}
              </th>
              <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">
                {language === 'en' ? 'Party' : 'கட்சி'}
              </th>
              <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">
                {language === 'en' ? 'Result' : 'முடிவு'}
              </th>
              <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">
                {language === 'en' ? 'Votes' : 'வாக்குகள்'}
              </th>
              <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">
                {language === 'en' ? 'Margin' : 'வித்தியாசம்'}
              </th>
            </tr>
          </thead>
          <tbody>
            {electoralHistory?.map((election, index) => (
              <tr key={index} className="border-b border-border/50">
                <td className="py-3 px-2 font-medium">{election?.year}</td>
                <td className="py-3 px-2">{election?.constituency}</td>
                <td className="py-3 px-2">{election?.party}</td>
                <td className="py-3 px-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    election?.result === 'Won' ?'bg-success/10 text-success' :'bg-error/10 text-error'
                  }`}>
                    {election?.result === 'Won' 
                      ? (language === 'en' ? 'Won' : 'வெற்றி') 
                      : (language === 'en' ? 'Lost' : 'தோல்வி')
                    }
                  </span>
                </td>
                <td className="py-3 px-2">{election?.votes?.toLocaleString()}</td>
                <td className="py-3 px-2">
                  <span className={election?.margin > 0 ? 'text-success' : 'text-error'}>
                    {election?.margin > 0 ? '+' : ''}{election?.margin?.toLocaleString()}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderPerformance = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-foreground">
        {language === 'en' ? 'Performance Analytics' : 'செயல்திறன் பகுப்பாய்வு'}
      </h3>
      
      {/* Vote Share Trend */}
      <div className="bg-muted/30 p-4 rounded-lg">
        <h4 className="text-md font-medium text-foreground mb-4">
          {language === 'en' ? 'Vote Share Trend' : 'வாக்கு பங்கு போக்கு'}
        </h4>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="voteShare" stroke="var(--color-primary)" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center p-4 bg-primary/5 rounded-lg">
          <div className="text-2xl font-bold text-primary">{candidate?.victories}</div>
          <div className="text-sm text-muted-foreground">
            {language === 'en' ? 'Total Wins' : 'மொத்த வெற்றிகள்'}
          </div>
        </div>
        <div className="text-center p-4 bg-success/5 rounded-lg">
          <div className="text-2xl font-bold text-success">
            {Math.round((candidate?.victories / candidate?.electionsContested) * 100)}%
          </div>
          <div className="text-sm text-muted-foreground">
            {language === 'en' ? 'Success Rate' : 'வெற்றி விகிதம்'}
          </div>
        </div>
        <div className="text-center p-4 bg-accent/5 rounded-lg">
          <div className="text-2xl font-bold text-accent">{candidate?.electionsContested}</div>
          <div className="text-sm text-muted-foreground">
            {language === 'en' ? 'Elections' : 'தேர்தல்கள்'}
          </div>
        </div>
        <div className="text-center p-4 bg-secondary/5 rounded-lg">
          <div className="text-2xl font-bold text-secondary">
            {candidate?.lastElectionYear - candidate?.politicalDebut}
          </div>
          <div className="text-sm text-muted-foreground">
            {language === 'en' ? 'Years Active' : 'செயல்பட்ட ஆண்டுகள்'}
          </div>
        </div>
      </div>
    </div>
  );

  const renderGallery = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-foreground">
        {language === 'en' ? 'Photo Gallery' : 'படத்தொகுப்பு'}
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {galleryImages?.map((image) => (
          <div key={image?.id} className="group relative overflow-hidden rounded-lg bg-muted">
            <div className="aspect-video">
              <Image
                src={image?.src}
                alt={image?.caption}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
            <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent">
              <p className="text-white text-sm font-medium">{image?.caption}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full overflow-hidden bg-muted">
              <Image
                src={candidate?.photo}
                alt={candidate?.name?.en}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground">
                {candidate?.name?.[language]}
              </h2>
              <p className="text-sm text-muted-foreground">{candidate?.party}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" onClick={handleShare} iconName="Share">
              {language === 'en' ? 'Share' : 'பகிர்'}
            </Button>
            <Button variant="ghost" size="sm" onClick={onClose} iconName="X" />
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-border overflow-x-auto">
          {tabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors ${
                activeTab === tab?.id
                  ? 'text-primary border-b-2 border-primary bg-primary/5' :'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon name={tab?.icon} size={16} />
              <span>{tab?.label}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          {activeTab === 'overview' && renderOverview()}
          {activeTab === 'electoral' && renderElectoralHistory()}
          {activeTab === 'performance' && renderPerformance()}
          {activeTab === 'gallery' && renderGallery()}
        </div>
      </div>
    </div>
  );
};

export default CandidateModal;