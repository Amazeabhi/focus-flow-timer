import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Minus, Plus } from 'lucide-react';

interface CustomTimerInputProps {
  onSetTime: (minutes: number) => void;
  currentMinutes: number;
}

export function CustomTimerInput({ onSetTime, currentMinutes }: CustomTimerInputProps) {
  const [minutes, setMinutes] = useState(Math.floor(currentMinutes / 60));

  const increment = () => {
    const newValue = Math.min(minutes + 5, 120);
    setMinutes(newValue);
    onSetTime(newValue);
  };

  const decrement = () => {
    const newValue = Math.max(minutes - 5, 1);
    setMinutes(newValue);
    onSetTime(newValue);
  };

  return (
    <div className="flex items-center gap-4 fade-in">
      <Button
        variant="glass"
        size="icon"
        onClick={decrement}
        disabled={minutes <= 1}
      >
        <Minus className="w-4 h-4" />
      </Button>
      
      <div className="text-center min-w-[80px]">
        <span className="text-2xl font-semibold">{minutes}</span>
        <span className="text-muted-foreground ml-1">min</span>
      </div>
      
      <Button
        variant="glass"
        size="icon"
        onClick={increment}
        disabled={minutes >= 120}
      >
        <Plus className="w-4 h-4" />
      </Button>
    </div>
  );
}
