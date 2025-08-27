import React, { useState } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const AuthForm = ({ isLogin, onToggleMode, language }) => {
  const { signIn, signUp, authError, clearError } = useAuth();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    confirmPassword: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear validation error for this field
    if (validationErrors?.[name]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
    
    // Clear auth error when user starts typing
    if (authError) {
      clearError();
    }
  };

  const validateForm = () => {
    const errors = {};

    // Email validation
    if (!formData?.email) {
      errors.email = language === 'en' ? 'Email is required' : 'மின்னஞ்சல் தேவை';
    } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
      errors.email = language === 'en' ? 'Please enter a valid email address' : 'சரியான மின்னஞ்சல் முகவரியை உள்ளிடவும்';
    }

    // Password validation
    if (!formData?.password) {
      errors.password = language === 'en' ? 'Password is required' : 'கடவுச்சொல் தேவை';
    } else if (formData?.password?.length < 6) {
      errors.password = language === 'en' ? 'Password must be at least 6 characters' : 'கடவுச்சொல் குறைந்தது 6 எழுத்துகளாக இருக்க வேண்டும்';
    }

    // Additional validation for signup
    if (!isLogin) {
      if (!formData?.fullName?.trim()) {
        errors.fullName = language === 'en' ? 'Full name is required' : 'முழு பெயர் தேவை';
      }

      if (!formData?.confirmPassword) {
        errors.confirmPassword = language === 'en' ? 'Please confirm your password' : 'உங்கள் கடவுச்சொல்லை உறுதிப்படுத்தவும்';
      } else if (formData?.password !== formData?.confirmPassword) {
        errors.confirmPassword = language === 'en' ? 'Passwords do not match' : 'கடவுச்சொற்கள் பொருந்தவில்லை';
      }
    }

    setValidationErrors(errors);
    return Object.keys(errors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      let result;
      if (isLogin) {
        result = await signIn(formData?.email, formData?.password);
      } else {
        result = await signUp(formData?.email, formData?.password, formData?.fullName);
      }

      if (result?.success) {
        // Reset form on success
        setFormData({
          email: '',
          password: '',
          fullName: '',
          confirmPassword: ''
        });

        if (!isLogin) {
          // Show success message for signup
          // You might want to show a success notification here
          console.log('Signup successful. Please check your email for verification.');
        }
      }
    } catch (error) {
      console.error('Authentication error:', error);
    } finally {
      setLoading(false);
    }
  };

  const getFieldError = (fieldName) => {
    return validationErrors?.[fieldName] || '';
  };

  return (
    <div className="space-y-6">
      {/* Show auth error */}
      {authError && (
        <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <Icon name="AlertCircle" size={16} className="text-destructive flex-shrink-0" />
            <p className="text-sm text-destructive">{authError}</p>
            <button 
              onClick={clearError}
              className="ml-auto text-destructive hover:text-destructive/80"
            >
              <Icon name="X" size={14} />
            </button>
          </div>
          <div className="mt-2">
            <button 
              onClick={() => navigator.clipboard?.writeText(authError)}
              className="text-xs text-destructive/80 hover:text-destructive underline"
            >
              {language === 'en' ? 'Copy error message' : 'பிழை செய்தியை நகலெடு'}
            </button>
          </div>
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Full Name - Only for signup */}
        {!isLogin && (
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              {language === 'en' ? 'Full Name' : 'முழு பெயர்'} *
            </label>
            <Input
              type="text"
              name="fullName"
              value={formData?.fullName}
              onChange={handleInputChange}
              placeholder={language === 'en' ? 'Enter your full name' : 'உங்கள் முழு பெயரை உள்ளிடவும்'}
              error={getFieldError('fullName')}
              disabled={loading}
            />
          </div>
        )}

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            {language === 'en' ? 'Email Address' : 'மின்னஞ்சல் முகவரி'} *
          </label>
          <Input
            type="email"
            name="email"
            value={formData?.email}
            onChange={handleInputChange}
            placeholder={language === 'en' ? 'Enter your email' : 'உங்கள் மின்னஞ்சலை உள்ளிடவும்'}
            error={getFieldError('email')}
            disabled={loading}
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            {language === 'en' ? 'Password' : 'கடவுச்சொல்'} *
          </label>
          <Input
            type="password"
            name="password"
            value={formData?.password}
            onChange={handleInputChange}
            placeholder={language === 'en' ? 'Enter your password' : 'உங்கள் கடவுச்சொல்லை உள்ளிடவும்'}
            error={getFieldError('password')}
            disabled={loading}
          />
        </div>

        {/* Confirm Password - Only for signup */}
        {!isLogin && (
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              {language === 'en' ? 'Confirm Password' : 'கடவுச்சொல்லை உறுதிப்படுத்தவும்'} *
            </label>
            <Input
              type="password"
              name="confirmPassword"
              value={formData?.confirmPassword}
              onChange={handleInputChange}
              placeholder={language === 'en' ? 'Confirm your password' : 'உங்கள் கடவுச்சொல்லை மீண்டும் உள்ளிடவும்'}
              error={getFieldError('confirmPassword')}
              disabled={loading}
            />
          </div>
        )}

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full"
          disabled={loading}
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              {isLogin 
                ? (language === 'en' ? 'Signing In...' : 'உள்நுழைகிறது...')
                : (language === 'en' ? 'Creating Account...' : 'கணக்கை உருவாக்குகிறது...')
              }
            </>
          ) : (
            <>
              <Icon 
                name={isLogin ? "LogIn" : "UserPlus"} 
                size={16} 
                className="mr-2" 
              />
              {isLogin 
                ? (language === 'en' ? 'Sign In' : 'உள்நுழைய')
                : (language === 'en' ? 'Create Account' : 'கணக்கை உருவாக்கவும்')
              }
            </>
          )}
        </Button>

        {/* Toggle Mode */}
        <div className="text-center pt-4">
          <p className="text-sm text-muted-foreground">
            {isLogin 
              ? (language === 'en' ? 'Don\'t have an account?' : 'கணக்கு இல்லையா?')
              : (language === 'en' ? 'Already have an account?' : 'ஏற்கனவே கணக்கு உள்ளதா?')
            }
          </p>
          <button
            type="button"
            onClick={onToggleMode}
            className="text-sm font-medium text-primary hover:text-primary/80 transition-colors mt-1"
            disabled={loading}
          >
            {isLogin 
              ? (language === 'en' ? 'Create an account' : 'கணக்கை உருவாக்கவும்')
              : (language === 'en' ? 'Sign in instead' : 'உள்நுழைய')
            }
          </button>
        </div>
      </form>
    </div>
  );
};

export default AuthForm;