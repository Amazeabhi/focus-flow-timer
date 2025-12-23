import { useEffect, useState } from 'react';
import { Quote } from 'lucide-react';

const quotes = [
  { text: "The secret of getting ahead is getting started.", author: "Mark Twain" },
  { text: "Focus on being productive instead of busy.", author: "Tim Ferriss" },
  { text: "Small progress is still progress.", author: "Unknown" },
  { text: "Your future self will thank you.", author: "Unknown" },
  { text: "Done is better than perfect.", author: "Sheryl Sandberg" },
  { text: "Take a deep breath. You're doing great.", author: "Unknown" },
  { text: "Rest is not idleness.", author: "John Lubbock" },
  { text: "Recharge your mind, refresh your spirit.", author: "Unknown" },
  { text: "Breaks are essential for peak performance.", author: "Unknown" },
  { text: "A rested mind is a creative mind.", author: "Unknown" },
];

interface MotivationalQuoteProps {
  isBreak: boolean;
}

export function MotivationalQuote({ isBreak }: MotivationalQuoteProps) {
  const [quote, setQuote] = useState(quotes[0]);

  useEffect(() => {
    if (isBreak) {
      const breakQuotes = quotes.slice(5);
      setQuote(breakQuotes[Math.floor(Math.random() * breakQuotes.length)]);
    } else {
      const focusQuotes = quotes.slice(0, 5);
      setQuote(focusQuotes[Math.floor(Math.random() * focusQuotes.length)]);
    }
  }, [isBreak]);

  return (
    <div className="flex items-start gap-3 max-w-md text-center fade-in">
      <Quote className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
      <div>
        <p className="text-muted-foreground text-sm italic">"{quote.text}"</p>
        <p className="text-xs text-muted-foreground/70 mt-1">— {quote.author}</p>
      </div>
    </div>
  );
}
