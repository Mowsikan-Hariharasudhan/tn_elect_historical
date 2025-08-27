import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AudioPlayer = ({ selectedParties, language }) => {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [showVolumeControl, setShowVolumeControl] = useState(false);
  const audioRef = useRef(null);

  // Mock party theme songs data
  const partyThemes = {
    'DMK': {
      title: language === 'en' ? 'Arise Tamil People' : 'எழுக தமிழ் மக்களே',
      artist: language === 'en' ? 'DMK Cultural Wing' : 'திமுக கலை அணி',
      duration: 245,
      audioUrl: '/assets/audio/dmk-theme.mp3' // Mock URL
    },
    'AIADMK': {
      title: language === 'en' ? 'Golden Era Song' : 'பொன்னான காலம்',
      artist: language === 'en' ? 'AIADMK Artists' : 'அதிமுக கலைஞர்கள்',
      duration: 198,
      audioUrl: '/assets/audio/aiadmk-theme.mp3' // Mock URL
    },
    'INC': {
      title: language === 'en' ? 'Unity March' : 'ஒற்றுமை பாடல்',
      artist: language === 'en' ? 'Congress Musicians' : 'காங்கிரஸ் இசைக்கலைஞர்கள்',
      duration: 167,
      audioUrl: '/assets/audio/inc-theme.mp3' // Mock URL
    },
    'BJP': {
      title: language === 'en' ? 'Lotus Blooms' : 'தாமரை மலர்கிறது',
      artist: language === 'en' ? 'BJP Cultural Team' : 'பாஜக கலைக்குழு',
      duration: 189,
      audioUrl: '/assets/audio/bjp-theme.mp3' // Mock URL
    },
    'PMK': {
      title: language === 'en' ? 'Vanniyar Pride' : 'வன்னியர் பெருமை',
      artist: language === 'en' ? 'PMK Singers' : 'பமக பாடகர்கள்',
      duration: 156,
      audioUrl: '/assets/audio/pmk-theme.mp3' // Mock URL
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs?.toString()?.padStart(2, '0')}`;
  };

  const handlePlayPause = (party) => {
    if (currentTrack === party && isPlaying) {
      setIsPlaying(false);
      if (audioRef?.current) {
        audioRef?.current?.pause();
      }
    } else {
      setCurrentTrack(party);
      setIsPlaying(true);
      // In a real app, you would load and play the actual audio file
      // For demo purposes, we'll simulate audio playback
      if (audioRef?.current) {
        audioRef?.current?.play();
      }
    }
  };

  const handleStop = () => {
    setIsPlaying(false);
    setCurrentTrack(null);
    setCurrentTime(0);
    if (audioRef?.current) {
      audioRef?.current?.pause();
      audioRef.current.currentTime = 0;
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e?.target?.value);
    setVolume(newVolume);
    if (audioRef?.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const handleSeek = (e) => {
    if (currentTrack && partyThemes?.[currentTrack]) {
      const rect = e?.currentTarget?.getBoundingClientRect();
      const clickX = e?.clientX - rect?.left;
      const newTime = (clickX / rect?.width) * partyThemes?.[currentTrack]?.duration;
      setCurrentTime(newTime);
      if (audioRef?.current) {
        audioRef.current.currentTime = newTime;
      }
    }
  };

  // Simulate audio progress for demo
  useEffect(() => {
    let interval;
    if (isPlaying && currentTrack) {
      interval = setInterval(() => {
        setCurrentTime(prev => {
          const newTime = prev + 1;
          if (newTime >= partyThemes?.[currentTrack]?.duration) {
            setIsPlaying(false);
            setCurrentTrack(null);
            return 0;
          }
          return newTime;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentTrack]);

  const availableThemes = selectedParties?.filter(party => partyThemes?.[party]);

  if (availableThemes?.length === 0) {
    return (
      <div className="bg-card rounded-lg border border-border p-6 text-center">
        <Icon name="Music" size={48} className="text-muted-foreground mx-auto mb-4" />
        <p className="text-muted-foreground">
          {language === 'en' ?'Select parties to listen to their theme songs' :'அவர்களின் கருப்பொருள் பாடல்களைக் கேட்க கட்சிகளைத் தேர்ந்தெடுக்கவும்'
          }
        </p>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-lg border border-border p-4 lg:p-6">
      <div className="flex items-center space-x-3 mb-6">
        <Icon name="Music" size={24} className="text-primary" />
        <h3 className="text-lg font-semibold text-foreground">
          {language === 'en' ? 'Party Theme Songs' : 'கட்சி கருப்பொருள் பாடல்கள்'}
        </h3>
      </div>
      {/* Current Playing Track */}
      {currentTrack && (
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h4 className="font-medium text-foreground">{partyThemes?.[currentTrack]?.title}</h4>
              <p className="text-sm text-muted-foreground">{partyThemes?.[currentTrack]?.artist}</p>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handlePlayPause(currentTrack)}
              >
                <Icon name={isPlaying ? "Pause" : "Play"} size={16} />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleStop}
              >
                <Icon name="Square" size={16} />
              </Button>
              <div className="relative">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowVolumeControl(!showVolumeControl)}
                >
                  <Icon name={volume === 0 ? "VolumeX" : volume < 0.5 ? "Volume1" : "Volume2"} size={16} />
                </Button>
                {showVolumeControl && (
                  <div className="absolute right-0 top-full mt-2 bg-card border border-border rounded-lg p-3 shadow-lg z-10">
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={volume}
                      onChange={handleVolumeChange}
                      className="w-20"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div 
              className="w-full h-2 bg-muted rounded-full cursor-pointer"
              onClick={handleSeek}
            >
              <div 
                className="h-full bg-primary rounded-full transition-all duration-300"
                style={{ 
                  width: `${(currentTime / partyThemes?.[currentTrack]?.duration) * 100}%` 
                }}
              />
            </div>
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(partyThemes?.[currentTrack]?.duration)}</span>
            </div>
          </div>
        </div>
      )}
      {/* Available Tracks */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-muted-foreground">
          {language === 'en' ? 'Available Theme Songs:' : 'கிடைக்கும் கருப்பொருள் பாடல்கள்:'}
        </h4>
        
        {availableThemes?.map(party => {
          const theme = partyThemes?.[party];
          const isCurrentTrack = currentTrack === party;
          
          return (
            <div 
              key={party}
              className={`flex items-center justify-between p-3 rounded-lg border transition-colors ${
                isCurrentTrack 
                  ? 'border-primary bg-primary/5' :'border-border hover:bg-muted'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <span className="text-primary font-bold text-sm">{party}</span>
                </div>
                <div>
                  <h5 className="font-medium text-foreground text-sm">{theme?.title}</h5>
                  <p className="text-xs text-muted-foreground">{theme?.artist}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-xs text-muted-foreground">
                  {formatTime(theme?.duration)}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handlePlayPause(party)}
                  className="w-8 h-8 p-0"
                >
                  <Icon 
                    name={isCurrentTrack && isPlaying ? "Pause" : "Play"} 
                    size={14} 
                  />
                </Button>
              </div>
            </div>
          );
        })}
      </div>
      {/* Hidden audio element for actual playback */}
      <audio
        ref={audioRef}
        onLoadedMetadata={() => {
          if (audioRef?.current) {
            setDuration(audioRef?.current?.duration);
          }
        }}
        onTimeUpdate={() => {
          if (audioRef?.current) {
            setCurrentTime(audioRef?.current?.currentTime);
          }
        }}
        onEnded={() => {
          setIsPlaying(false);
          setCurrentTrack(null);
          setCurrentTime(0);
        }}
      />
    </div>
  );
};

export default AudioPlayer;