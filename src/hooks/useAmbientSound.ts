import { useState, useRef, useEffect, useCallback } from 'react';

export interface AmbientSound {
  id: string;
  name: string;
  icon: string;
  url: string;
}

export const AMBIENT_SOUNDS: AmbientSound[] = [
  {
    id: 'rain',
    name: 'Rain',
    icon: '🌧️',
    url: 'https://cdn.pixabay.com/audio/2022/05/16/audio_3ff67b0f5e.mp3',
  },
  {
    id: 'thunder',
    name: 'Thunder',
    icon: '⛈️',
    url: 'https://cdn.pixabay.com/audio/2021/08/09/audio_6e2d22a0bb.mp3',
  },
  {
    id: 'forest',
    name: 'Forest',
    icon: '🌲',
    url: 'https://cdn.pixabay.com/audio/2022/03/10/audio_1b6c05e0cc.mp3',
  },
  {
    id: 'night',
    name: 'Night',
    icon: '🌙',
    url: 'https://cdn.pixabay.com/audio/2021/08/09/audio_3d77b2a4e6.mp3',
  },
  {
    id: 'fire',
    name: 'Fireplace',
    icon: '🔥',
    url: 'https://cdn.pixabay.com/audio/2022/10/18/audio_69cdb66ced.mp3',
  },
  {
    id: 'cafe',
    name: 'Café',
    icon: '☕',
    url: 'https://cdn.pixabay.com/audio/2022/03/15/audio_4a8e7f5e5d.mp3',
  },
];

export function useAmbientSound() {
  const [currentSound, setCurrentSound] = useState<string | null>(null);
  const [volume, setVolume] = useState(0.5);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const play = useCallback((soundId: string) => {
    const sound = AMBIENT_SOUNDS.find(s => s.id === soundId);
    if (!sound) return;

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }

    const audio = new Audio(sound.url);
    audio.loop = true;
    audio.volume = volume;
    audioRef.current = audio;
    
    audio.play().then(() => {
      setCurrentSound(soundId);
      setIsPlaying(true);
    }).catch(() => {
      console.log('Audio playback failed - user interaction required');
    });
  }, [volume]);

  const stop = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    setCurrentSound(null);
    setIsPlaying(false);
  }, []);

  const toggle = useCallback((soundId: string) => {
    if (currentSound === soundId && isPlaying) {
      stop();
    } else {
      play(soundId);
    }
  }, [currentSound, isPlaying, play, stop]);

  const updateVolume = useCallback((newVolume: number) => {
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  return {
    currentSound,
    isPlaying,
    volume,
    play,
    stop,
    toggle,
    updateVolume,
    sounds: AMBIENT_SOUNDS,
  };
}
