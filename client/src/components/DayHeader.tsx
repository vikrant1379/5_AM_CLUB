import { ThemeToggle } from "./ThemeToggle";
import { useScrollDirection } from "@/hooks/useScrollDirection";

interface DayHeaderProps {
  currentDay: number;
  onDayChange: (day: number) => void;
}

export function DayHeader({ currentDay, onDayChange }: DayHeaderProps) {
  const showHeader = useScrollDirection();

  // Calculate countdown based on challenge dates
  const getChallengeStatus = () => {
    const today = new Date();
    const challengeStart = new Date('2025-09-22'); // September 22, 2025
    const challengeEnd = new Date('2025-12-30'); // December 30, 2025

    const timeDiff = challengeStart.getTime() - today.getTime();
    const daysRemaining = Math.ceil(timeDiff / (1000 * 3600 * 24));

    if (daysRemaining > 0) {
      // Before challenge starts
      return {
        status: 'countdown',
        days: -daysRemaining, // negative number for countdown display
        totalDays: 100,
        progress: 0
      };
    } else if (daysRemaining <= 0 && daysRemaining >= -100) {
      // During challenge
      return {
        status: 'active',
        days: Math.abs(daysRemaining) + 1, // Day 1, 2, 3...
        totalDays: 100,
        progress: Math.min((Math.abs(daysRemaining) + 1) / 100, 1)
      };
    } else {
      // After challenge ends
      return {
        status: 'completed',
        days: 100,
        totalDays: 100,
        progress: 1
      };
    }
  };

  const challengeStatus = getChallengeStatus();

  return (
    <div className={`fixed top-0 left-0 right-0 z-50 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 backdrop-blur border-b border-amber-200 dark:border-slate-700/50 transition-transform duration-300 ease-in-out ${
      showHeader ? 'transform translate-y-0' : 'transform -translate-y-full'
    }`}>
      <div className="max-w-md mx-auto">
        {/* Countdown Section */}
        <div className="flex items-center justify-between p-4">
          <div className="text-center flex-1">
            <h1 className="text-lg font-semibold text-amber-900 dark:text-slate-100" data-testid="text-day-counter">
              {challengeStatus.status === 'countdown' ? (
                <span className="text-orange-700 dark:text-orange-400 font-bold">
                  {challengeStatus.days}/100 days
                </span>
              ) : challengeStatus.status === 'active' ? (
                <span className="text-green-700 dark:text-emerald-400 font-bold">
                  Day {challengeStatus.days}/100
                </span>
              ) : (
                <span className="text-indigo-700 dark:text-emerald-400 font-bold">
                  Challenge Complete!
                </span>
              )}
            </h1>
            <div className="text-xs text-amber-700 dark:text-slate-400 mt-1">
              {challengeStatus.status === 'countdown' ? (
                <span>Challenge starts Sep 22</span>
              ) : challengeStatus.status === 'active' ? (
                <span>Challenge in progress</span>
              ) : (
                <span>Challenge completed</span>
              )}
            </div>
            <div className="text-xs text-amber-600 dark:text-slate-500">
              {new Date().toLocaleTimeString('en-US', { 
                hour: 'numeric', 
                minute: '2-digit',
                hour12: true 
              })}
            </div>
            <div className="w-full bg-amber-200 dark:bg-slate-700/50 rounded-full h-1 mt-1">
              <div 
                className={`h-1 rounded-full transition-all duration-300 ${
                  challengeStatus.status === 'countdown' 
                    ? 'bg-orange-600 dark:bg-orange-400' 
                    : challengeStatus.status === 'active'
                    ? 'bg-green-600 dark:bg-emerald-400'
                    : 'bg-indigo-600 dark:bg-emerald-400'
                }`}
                style={{ width: `${challengeStatus.progress * 100}%` }}
              />
            </div>
          </div>

          <div className="flex items-center">
            <ThemeToggle />
          </div>
        </div>

      </div>
    </div>
  );
}