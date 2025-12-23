import { Play, Pause, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TimerControlsProps {
  isRunning: boolean;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
}

export function TimerControls({ isRunning, onStart, onPause, onReset }: TimerControlsProps) {
  return (
    <div className="flex items-center gap-4">
      <Button
        variant="timerSecondary"
        size="iconLg"
        onClick={onReset}
        className="rounded-full"
      >
        <RotateCcw className="w-5 h-5" />
      </Button>
      
      <Button
        variant="timer"
        size="xl"
        onClick={isRunning ? onPause : onStart}
        className="rounded-full px-12"
      >
        {isRunning ? (
          <>
            <Pause className="w-5 h-5" />
            Pause
          </>
        ) : (
          <>
            <Play className="w-5 h-5" />
            Start
          </>
        )}
      </Button>
    </div>
  );
}
