import { Flame } from 'lucide-react';

interface SessionCounterProps {
  count: number;
}

export function SessionCounter({ count }: SessionCounterProps) {
  return (
    <div className="flex items-center gap-2 px-4 py-2 bg-secondary/50 rounded-full">
      <Flame className="w-4 h-4 text-primary" />
      <span className="text-sm font-medium">
        <span className="text-primary">{count}</span>
        <span className="text-muted-foreground ml-1">
          {count === 1 ? 'session' : 'sessions'}
        </span>
      </span>
    </div>
  );
}
