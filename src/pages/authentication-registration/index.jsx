import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import AuthForm from './components/AuthForm';
import SocialAuth from './components/SocialAuth';
import ForgotPassword from './components/ForgotPassword';
import GuestAccess from './components/GuestAccess';
import PlatformBenefits from './components/PlatformBenefits';
import Icon from '../../components/AppIcon';

const AuthenticationRegistration = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [language, setLanguage] = useState('en');
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  useEffect(() => {
    // Check for saved language preference
    const savedLanguage = localStorage.getItem('tnelect_language');
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
    localStorage.setItem('tnelect_language', newLanguage);
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
  };

  return (
    <>
      <Helmet>
        <title>
          {language === 'en' ?'Authentication & Registration - TN Elect Historical' :'அங்கீகாரம் மற்றும் பதிவு - TN Elect வரலாற்று'
          }
        </title>
        <meta 
          name="description" 
          content={language === 'en' ?'Sign in or register to access personalized features of Tamil Nadu electoral history platform' :'தமிழ்நாடு தேர்தல் வரலாற்று தளத்தின் தனிப்பயனாக்கப்பட்ட அம்சங்களை அணுக உள்நுழையவும் அல்லது பதிவு செய்யவும்'
          } 
        />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="flex-1">
          <div className="max-w-7xl mx-auto px-4 py-8 lg:py-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              {/* Left Column - Authentication Form */}
              <div className="order-2 lg:order-1">
                <div className="max-w-md mx-auto">
                  {/* Header */}
                  <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon name="UserCheck" size={32} color="var(--color-primary)" />
                    </div>
                    <h1 className="text-3xl font-bold text-foreground mb-2">
                      {isLogin 
                        ? (language === 'en' ? 'Welcome Back' : 'மீண்டும் வரவேற்கிறோம்')
                        : (language === 'en' ? 'Create Account' : 'கணக்கை உருவாக்கவும்')
                      }
                    </h1>
                    <p className="text-muted-foreground">
                      {isLogin 
                        ? (language === 'en' ?'Sign in to access your personalized electoral data dashboard' :'உங்கள் தனிப்பயனாக்கப்பட்ட தேர்தல் தரவு டாஷ்போர்டை அணுக உள்நுழையவும்'
                        )
                        : (language === 'en' ?'Join thousands exploring Tamil Nadu\'s electoral heritage' :'தமிழ்நாட்டின் தேர்தல் பாரம்பரியத்தை ஆராயும் ஆயிரக்கணக்கானவர்களுடன் சேரவும்'
                        )
                      }
                    </p>
                  </div>

                  {/* Language Toggle */}
                  <div className="flex justify-center mb-6">
                    <div className="bg-muted rounded-lg p-1 flex">
                      <button
                        onClick={() => handleLanguageChange('en')}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                          language === 'en' ?'bg-card text-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
                        }`}
                      >
                        English
                      </button>
                      <button
                        onClick={() => handleLanguageChange('ta')}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                          language === 'ta' ?'bg-card text-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
                        }`}
                      >
                        தமிழ்
                      </button>
                    </div>
                  </div>

                  {/* Authentication Form */}
                  <div className="bg-card rounded-lg shadow-sm border border-border p-6 mb-6">
                    <AuthForm 
                      isLogin={isLogin}
                      onToggleMode={toggleAuthMode}
                      language={language}
                      onLanguageChange={handleLanguageChange}
                    />
                    
                    {isLogin && (
                      <div className="mt-4 text-center">
                        <button
                          onClick={() => setShowForgotPassword(true)}
                          className="text-sm text-primary hover:text-primary/80 transition-colors"
                        >
                          {language === 'en' ? 'Forgot your password?' : 'உங்கள் கடவுச்சொல்லை மறந்துவிட்டீர்களா?'}
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Social Authentication */}
                  <div className="bg-card rounded-lg shadow-sm border border-border p-6 mb-6">
                    <SocialAuth language={language} />
                  </div>

                  {/* Guest Access */}
                  <GuestAccess language={language} />
                </div>
              </div>

              {/* Right Column - Platform Benefits (Desktop Only) */}
              <div className="order-1 lg:order-2 hidden lg:block">
                <div className="sticky top-24">
                  <PlatformBenefits language={language} />
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Forgot Password Modal */}
        <ForgotPassword 
          isVisible={showForgotPassword}
          onClose={() => setShowForgotPassword(false)}
          language={language}
        />

        {/* Footer */}
        <footer className="bg-card border-t border-border mt-12">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Icon name="Vote" size={16} color="white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">TN Elect Historical</p>
                  <p className="text-xs text-muted-foreground">
                    {language === 'en' ? 'Electoral Data Platform' : 'தேர்தல் தரவு தளம்'}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                <a href="#" className="hover:text-foreground transition-colors">
                  {language === 'en' ? 'Privacy Policy' : 'தனியுரிமைக் கொள்கை'}
                </a>
                <a href="#" className="hover:text-foreground transition-colors">
                  {language === 'en' ? 'Terms of Service' : 'சேவை விதிமுறைகள்'}
                </a>
                <a href="#" className="hover:text-foreground transition-colors">
                  {language === 'en' ? 'Support' : 'ஆதரவு'}
                </a>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-border text-center">
              <p className="text-xs text-muted-foreground">
                © {new Date()?.getFullYear()} TN Elect Historical. {language === 'en' ? 'All rights reserved.' : 'அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.'}
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default AuthenticationRegistration;