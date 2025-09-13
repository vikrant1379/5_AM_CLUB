import { useState } from 'react';
import { DayHeader } from '../DayHeader';

export default function DayHeaderExample() {
  const [currentDay, setCurrentDay] = useState(42);

  const handleDayChange = (day: number) => {
    setCurrentDay(day);
  };

  const handleStartDay = () => {
    console.log(`Starting Day ${currentDay}`);
  };

  return (
    <DayHeader
      currentDay={currentDay}
      onDayChange={handleDayChange}
      onStartDay={handleStartDay}
    />
  );
}