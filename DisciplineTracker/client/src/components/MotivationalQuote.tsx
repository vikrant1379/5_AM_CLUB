import { useState, useEffect } from "react";

export function MotivationalQuote() {
  // Vedic quotes focused on discipline and Purusharthas
  const motivationalQuotes = [
    {
      quote: "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन - You have the right to work, but not to the fruits",
      author: "Bhagavad Gita 2.47 - Discipline in Action"
    },
    {
      quote: "योगः कर्मसु कौशलम् - Excellence in action is yoga",
      author: "Bhagavad Gita 2.50 - Discipline as Yoga"
    },
    {
      quote: "धर्मो रक्षति रक्षितः - Dharma protects those who protect it",
      author: "Mahabharata - First Purushartha"
    },
    {
      quote: "उद्यमेन हि सिध्यन्ति कार्याणि न मनोरथैः - Success comes through discipline, not mere wishes",
      author: "Hitopadesha - Discipline for Artha"
    },
    {
      quote: "संयमो हि परं बलम् - Self-control is the highest strength",
      author: "Bhagavad Gita - Discipline for Moksha"
    },
    {
      quote: "अभ्यासेन तु कौन्तेय वैराग्येण च गृह्यते - Through practice and detachment, it is obtained",
      author: "Bhagavad Gita 6.35 - Discipline Practice"
    },
    {
      quote: "नियतं कुरु कर्म त्वं - Perform your prescribed duty",
      author: "Bhagavad Gita 3.8 - Duty as Discipline"
    },
    {
      quote: "स्वधर्मे निधनं श्रेयः - Better to die in one's own dharma",
      author: "Bhagavad Gita 3.35 - Dharma Discipline"
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
