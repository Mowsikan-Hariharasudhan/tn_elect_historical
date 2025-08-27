import React, { useState, useEffect } from 'react';

import Button from '../../../components/ui/Button';

const BookmarkSystem = ({ candidate, language }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    // Load bookmarks from localStorage
    const savedBookmarks = JSON.parse(localStorage.getItem('candidateBookmarks') || '[]');
    setBookmarks(savedBookmarks);
    setIsBookmarked(savedBookmarks?.some(b => b?.id === candidate?.id));
  }, [candidate?.id]);

  const toggleBookmark = () => {
    let updatedBookmarks;
    
    if (isBookmarked) {
      // Remove bookmark
      updatedBookmarks = bookmarks?.filter(b => b?.id !== candidate?.id);
    } else {
      // Add bookmark
      const bookmarkData = {
        id: candidate?.id,
        name: candidate?.name,
        party: candidate?.party,
        photo: candidate?.photo,
        currentConstituency: candidate?.currentConstituency,
        bookmarkedAt: new Date()?.toISOString()
      };
      updatedBookmarks = [...bookmarks, bookmarkData];
    }
    
    setBookmarks(updatedBookmarks);
    setIsBookmarked(!isBookmarked);
    localStorage.setItem('candidateBookmarks', JSON.stringify(updatedBookmarks));
    
    // Show feedback
    const message = isBookmarked 
      ? (language === 'en' ? 'Removed from bookmarks' : 'புத்தகக்குறியிலிருந்து நீக்கப்பட்டது')
      : (language === 'en' ? 'Added to bookmarks' : 'புத்தகக்குறியில் சேர்க்கப்பட்டது');
    
    // Simple toast notification (you could replace with a proper toast library)
    if (window.showToast) {
      window.showToast(message);
    } else {
      console.log(message);
    }
  };

  return (
    <Button
      variant={isBookmarked ? "default" : "outline"}
      size="sm"
      onClick={toggleBookmark}
      iconName={isBookmarked ? "BookmarkCheck" : "Bookmark"}
      iconPosition="left"
      className="transition-all duration-200"
    >
      {isBookmarked 
        ? (language === 'en' ? 'Bookmarked' : 'புத்தகக்குறி') 
        : (language === 'en' ? 'Bookmark' : 'புத்தகக்குறி சேர்க்க')
      }
    </Button>
  );
};

export default BookmarkSystem;