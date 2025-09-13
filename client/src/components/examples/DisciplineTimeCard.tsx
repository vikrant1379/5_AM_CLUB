import { DisciplineTimeCard } from '../DisciplineTimeCard';

export default function DisciplineTimeCardExample() {
  return (
    <div className="space-y-4 p-4">
      <DisciplineTimeCard
        time="6:00 AM"
        activity="Morning meditation and gratitude journaling"
        psychologicalImpact="Sets positive mindset and mental clarity for the day"
      />
      <DisciplineTimeCard
        time="7:00 AM"
        activity="High-intensity workout or strength training"
        psychologicalImpact="Boosts endorphins, builds mental resilience, and physical strength"
        isActive={true}
      />
    </div>
  );
}