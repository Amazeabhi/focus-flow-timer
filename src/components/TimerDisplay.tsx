import { cn } from '@/lib/utils';

interface TimerDisplayProps {
  time: string;
  progress: number;
  isRunning: boolean;
  isBreak: boolean;
}

export function TimerDisplay({ time, progress, isRunning, isBreak }: TimerDisplayProps) {
  const radius = 140;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative w-80 h-80 flex items-center justify-center">
      {/* Background glow */}
      <div
        className={cn(
          "absolute inset-4 rounded-full transition-all duration-500",
          isRunning && (isBreak ? "glow-break" : "glow-primary"),
          isRunning && "pulse-glow"
        )}
      />
      
      {/* SVG Ring */}
      <svg
        className="absolute inset-0 -rotate-90 w-full h-full"
        viewBox="0 0 320 320"
      >
        {/* Track */}
        <circle
          cx="160"
          cy="160"
          r={radius}
          fill="none"
          stroke="hsl(var(--timer-track))"
          strokeWidth="8"
        />
        
        {/* Progress */}
        <circle
          cx="160"
          cy="160"
          r={radius}
          fill="none"
          stroke={isBreak ? "hsl(var(--break))" : "hsl(var(--primary))"}
          strokeWidth="8"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className="timer-ring"
          style={{
            filter: isRunning ? `drop-shadow(0 0 10px ${isBreak ? 'hsl(var(--break))' : 'hsl(var(--primary))'})` : 'none',
          }}
        />
      </svg>

      {/* Timer Text */}
      <div className="relative z-10 flex flex-col items-center">
        <span className={cn(
          "timer-display text-7xl transition-colors duration-300",
          isBreak ? "text-break" : "text-foreground"
        )}>
          {time}
        </span>
        <span className="text-muted-foreground text-sm mt-2 uppercase tracking-widest">
          {isBreak ? 'Break Time' : 'Focus'}
        </span>
      </div>
    </div>
  );
}
