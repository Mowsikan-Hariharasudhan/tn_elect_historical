import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const ForgotPassword = ({ isVisible, onClose, language }) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!email) {
      setError(language === 'en' ? 'Email is required' : 'மின்னஞ்சல் தேவை');
      return;
    }
    
    if (!/\S+@\S+\.\S+/?.test(email)) {
      setError(language === 'en' ? 'Invalid email format' : 'தவறான மின்னஞ்சல் வடிவம்');
      return;
    }

    setIsLoading(true);
    setError('');
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSuccess(true);
    setIsLoading(false);
  };

  const handleClose = () => {
    setEmail('');
    setError('');
    setIsSuccess(false);
    onClose();
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-card rounded-lg shadow-lg w-full max-w-md">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h3 className="text-lg font-semibold text-foreground">
            {language === 'en' ? 'Reset Password' : 'கடவுச்சொல்லை மீட்டமைக்கவும்'}
          </h3>
          <button
            onClick={handleClose}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Icon name="X" size={20} />
          </button>
        </div>
        
        <div className="p-6">
          {isSuccess ? (
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto">
                <Icon name="CheckCircle" size={32} color="var(--color-success)" />
              </div>
              <div>
                <h4 className="text-lg font-medium text-foreground mb-2">
                  {language === 'en' ? 'Email Sent!' : 'மின்னஞ்சல் அனுப்பப்பட்டது!'}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {language === 'en' ?'Check your email for password reset instructions.' :'கடவுச்சொல் மீட்டமைப்பு வழிமுறைகளுக்கு உங்கள் மின்னஞ்சலைச் சரிபார்க்கவும்.'
                  }
                </p>
              </div>
              <Button variant="default" onClick={handleClose} fullWidth>
                {language === 'en' ? 'Close' : 'மூடு'}
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <p className="text-sm text-muted-foreground">
                {language === 'en' ?'Enter your email address and we\'ll send you a link to reset your password.' :'உங்கள் மின்னஞ்சல் முகவரியை உள்ளிட்டு, கடவுச்சொல்லை மீட்டமைக்க ஒரு இணைப்பை அனுப்புவோம்.'
                }
              </p>
              
              <Input
                label={language === 'en' ? 'Email Address' : 'மின்னஞ்சல் முகவரி'}
                type="email"
                value={email}
                onChange={(e) => setEmail(e?.target?.value)}
                placeholder={language === 'en' ? 'Enter your email' : 'உங்கள் மின்னஞ்சலை உள்ளிடவும்'}
                error={error}
                required
              />
              
              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleClose}
                  fullWidth
                >
                  {language === 'en' ? 'Cancel' : 'ரத்து'}
                </Button>
                <Button
                  type="submit"
                  variant="default"
                  loading={isLoading}
                  fullWidth
                >
                  {language === 'en' ? 'Send Reset Link' : 'மீட்டமைப்பு இணைப்பை அனுப்பவும்'}
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;