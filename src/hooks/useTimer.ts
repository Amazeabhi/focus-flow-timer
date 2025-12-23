import { useState, useEffect, useCallback, useRef } from 'react';

export type TimerMode = 'focus' | 'shortBreak' | 'longBreak' | 'custom';

interface TimerSettings {
  focus: number;
  shortBreak: number;
  longBreak: number;
  custom: number;
}

const DEFAULT_SETTINGS: TimerSettings = {
  focus: 25 * 60,
  shortBreak: 5 * 60,
  longBreak: 15 * 60,
  custom: 25 * 60,
};

export function useTimer() {
  const [mode, setMode] = useState<TimerMode>('focus');
  const [settings, setSettings] = useState<TimerSettings>(() => {
    const saved = localStorage.getItem('ticksy-timer-settings');
    return saved ? JSON.parse(saved) : DEFAULT_SETTINGS;
  });
  const [timeLeft, setTimeLeft] = useState(settings.focus);
  const [isRunning, setIsRunning] = useState(false);
  const [sessionCount, setSessionCount] = useState(() => {
    const saved = localStorage.getItem('ticksy-session-count');
    return saved ? parseInt(saved, 10) : 0;
  });

  const intervalRef = useRef<number | null>(null);
  const endSoundRef = useRef<HTMLAudioElement | null>(null);

  // Initialize end sound
  useEffect(() => {
    endSoundRef.current = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3');
    endSoundRef.current.volume = 0.5;
  }, []);

  // Save settings to localStorage
  useEffect(() => {
    localStorage.setItem('ticksy-timer-settings', JSON.stringify(settings));
  }, [settings]);

  // Save session count to localStorage
  useEffect(() => {
    localStorage.setItem('ticksy-session-count', sessionCount.toString());
  }, [sessionCount]);

  const totalTime = settings[mode];
  const progress = ((totalTime - timeLeft) / totalTime) * 100;

  const playEndSound = useCallback(() => {
    const isMuted = localStorage.getItem('ticksy-muted') === 'true';
    if (!isMuted && endSoundRef.current) {
      endSoundRef.current.currentTime = 0;
      endSoundRef.current.play().catch(() => {});
    }
  }, []);

  const start = useCallback(() => {
    setIsRunning(true);
  }, []);

  const pause = useCallback(() => {
    setIsRunning(false);
  }, []);

  const reset = useCallback(() => {
    setIsRunning(false);
    setTimeLeft(settings[mode]);
  }, [settings, mode]);

  const switchMode = useCallback((newMode: TimerMode) => {
    setIsRunning(false);
    setMode(newMode);
    setTimeLeft(settings[newMode]);
  }, [settings]);

  const updateCustomTime = useCallback((minutes: number) => {
    const seconds = minutes * 60;
    setSettings(prev => ({ ...prev, custom: seconds }));
    if (mode === 'custom') {
      setTimeLeft(seconds);
    }
  }, [mode]);

  // Timer logic
  useEffect(() => {
    if (isRunning) {
      intervalRef.current = window.setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setIsRunning(false);
            playEndSound();
            
            // Increment session count only for focus mode
            if (mode === 'focus') {
              setSessionCount(c => c + 1);
            }
            
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, mode, playEndSound]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return {
    mode,
    timeLeft,
    isRunning,
    progress,
    sessionCount,
    settings,
    formattedTime: formatTime(timeLeft),
    start,
    pause,
    reset,
    switchMode,
    updateCustomTime,
  };
}
