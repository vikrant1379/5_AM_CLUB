import { useState, useRef, useEffect } from "react";
import { DayHeader } from "@/components/DayHeader";
import { MotivationalHero } from "@/components/MotivationalHero";
import { DisciplineTimeline } from "@/components/DisciplineTimeline";
import { FloatingQuote } from "@/components/FloatingQuote";
import { QuickReference } from "@/components/QuickReference";
import { MotivationalQuote } from "@/components/MotivationalQuote";
import { DisciplineLibrary } from "@/components/DisciplineLibrary";
import { BottomNavigation } from "@/components/BottomNavigation";

// Calculate current day automatically based on challenge dates
const getCurrentChallengeDay = () => {
  const today = new Date();
  const challengeStart = new Date('2025-09-22'); // September 22, 2025
  
  const timeDiff = today.getTime() - challengeStart.getTime();
  const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
  
  if (daysDiff < 0) {
    return 1; // Before challenge starts, show day 1
  } else if (daysDiff >= 0 && daysDiff < 100) {
    return daysDiff + 1; // Day 1, 2, 3... during challenge
  } else {
    return 100; // After challenge ends, show day 100
  }
};

export default function Home() {
  const [currentDay, setCurrentDay] = useState(getCurrentChallengeDay());

  // Auto-update current day every second for real-time midnight transitions
  useEffect(() => {
    const timer = setInterval(() => {
      const newDay = getCurrentChallengeDay();
      setCurrentDay(newDay);
    }, 1000); // Update every second

    return () => clearInterval(timer);
  }, []);
  const [activeTab, setActiveTab] = useState<'schedule' | 'reference' | 'rules' | 'library'>('schedule');
  const [isArticleOpen, setIsArticleOpen] = useState(false);
  const timelineRef = useRef<HTMLDivElement>(null);

  const handleDayChange = (day: number) => {
    setCurrentDay(day);
  };

  const handleStartDay = () => {
    // Smooth scroll to the timeline
    if (timelineRef.current) {
      timelineRef.current.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start' 
      });
    }
    console.log(`Starting Day ${currentDay} - scrolling to timeline`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 pb-20">
      <DayHeader
        currentDay={currentDay}
        onDayChange={handleDayChange}
      />
      
        <main className="max-w-md mx-auto pt-24">
          {activeTab === 'schedule' && (
            <>
              <MotivationalHero />
              <MotivationalQuote />
              <div ref={timelineRef}>
                <DisciplineTimeline />
              </div>
            </>
          )}

          {activeTab === 'reference' && (
            <QuickReference />
          )}

          {activeTab === 'rules' && (
            <FloatingQuote />
          )}

          {activeTab === 'library' && (
            <DisciplineLibrary onArticleStateChange={setIsArticleOpen} />
          )}
        </main>

      {!isArticleOpen && (
        <BottomNavigation 
          activeTab={activeTab} 
          onTabChange={setActiveTab}
        />
      )}
    </div>
  );
}