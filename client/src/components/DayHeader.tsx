import { useState, useEffect } from "react";
import { ThemeToggle } from "./ThemeToggle";
import { useScrollDirection } from "@/hooks/useScrollDirection";
import { getCurrentChallengeStatus } from "@/lib/challengeUtils";

interface DayHeaderProps {
  currentDay: number;
  onDayChange: (day: number) => void;
}

export function DayHeader({ currentDay, onDayChange }: DayHeaderProps) {
  const showHeader = useScrollDirection();
  const [currentTime, setCurrentTime] = useState(new Date());

  const challengeStatus = getCurrentChallengeStatus();

  // Update time every second for real-time display
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

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
                  {challengeStatus.daysUntilStart ? `-${challengeStatus.daysUntilStart}` : '0'}/100 days
                </span>
              ) : challengeStatus.status === 'active' ? (
                <span className="text-green-700 dark:text-emerald-400 font-bold">
                  Day {challengeStatus.currentDay}/100
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
            <div className="text-sm font-medium text-amber-800 dark:text-slate-300 mt-2">
              {currentTime.toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric' 
              })}, {currentTime.toLocaleTimeString('en-US', { 
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