import { useState, useEffect } from "react";

export function MotivationalQuote() {
  // World-class discipline and motivation quotes from famous philosophers
  const motivationalQuotes = [
    {
      quote: "You have power over your mind - not outside events. Realize this, and you will find strength.",
      author: "Marcus Aurelius, Roman Emperor & Stoic Philosopher"
    },
    {
      quote: "No man is free who is not master of himself.",
      author: "Epictetus, Ancient Greek Stoic Philosopher"
    },
    {
      quote: "Mastering others is strength. Mastering yourself is true power.",
      author: "Lao Tzu, Ancient Chinese Philosopher"
    },
    {
      quote: "The first and best victory is to conquer self.",
      author: "Plato, Ancient Greek Philosopher"
    },
    {
      quote: "A disciplined mind leads to happiness, and an undisciplined mind leads to suffering.",
      author: "Buddha, Spiritual Teacher & Philosopher"
    },
    {
      quote: "We must all suffer one of two things: the pain of discipline or the pain of regret and disappointment.",
      author: "Jim Rohn, American Entrepreneur & Motivational Speaker"
    },
    {
      quote: "We are what we repeatedly do. Excellence, then, is not an act, but a habit.",
      author: "Aristotle, Ancient Greek Philosopher"
    },
    {
      quote: "Self-discipline begins with the mastery of your thoughts. If you don't control what you think, you can't control what you do.",
      author: "Napoleon Hill, Author & Success Philosopher"
    },
    {
      quote: "The happiness of your life depends upon the quality of your thoughts.",
      author: "Marcus Aurelius, Roman Emperor & Stoic Philosopher"
    },
    {
      quote: "Be tolerant with others and strict with yourself.",
      author: "Marcus Aurelius, Roman Emperor & Stoic Philosopher"
    }
  ];

  const [currentQuote, setCurrentQuote] = useState(0);

  // Rotate quotes every 8 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % motivationalQuotes.length);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="px-4 py-3">
      <div className="bg-gradient-to-r from-amber-100 via-orange-50 to-yellow-100 dark:from-slate-800/60 dark:via-slate-700/40 dark:to-slate-800/60 rounded-lg p-4 border border-amber-300 dark:border-slate-600/50 shadow-sm">
        <div className="text-center">
          <div className="text-2xl mb-2">🕉️</div>
          <div className="text-sm text-amber-900 dark:text-slate-200 italic mb-2 transition-all duration-500 ease-in-out leading-relaxed">
            "{motivationalQuotes[currentQuote].quote}"
          </div>
          <div className="text-xs text-amber-700 dark:text-slate-400 font-medium">
            — {motivationalQuotes[currentQuote].author}
          </div>
        </div>
        
        {/* Quote indicator dots */}
        <div className="flex justify-center space-x-1 mt-3">
          {motivationalQuotes.map((_, index) => (
            <div
              key={index}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                index === currentQuote
                  ? 'bg-amber-600 dark:bg-slate-300 scale-125 shadow-sm'
                  : 'bg-amber-300 dark:bg-slate-600'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
