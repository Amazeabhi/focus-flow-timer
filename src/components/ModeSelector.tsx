import { cn } from '@/lib/utils';
import type { TimerMode } from '@/hooks/useTimer';

interface ModeSelectorProps {
  currentMode: TimerMode;
  onModeChange: (mode: TimerMode) => void;
}

const modes: { id: TimerMode; label: string; time: string }[] = [
  { id: 'focus', label: 'Focus', time: '25 min' },
  { id: 'shortBreak', label: 'Short Break', time: '5 min' },
  { id: 'longBreak', label: 'Long Break', time: '15 min' },
  { id: 'custom', label: 'Custom', time: '' },
];

export function ModeSelector({ currentMode, onModeChange }: ModeSelectorProps) {
  return (
    <div className="flex flex-wrap justify-center gap-2 p-1 bg-secondary/50 rounded-2xl">
      {modes.map(mode => (
        <button
          key={mode.id}
          onClick={() => onModeChange(mode.id)}
          className={cn(
            "px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200",
            currentMode === mode.id
              ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
              : "text-muted-foreground hover:text-foreground hover:bg-secondary"
          )}
        >
          <span>{mode.label}</span>
          {mode.time && (
            <span className="ml-1 text-xs opacity-70">({mode.time})</span>
          )}
        </button>
      ))}
    </div>
  );
}
