import { Calendar, Flame, CheckCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

interface ChallengeCalendarProps {
  currentDay: number;
  onDaySelect: (day: number) => void;
}

export function ChallengeCalendar({ currentDay, onDaySelect }: ChallengeCalendarProps) {
  const [challengeStartDate] = useState(new Date('2025-09-22')); // September 22, 2025
  const [today, setToday] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setToday(new Date());
    }, 1000); // Update every second for real-time updates

    return () => clearInterval(timer);
  }, []);

  const getDayOfChallenge = (date: Date): number => {
    const diffTime = date.getTime() - challengeStartDate.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    return diffDays + 1;
  };

  const getDateForDay = (day: number): Date => {
    const date = new Date(challengeStartDate);
    date.setDate(challengeStartDate.getDate() + day - 1);
    return date;
  };

  const getCurrentChallengeDay = (): number => {
    return getDayOfChallenge(today);
  };

  const actualCurrentDay = getCurrentChallengeDay();
  const isActive = actualCurrentDay >= 1 && actualCurrentDay <= 100;

  const renderWeek = (startDay: number) => {
    const days = [];
    for (let day = startDay; day < startDay + 7 && day <= 100; day++) {
      const date = getDateForDay(day);
      const isToday = actualCurrentDay === day && isActive;
      const isPast = day < actualCurrentDay && isActive;
      const isFuture = day > actualCurrentDay || !isActive;
      const isSelected = day === currentDay;

      days.push(
        <Button
          key={day}
          variant={isSelected ? "default" : "ghost"}
          size="sm"
          onClick={() => onDaySelect(day)}
          disabled={isFuture}
          data-testid={`button-day-${day}`}
          className={`
            relative min-h-12 flex flex-col items-center justify-center p-2 hover-elevate active-elevate-2
            ${isToday ? 'bg-primary text-primary-foreground ring-2 ring-primary/50' : ''}
            ${isPast ? 'bg-muted text-muted-foreground' : ''}
            ${isFuture ? 'opacity-50' : ''}
          `}
        >
          <div className="flex items-center space-x-1">
            <span className="text-xs font-semibold">{day}</span>
            {isToday && <Flame className="h-3 w-3 text-orange-500" />}
            {isPast && <CheckCircle className="h-3 w-3 text-green-500" />}
          </div>
          <div className="text-xs opacity-70">
            {date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
          </div>
        </Button>
      );
    }
    return days;
  };

  const renderCalendar = () => {
    const weeks = [];
    for (let week = 0; week < Math.ceil(100 / 7); week++) {
      const startDay = week * 7 + 1;
      weeks.push(
        <div key={week} className="grid grid-cols-7 gap-1 mb-2">
          {renderWeek(startDay)}
        </div>
      );
    }
    return weeks;
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const challengeEndDate = new Date(challengeStartDate);
  challengeEndDate.setDate(challengeStartDate.getDate() + 99);

  return (
    <Card className="p-6 max-w-2xl mx-auto mb-6">
      <div className="flex items-center space-x-2 mb-4">
        <Calendar className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-semibold text-foreground" data-testid="text-calendar-title">
          100 Days Challenge Calendar
        </h2>
      </div>
      
      <div className="mb-4 space-y-2">
        <p className="text-sm text-muted-foreground">
          <strong>Start:</strong> {formatDate(challengeStartDate)}
        </p>
        <p className="text-sm text-muted-foreground">
          <strong>End:</strong> {formatDate(challengeEndDate)}
        </p>
        {isActive && (
          <p className="text-sm text-foreground font-medium" data-testid="text-current-day-status">
            <Flame className="inline h-4 w-4 text-orange-500 mr-1" />
            Today is Day {actualCurrentDay} of 100
          </p>
        )}
        {!isActive && actualCurrentDay < 1 && (
          <p className="text-sm text-muted-foreground">
            Challenge starts on {formatDate(challengeStartDate)}
          </p>
        )}
        {!isActive && actualCurrentDay > 100 && (
          <p className="text-sm text-foreground font-medium text-green-600">
            🎉 Challenge completed! You did it!
          </p>
        )}
      </div>

      <div className="mb-4">
        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Flame className="h-3 w-3 text-orange-500" />
            <span>Current Day</span>
          </div>
          <div className="flex items-center space-x-1">
            <CheckCircle className="h-3 w-3 text-green-500" />
            <span>Completed</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="h-3 w-3 bg-muted rounded"></div>
            <span>Upcoming</span>
          </div>
        </div>
      </div>

      <div className="calendar-grid" data-testid="container-calendar-grid">
        {renderCalendar()}
      </div>

      <div className="mt-4 text-center">
        <p className="text-sm text-muted-foreground">
          Click on any available day to view its schedule
        </p>
      </div>
    </Card>
  );
}