import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [language, setLanguage] = useState('en');
  const location = useLocation();

  const navigationItems = [
    {
      path: '/historical-timeline-dashboard',
      label: { en: 'Dashboard', ta: 'டாஷ்போர்டு' },
      icon: 'BarChart3'
    },
    {
      path: '/interactive-constituency-map',
      label: { en: 'Constituencies', ta: 'தொகுதிகள்' },
      icon: 'Map'
    },
    {
      path: '/candidate-profile-explorer',
      label: { en: 'Candidates', ta: 'வேட்பாளர்கள்' },
      icon: 'Users'
    },
    {
      path: '/party-performance-analytics',
      label: { en: 'Parties', ta: 'கட்சிகள்' },
      icon: 'TrendingUp'
    },
    {
      path: '/election-results-archive',
      label: { en: 'Results', ta: 'முடிவுகள்' },
      icon: 'Archive'
    }
  ];

  const handleSearch = (e) => {
    e?.preventDefault();
    if (searchQuery?.trim()) {
      console.log('Searching for:', searchQuery);
    }
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'ta' : 'en');
  };

  const isActive = (path) => location?.pathname === path;

  return (
    <header className="bg-card border-b border-border sticky top-0 z-50 shadow-subtle">
      <div className="max-w-7xl mx-auto">
        {/* Top Bar */}
        <div className="flex items-center justify-between h-16 px-4 lg:px-6">
          {/* Logo */}
          <Link to="/historical-timeline-dashboard" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="Vote" size={24} color="white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-heading font-semibold text-foreground">
                TN Elect Historical
              </h1>
              <p className="text-xs text-muted-foreground font-caption">
                {language === 'en' ? 'Electoral Data Platform' : 'தேர்தல் தரவு தளம்'}
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigationItems?.map((item) => (
              <Link
                key={item?.path}
                to={item?.path}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  isActive(item?.path)
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <Icon name={item?.icon} size={18} />
                <span>{item?.label?.[language]}</span>
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center space-x-2">
            {/* Search */}
            <div className="relative">
              {isSearchOpen ? (
                <form onSubmit={handleSearch} className="flex items-center">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e?.target?.value)}
                    placeholder={language === 'en' ? 'Search...' : 'தேடுக...'}
                    className="w-48 px-3 py-2 text-sm border border-border rounded-md bg-input focus:outline-none focus:ring-2 focus:ring-ring"
                    autoFocus
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsSearchOpen(false)}
                    className="ml-1"
                  >
                    <Icon name="X" size={16} />
                  </Button>
                </form>
              ) : (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsSearchOpen(true)}
                  className="hidden sm:flex"
                >
                  <Icon name="Search" size={18} />
                </Button>
              )}
            </div>

            {/* Language Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLanguage}
              className="hidden sm:flex font-caption font-medium"
            >
              {language === 'en' ? 'தமிழ்' : 'ENG'}
            </Button>

            {/* User Menu */}
            <Button variant="ghost" size="sm" className="hidden sm:flex">
              <Icon name="User" size={18} />
            </Button>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden"
            >
              <Icon name={isMenuOpen ? "X" : "Menu"} size={20} />
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-border bg-card">
            <nav className="px-4 py-3 space-y-1">
              {navigationItems?.map((item) => (
                <Link
                  key={item?.path}
                  to={item?.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center space-x-3 px-3 py-3 rounded-md text-sm font-medium transition-colors duration-200 ${
                    isActive(item?.path)
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  <Icon name={item?.icon} size={20} />
                  <span>{item?.label?.[language]}</span>
                </Link>
              ))}
              
              {/* Mobile Actions */}
              <div className="pt-3 border-t border-border mt-3 space-y-2">
                <button
                  onClick={() => setIsSearchOpen(true)}
                  className="flex items-center space-x-3 px-3 py-3 w-full text-left text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors duration-200"
                >
                  <Icon name="Search" size={20} />
                  <span>{language === 'en' ? 'Search' : 'தேடுக'}</span>
                </button>
                
                <button
                  onClick={toggleLanguage}
                  className="flex items-center space-x-3 px-3 py-3 w-full text-left text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors duration-200"
                >
                  <Icon name="Globe" size={20} />
                  <span>{language === 'en' ? 'Switch to Tamil' : 'Switch to English'}</span>
                </button>
                
                <Link
                  to="/authentication-registration"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center space-x-3 px-3 py-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors duration-200"
                >
                  <Icon name="User" size={20} />
                  <span>{language === 'en' ? 'Account' : 'கணக்கு'}</span>
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;