import { Moon, Sun, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';

interface HeaderProps {
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

export function Header({ theme, onToggleTheme }: HeaderProps) {
  const [isMuted, setIsMuted] = useState(() => {
    return localStorage.getItem('ticksy-muted') === 'true';
  });

  useEffect(() => {
    localStorage.setItem('ticksy-muted', isMuted.toString());
  }, [isMuted]);

  return (
    <header className="w-full flex items-center justify-between p-4 md:p-6">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
          <span className="text-primary-foreground font-bold text-sm">T</span>
        </div>
        <h1 className="text-xl font-semibold">
          <span className="text-gradient">Ticksy</span>
        </h1>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="iconSm"
          onClick={() => setIsMuted(!isMuted)}
          className="text-muted-foreground hover:text-foreground"
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </Button>
        
        <Button
          variant="ghost"
          size="iconSm"
          onClick={onToggleTheme}
          className="text-muted-foreground hover:text-foreground"
        >
          {theme === 'dark' ? (
            <Sun className="w-4 h-4" />
          ) : (
            <Moon className="w-4 h-4" />
          )}
        </Button>
      </div>
    </header>
  );
}
