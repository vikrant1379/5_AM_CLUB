import { useState, useEffect } from "react";

export function MotivationalQuote() {
  // Timeless discipline quotes from spiritual masters and ancient Indian philosophers
  const motivationalQuotes = [
    {
      quote: "Arise, awake, and stop not till the goal is reached.",
      author: "Swami Vivekananda"
    },
    {
      quote: "Discipline is not about control, it is about direction.",
      author: "Sadhguru"
    },
    {
      quote: "Discipline is love for the highest goal.",
      author: "Sri Sri Ravi Shankar"
    },
    {
      quote: "No effort on this path is ever wasted.",
      author: "Bhagavad Gita"
    },
    {
      quote: "This mind can be your greatest friend, or your worst enemy.",
      author: "Bhagavad Gita"
    },
    {
      quote: "It is a good discipline to be forced to work for work's sake, even to the length of not being allowed to enjoy the fruits of one's labour.",
      author: "Swami Vivekananda"
    },
    {
      quote: "Discipline is the fire in which your talent becomes ability.",
      author: "Indian Proverb"
    },
    {
      quote: "Let me not pray to be sheltered from dangers, but to be fearless in facing them.",
      author: "Rabindranath Tagore"
    },
    {
      quote: "Once you start working on something, don't be afraid of failure and don't abandon it.",
      author: "Chanakya"
    },
    {
      quote: "As soon as the fear approaches near, attack and destroy it.",
      author: "Chanakya"
    },
    {
      quote: "Self-discipline is the most important personal quality of a leader.",
      author: "Chanakya"
    },
    {
      quote: "Everything comes to us that belongs to us if we create the capacity to receive it.",
      author: "Rabindranath Tagore"
    },
    {
      quote: "Faith is the bird that feels the light when the dawn is still dark.",
      author: "Rabindranath Tagore"
    },
    {
      quote: "We should not fret for what is past, nor should we be anxious about the future; men of discernment deal only with the present moment.",
      author: "Chanakya"
    },
    {
      quote: "The human soul is on its journey from the law to love, from discipline to liberation.",
      author: "Rabindranath Tagore"
    },
    {
      quote: "You can't cross the sea merely by standing and staring at the water.",
      author: "Rabindranath Tagore"
    },
    {
      quote: "There is no austerity equal to a balanced mind, and there is no happiness equal to contentment.",
      author: "Chanakya"
    },
    {
      quote: "The one excellent thing that can be learned from a lion is that whatever a man intends doing should be done by him with a whole-hearted and strenuous effort.",
      author: "Chanakya"
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
          <div className="text-2xl mb-2">🪷</div>
          <div className="text-sm text-amber-900 dark:text-slate-200 italic mb-2 transition-all duration-500 ease-in-out leading-relaxed">
            "{motivationalQuotes[currentQuote].quote}"
          </div>
          <div className="text-xs text-amber-700 dark:text-slate-400 font-medium">
            — {motivationalQuotes[currentQuote].author}
          </div>
        </div>
        
      </div>
    </div>
  );
}
