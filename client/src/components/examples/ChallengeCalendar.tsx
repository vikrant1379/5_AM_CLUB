import { useState } from 'react';
import { ChallengeCalendar } from '../ChallengeCalendar';

export default function ChallengeCalendarExample() {
  const [currentDay, setCurrentDay] = useState(15);

  const handleDaySelect = (day: number) => {
    setCurrentDay(day);
    console.log(`Selected Day ${day}`);
  };

  return (
    <div className="p-4 bg-background min-h-screen">
      <ChallengeCalendar
        currentDay={currentDay}
        onDaySelect={handleDaySelect}
      />
    </div>
  );
}