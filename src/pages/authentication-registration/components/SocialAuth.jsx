import React, { useState } from 'react';
import Button from '../../../components/ui/Button';


const SocialAuth = ({ language }) => {
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isFacebookLoading, setIsFacebookLoading] = useState(false);

  const handleSocialAuth = async (provider) => {
    if (provider === 'google') {
      setIsGoogleLoading(true);
    } else {
      setIsFacebookLoading(true);
    }

    // Simulate social auth
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    alert(language === 'en' 
      ? `${provider} authentication would be implemented here` 
      : `${provider} அங்கீகாரம் இங்கே செயல்படுத்தப்படும்`
    );
    
    setIsGoogleLoading(false);
    setIsFacebookLoading(false);
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-card text-muted-foreground">
            {language === 'en' ? 'Or continue with' : 'அல்லது இதனுடன் தொடரவும்'}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Button
          variant="outline"
          onClick={() => handleSocialAuth('Google')}
          loading={isGoogleLoading}
          iconName="Chrome"
          iconPosition="left"
          className="justify-center"
        >
          Google
        </Button>
        
        <Button
          variant="outline"
          onClick={() => handleSocialAuth('Facebook')}
          loading={isFacebookLoading}
          iconName="Facebook"
          iconPosition="left"
          className="justify-center"
        >
          Facebook
        </Button>
      </div>
    </div>
  );
};

export default SocialAuth;