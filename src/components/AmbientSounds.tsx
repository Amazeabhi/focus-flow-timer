import { Volume2, VolumeX } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { AmbientSound } from '@/hooks/useAmbientSound';

interface AmbientSoundsProps {
  sounds: AmbientSound[];
  currentSound: string | null;
  isPlaying: boolean;
  volume: number;
  onToggle: (id: string) => void;
  onVolumeChange: (volume: number) => void;
}

export function AmbientSounds({
  sounds,
  currentSound,
  isPlaying,
  volume,
  onToggle,
  onVolumeChange,
}: AmbientSoundsProps) {
  return (
    <div className="glass-card p-6 w-full max-w-md slide-up">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Ambient Sounds</h2>
        <div className="flex items-center gap-2">
          {volume === 0 ? (
            <VolumeX className="w-4 h-4 text-muted-foreground" />
          ) : (
            <Volume2 className="w-4 h-4 text-muted-foreground" />
          )}
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={e => onVolumeChange(parseFloat(e.target.value))}
            className="w-20 h-1.5 bg-secondary rounded-full appearance-none cursor-pointer
                       [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 
                       [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full 
                       [&::-webkit-slider-thumb]:bg-primary"
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {sounds.map(sound => (
          <button
            key={sound.id}
            onClick={() => onToggle(sound.id)}
            className={cn(
              "flex flex-col items-center gap-1 p-3 rounded-xl transition-all duration-200",
              currentSound === sound.id && isPlaying
                ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                : "bg-secondary/50 hover:bg-secondary text-foreground"
            )}
          >
            <span className="text-2xl">{sound.icon}</span>
            <span className="text-xs font-medium">{sound.name}</span>
            {currentSound === sound.id && isPlaying && (
              <div className="flex gap-0.5 h-3 items-end">
                {[1, 2, 3].map(i => (
                  <div
                    key={i}
                    className="w-0.5 bg-primary-foreground rounded-full sound-wave"
                    style={{
                      height: '100%',
                      animationDelay: `${i * 0.15}s`,
                    }}
                  />
                ))}
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
