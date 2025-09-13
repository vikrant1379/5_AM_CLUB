import { Card } from "@/components/ui/card";
import { Clock } from "lucide-react";

interface DisciplineTimeCardProps {
  time: string;
  activity: string;
  psychologicalImpact: string;
  isActive?: boolean;
  onCardClick?: () => void;
  isHighlight?: boolean;
}

export function DisciplineTimeCard({
  time,
  activity,
  psychologicalImpact,
  isActive = false,
  onCardClick,
  isHighlight = false
}: DisciplineTimeCardProps) {
  const getCurrentTimeStatus = () => {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const currentTime = currentHour * 60 + currentMinute;
    
    // Parse the time range to get start and end times
    const timeRange = time.split(' – ');
    const startTimeStr = timeRange[0];
    const endTimeStr = timeRange[1];
    
    // Handle cases where there's no end time (like sleep)
    if (!endTimeStr) {
      return 'past'; // If no end time, consider it past
    }
    
    // Parse start time
    const [startTimePart, startPeriod] = startTimeStr.split(' ');
    const [startHours, startMinutes] = startTimePart.split(':').map(Number);
    
    // Convert start time to 24-hour format
    let startHour24 = startHours;
    if (startPeriod === 'PM' && startHours !== 12) {
      startHour24 = startHours + 12;
    } else if (startPeriod === 'AM' && startHours === 12) {
      startHour24 = 0;
    }
    const startTime = startHour24 * 60 + (startMinutes || 0);
    
    // Parse end time
    const [endTimePart, endPeriod] = endTimeStr.split(' ');
    const [endHours, endMinutes] = endTimePart.split(':').map(Number);
    
    // Convert end time to 24-hour format
    let endHour24 = endHours;
    if (endPeriod === 'PM' && endHours !== 12) {
      endHour24 = endHours + 12;
    } else if (endPeriod === 'AM' && endHours === 12) {
      endHour24 = 0;
    }
    const endTime = endHour24 * 60 + (endMinutes || 0);
    
    // Check if current time is within the exact activity window
    if (currentTime >= startTime && currentTime < endTime) {
      return 'current';
    } else if (currentTime < startTime) {
      return 'upcoming';
    } else {
      return 'past';
    }
  };

  const timeStatus = getCurrentTimeStatus();

  return (
    <Card
      className={`p-4 border-l-4 transition-all duration-200 cursor-pointer hover-elevate ${
        isActive
          ? 'border-l-amber-600 bg-amber-50 dark:bg-slate-800/40'
          : timeStatus === 'current'
            ? 'border-l-orange-600 bg-orange-50 dark:bg-slate-800/40'
            : 'border-l-amber-300 dark:border-l-slate-600'
      } ${isHighlight ? 'ring-2 ring-amber-400/30' : ''}`}
      onClick={onCardClick}
      data-testid={`card-discipline-${time.replace(':', '').toLowerCase()}`}
    >
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0">
          <Clock className={`h-5 w-5 mt-0.5 ${
            timeStatus === 'current' ? 'text-orange-600' : 'text-amber-600'
          }`} />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-amber-900 dark:text-slate-100" data-testid={`text-time-${time.replace(':', '').toLowerCase()}`}>
              {time}
            </h3>
            {isHighlight && (
              <span className="text-xs bg-amber-200 dark:bg-slate-700 text-amber-800 dark:text-slate-200 px-2 py-1 rounded-full font-medium">
                Key Activity
              </span>
            )}
          </div>
          
          <p className="text-base text-amber-800 dark:text-slate-200 mb-2 leading-relaxed" data-testid={`text-activity-${time.replace(':', '').toLowerCase()}`}>
            {activity}
          </p>

          <p className="text-sm text-amber-700 dark:text-slate-300 italic" data-testid={`text-impact-${time.replace(':', '').toLowerCase()}`}>
            {psychologicalImpact}
          </p>

          {/* Time Status Indicator */}
          {timeStatus === 'current' && (
            <div className="mt-2 p-2 bg-amber-100 dark:bg-slate-700/50 rounded-lg border border-amber-300 dark:border-slate-600">
              <div className="flex items-center space-x-2 text-xs text-amber-800 dark:text-slate-200">
                <div className="w-2 h-2 bg-amber-600 dark:bg-slate-400 rounded-full animate-pulse"></div>
                <span className="font-medium">Happening now</span>
                <span className="text-amber-700 dark:text-slate-300">
                  ({new Date().toLocaleTimeString('en-US', {
                    hour: 'numeric',
                    minute: '2-digit',
                    hour12: true
                  })})
                </span>
              </div>
              <div className="text-xs text-amber-700 dark:text-slate-300 mt-1">
                ⏰ {time}
              </div>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}