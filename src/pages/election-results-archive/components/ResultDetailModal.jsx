import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ResultDetailModal = ({ result, isOpen, onClose, language }) => {
  if (!isOpen || !result) return null;

  const getPartyColor = (party) => {
    const colors = {
      'DMK': 'bg-red-500',
      'AIADMK': 'bg-green-600',
      'BJP': 'bg-orange-500',
      'INC': 'bg-blue-600',
      'PMK': 'bg-yellow-500',
      'MDMK': 'bg-purple-600',
      'VCK': 'bg-indigo-600',
      'DMDK': 'bg-pink-600',
      'CPI': 'bg-red-700',
      'CPM': 'bg-red-800'
    };
    return colors?.[party] || 'bg-gray-500';
  };

  const formatVotes = (votes) => {
    return votes?.toLocaleString('en-IN');
  };

  const getMarginColor = (margin) => {
    if (margin < 1000) return 'text-red-600';
    if (margin < 5000) return 'text-orange-600';
    if (margin < 10000) return 'text-yellow-600';
    return 'text-green-600';
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-card border border-border rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-foreground">
            {language === 'en' ? 'Election Result Details' : 'தேர்தல் முடிவு விவரங்கள்'}
          </h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Candidate Info */}
          <div className="flex items-start space-x-4">
            <Image
              src={result?.candidatePhoto}
              alt={result?.candidateName?.[language]}
              className="w-20 h-20 rounded-lg object-cover"
            />
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-foreground mb-2">
                {result?.candidateName?.[language]}
              </h3>
              <div className="flex items-center space-x-4 mb-2">
                <div className="flex items-center space-x-2">
                  <div className={`w-4 h-4 rounded-full ${getPartyColor(result?.party)}`}></div>
                  <span className="text-lg font-medium text-foreground">{result?.party}</span>
                </div>
                <div className="flex items-center space-x-1 bg-success/10 text-success px-3 py-1 rounded-full">
                  <Icon name="Trophy" size={16} />
                  <span className="text-sm font-medium">
                    {language === 'en' ? 'Winner' : 'வெற்றியாளர்'}
                  </span>
                </div>
              </div>
              <p className="text-lg text-muted-foreground">
                {result?.constituency?.[language]}
              </p>
            </div>
          </div>

          {/* Vote Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-foreground">
                {language === 'en' ? 'Vote Statistics' : 'வாக்கு புள்ளிவிவரங்கள்'}
              </h4>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                  <span className="text-sm text-muted-foreground">
                    {language === 'en' ? 'Votes Received' : 'பெற்ற வாக்குகள்'}
                  </span>
                  <span className="text-lg font-semibold text-foreground">
                    {formatVotes(result?.votes)}
                  </span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                  <span className="text-sm text-muted-foreground">
                    {language === 'en' ? 'Vote Percentage' : 'வாக்கு சதவீதம்'}
                  </span>
                  <span className="text-lg font-semibold text-foreground">
                    {result?.votePercentage}%
                  </span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                  <span className="text-sm text-muted-foreground">
                    {language === 'en' ? 'Victory Margin' : 'வெற்றி வித்தியாசம்'}
                  </span>
                  <span className={`text-lg font-semibold ${getMarginColor(result?.margin)}`}>
                    {formatVotes(result?.margin)}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-foreground">
                {language === 'en' ? 'Constituency Data' : 'தொகுதி தரவு'}
              </h4>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                  <span className="text-sm text-muted-foreground">
                    {language === 'en' ? 'Total Voters' : 'மொத்த வாக்காளர்கள்'}
                  </span>
                  <span className="text-lg font-semibold text-foreground">
                    {formatVotes(result?.totalVoters)}
                  </span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                  <span className="text-sm text-muted-foreground">
                    {language === 'en' ? 'Votes Polled' : 'பதிவான வாக்குகள்'}
                  </span>
                  <span className="text-lg font-semibold text-foreground">
                    {formatVotes(result?.votesPolled)}
                  </span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                  <span className="text-sm text-muted-foreground">
                    {language === 'en' ? 'Turnout Percentage' : 'வாக்குப்பதிவு சதவீதம்'}
                  </span>
                  <span className="text-lg font-semibold text-foreground">
                    {result?.turnout}%
                  </span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                  <span className="text-sm text-muted-foreground">
                    {language === 'en' ? 'Invalid Votes' : 'செல்லாத வாக்குகள்'}
                  </span>
                  <span className="text-lg font-semibold text-foreground">
                    {formatVotes(result?.invalidVotes)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-foreground">
              {language === 'en' ? 'Additional Information' : 'கூடுதல் தகவல்'}
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">
                  {language === 'en' ? 'Election Date' : 'தேர்தல் தேதி'}
                </p>
                <p className="text-base font-medium text-foreground">
                  {result?.electionDate}
                </p>
              </div>
              
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">
                  {language === 'en' ? 'Result Declared' : 'முடிவு அறிவிப்பு'}
                </p>
                <p className="text-base font-medium text-foreground">
                  {result?.resultDate}
                </p>
              </div>
              
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">
                  {language === 'en' ? 'Total Candidates' : 'மொத்த வேட்பாளர்கள்'}
                </p>
                <p className="text-base font-medium text-foreground">
                  {result?.totalCandidates}
                </p>
              </div>
              
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">
                  {language === 'en' ? 'Deposit Forfeited' : 'பிணையம் பறிமுதல்'}
                </p>
                <p className="text-base font-medium text-foreground">
                  {result?.depositForfeited}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end p-6 border-t border-border">
          <Button onClick={onClose}>
            {language === 'en' ? 'Close' : 'மூடு'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ResultDetailModal;