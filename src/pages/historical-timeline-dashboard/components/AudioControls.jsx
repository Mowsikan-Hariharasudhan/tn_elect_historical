import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AudioControls = ({ language }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [isVisible, setIsVisible] = useState(false);
  const audioRef = useRef(null);

  const tracks = [
    {
      id: 1,
      title: language === 'en' ? 'DMK Theme Song' : 'திமுக கீதம்',
      party: 'DMK',
      duration: '3:45',
      src: '#' // Mock audio source
    },
    {
      id: 2,
      title: language === 'en' ? 'AIADMK Anthem' : 'அதிமுக பாடல்',
      party: 'AIADMK',
      duration: '4:12',
      src: '#' // Mock audio source
    },
    {
      id: 3,
      title: language === 'en' ? 'Congress March' : 'காங்கிரஸ் அணிவகுப்பு',
      party: 'INC',
      duration: '2:58',
      src: '#' // Mock audio source
    }
  ];

  const togglePlay = () => {
    if (isPlaying) {
      // audioRef.current?.pause();
      setIsPlaying(false);
    } else {
      // audioRef.current?.play();
      setIsPlaying(true);
    }
  };

  const nextTrack = () => {
    setCurrentTrack((prev) => (prev + 1) % tracks?.length);
  };

  const prevTrack = () => {
    setCurrentTrack((prev) => (prev - 1 + tracks?.length) % tracks?.length);
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e?.target?.value);
    setVolume(newVolume);
    if (audioRef?.current) {
      audioRef.current.volume = newVolume;
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {/* Toggle Button */}
      <Button
        variant="default"
        size="icon"
        onClick={() => setIsVisible(!isVisible)}
        className="w-12 h-12 rounded-full shadow-lg mb-2"
      >
        <Icon name={isVisible ? "X" : "Music"} size={20} />
      </Button>
      {/* Audio Player Panel */}
      {isVisible && (
        <div className="bg-card border border-border rounded-lg shadow-xl p-4 w-80 mb-2">
          <div className="space-y-4">
            {/* Track Info */}
            <div className="text-center">
              <h4 className="font-semibold text-foreground text-sm">
                {tracks?.[currentTrack]?.title}
              </h4>
              <p className="text-xs text-muted-foreground">
                {tracks?.[currentTrack]?.party} • {tracks?.[currentTrack]?.duration}
              </p>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="w-full bg-muted rounded-full h-1">
                <div 
                  className="bg-primary h-1 rounded-full transition-all duration-300"
                  style={{ width: isPlaying ? '45%' : '0%' }}
                />
              </div>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{isPlaying ? '1:23' : '0:00'}</span>
                <span>{tracks?.[currentTrack]?.duration}</span>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={prevTrack}
              >
                <Icon name="SkipBack" size={16} />
              </Button>
              
              <Button
                variant="default"
                size="sm"
                onClick={togglePlay}
                className="w-10 h-10 rounded-full"
              >
                <Icon name={isPlaying ? "Pause" : "Play"} size={16} />
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={nextTrack}
              >
                <Icon name="SkipForward" size={16} />
              </Button>
            </div>

            {/* Volume Control */}
            <div className="flex items-center space-x-2">
              <Icon name="Volume2" size={16} className="text-muted-foreground" />
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={handleVolumeChange}
                className="flex-1 h-1 bg-muted rounded-lg appearance-none cursor-pointer"
              />
              <span className="text-xs text-muted-foreground w-8">
                {Math.round(volume * 100)}%
              </span>
            </div>

            {/* Track List */}
            <div className="space-y-1 max-h-32 overflow-y-auto">
              {tracks?.map((track, index) => (
                <button
                  key={track?.id}
                  onClick={() => setCurrentTrack(index)}
                  className={`w-full text-left p-2 rounded text-xs transition-colors ${
                    currentTrack === index
                      ? 'bg-primary/10 text-primary' :'hover:bg-muted text-muted-foreground'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="truncate">{track?.title}</span>
                    <span>{track?.duration}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
      {/* Hidden Audio Element */}
      <audio
        ref={audioRef}
        src={tracks?.[currentTrack]?.src}
        onEnded={() => setIsPlaying(false)}
        preload="none"
      />
    </div>
  );
};

export default AudioControls;