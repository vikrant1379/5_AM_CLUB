import { useState, useRef, useEffect } from "react";
import { DayHeader } from "@/components/DayHeader";
import { MotivationalHero } from "@/components/MotivationalHero";
import { DisciplineTimeline } from "@/components/DisciplineTimeline";
import { FloatingQuote } from "@/components/FloatingQuote";
import { QuickReference } from "@/components/QuickReference";
import { MotivationalQuote } from "@/components/MotivationalQuote";
import { DisciplineLibrary } from "@/components/DisciplineLibrary";
import { BottomNavigation } from "@/components/BottomNavigation";
import { getCurrentChallengeStatus } from "@/lib/challengeUtils";

export default function Home() {
  const [challengeStatus, setChallengeStatus] = useState(getCurrentChallengeStatus());

  // Auto-update challenge status for real-time midnight transitions
  useEffect(() => {
    const timer = setInterval(() => {
      const newStatus = getCurrentChallengeStatus();
      setChallengeStatus(newStatus);
    }, 1000); // Update every second

    return () => clearInterval(timer);
  }, []);
  const [activeTab, setActiveTab] = useState<'schedule' | 'reference' | 'rules' | 'library'>('schedule');
  const [isArticleOpen, setIsArticleOpen] = useState(false);
  const timelineRef = useRef<HTMLDivElement>(null);

  const handleDayChange = (day: number) => {
    setChallengeStatus(prev => ({ ...prev, currentDay: day }));
  };

  const handleStartDay = () => {
    // Smooth scroll to the timeline
    if (timelineRef.current) {
      timelineRef.current.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start' 
      });
    }
    console.log(`Starting Day ${challengeStatus.currentDay} - scrolling to timeline`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 pb-20">
      <DayHeader
        currentDay={challengeStatus.currentDay}
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