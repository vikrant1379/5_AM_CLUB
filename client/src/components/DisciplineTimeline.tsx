import { DisciplineTimeCard } from "./DisciplineTimeCard";
import { useState } from "react";
import { DISCIPLINE_SCHEDULE, KEY_RULES, MUST_POST_HIGHLIGHTS } from "@/data/disciplineSchedule";
import { Card } from "@/components/ui/card";
import { CheckCircle, Target, Camera } from "lucide-react";

export function DisciplineTimeline() {
  const [activeCardIndex, setActiveCardIndex] = useState<number | null>(null);

  const handleCardClick = (index: number) => {
    setActiveCardIndex(activeCardIndex === index ? null : index);
    console.log(`Clicked on ${DISCIPLINE_SCHEDULE[index].timeRange} - ${DISCIPLINE_SCHEDULE[index].activity}`);
  };

  const getCategoryEmoji = (category: string) => {
    switch (category) {
      case 'morning': return '🌅';
      case 'work': return '💼';
      case 'evening': return '🌙';
      case 'sleep': return '😴';
      default: return '';
    }
  };

  const getCategoryTitle = (category: string) => {
    switch (category) {
      case 'morning': return 'Win the Morning, Win the Day';
      case 'work': return 'Primary Work Focus';
      case 'evening': return 'Strong Evenings, Strong Growth';
      case 'sleep': return 'Sleep Time (11 PM - 5 AM)';
      default: return '';
    }
  };

  const getCurrentActiveCategory = () => {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const currentTime = currentHour * 60 + currentMinute;
    
    // Check if any activity in each category is currently active
    const morningActivities = DISCIPLINE_SCHEDULE.filter(item => item.category === 'morning');
    const workActivities = DISCIPLINE_SCHEDULE.filter(item => item.category === 'work');
    const eveningActivities = DISCIPLINE_SCHEDULE.filter(item => item.category === 'evening');
    
    // Check morning activities (5:00 AM - 9:00 AM)
    const isMorningActive = morningActivities.some(activity => {
      const timeRange = activity.timeRange.split(' – ');
      const startTimeStr = timeRange[0];
      const endTimeStr = timeRange[1];
      
      // Handle cases where there's no end time (like sleep)
      if (!endTimeStr) {
        return false;
      }
      
      const [startTimePart, startPeriod] = startTimeStr.split(' ');
      const [startHours, startMinutes] = startTimePart.split(':').map(Number);
      let startHour24 = startHours;
      if (startPeriod === 'PM' && startHours !== 12) {
        startHour24 = startHours + 12;
      } else if (startPeriod === 'AM' && startHours === 12) {
        startHour24 = 0;
      }
      const startTime = startHour24 * 60 + (startMinutes || 0);
      
      const [endTimePart, endPeriod] = endTimeStr.split(' ');
      const [endHours, endMinutes] = endTimePart.split(':').map(Number);
      let endHour24 = endHours;
      if (endPeriod === 'PM' && endHours !== 12) {
        endHour24 = endHours + 12;
      } else if (endPeriod === 'AM' && endHours === 12) {
        endHour24 = 0;
      }
      const endTime = endHour24 * 60 + (endMinutes || 0);
      
      return currentTime >= startTime && currentTime < endTime;
    });
    
    // Check work activities (9:00 AM - 5:00 PM)
    const isWorkActive = workActivities.some(activity => {
      const timeRange = activity.timeRange.split(' – ');
      const startTimeStr = timeRange[0];
      const endTimeStr = timeRange[1];
      
      // Handle cases where there's no end time
      if (!endTimeStr) {
        return false;
      }
      
      const [startTimePart, startPeriod] = startTimeStr.split(' ');
      const [startHours, startMinutes] = startTimePart.split(':').map(Number);
      let startHour24 = startHours;
      if (startPeriod === 'PM' && startHours !== 12) {
        startHour24 = startHours + 12;
      } else if (startPeriod === 'AM' && startHours === 12) {
        startHour24 = 0;
      }
      const startTime = startHour24 * 60 + (startMinutes || 0);
      
      const [endTimePart, endPeriod] = endTimeStr.split(' ');
      const [endHours, endMinutes] = endTimePart.split(':').map(Number);
      let endHour24 = endHours;
      if (endPeriod === 'PM' && endHours !== 12) {
        endHour24 = endHours + 12;
      } else if (endPeriod === 'AM' && endHours === 12) {
        endHour24 = 0;
      }
      const endTime = endHour24 * 60 + (endMinutes || 0);
      
      return currentTime >= startTime && currentTime < endTime;
    });
    
    // Check evening activities (5:00 PM - 11:00 PM)
    const isEveningActive = eveningActivities.some(activity => {
      const timeRange = activity.timeRange.split(' – ');
      const startTimeStr = timeRange[0];
      const endTimeStr = timeRange[1];
      
      // Handle cases where there's no end time
      if (!endTimeStr) {
        return false;
      }
      
      const [startTimePart, startPeriod] = startTimeStr.split(' ');
      const [startHours, startMinutes] = startTimePart.split(':').map(Number);
      let startHour24 = startHours;
      if (startPeriod === 'PM' && startHours !== 12) {
        startHour24 = startHours + 12;
      } else if (startPeriod === 'AM' && startHours === 12) {
        startHour24 = 0;
      }
      const startTime = startHour24 * 60 + (startMinutes || 0);
      
      const [endTimePart, endPeriod] = endTimeStr.split(' ');
      const [endHours, endMinutes] = endTimePart.split(':').map(Number);
      let endHour24 = endHours;
      if (endPeriod === 'PM' && endHours !== 12) {
        endHour24 = endHours + 12;
      } else if (endPeriod === 'AM' && endHours === 12) {
        endHour24 = 0;
      }
      const endTime = endHour24 * 60 + (endMinutes || 0);
      
      return currentTime >= startTime && currentTime < endTime;
    });
    
    // Check sleep time (11:00 PM - 5:00 AM next day)
    const isSleepTime = currentTime >= 23 * 60 || currentTime < 5 * 60; // 11 PM to 5 AM
    
    if (isMorningActive) return 'morning';
    if (isWorkActive) return 'work';
    if (isEveningActive) return 'evening';
    if (isSleepTime) return 'sleep';
    return null; // No active time
  };

  const currentActiveCategory = getCurrentActiveCategory();

  const groupedSchedule = DISCIPLINE_SCHEDULE.reduce((acc, item, index) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push({ ...item, originalIndex: index });
    return acc;
  }, {} as Record<string, Array<typeof DISCIPLINE_SCHEDULE[0] & { originalIndex: number }>>);

  return (
    <div className="px-4 pb-8">
      {/* Sleep Time Indicator */}
        {currentActiveCategory === 'sleep' && (
          <div className="mb-6 p-4 bg-amber-100 dark:bg-slate-800/40 border-2 border-amber-300 dark:border-slate-600 rounded-lg text-center">
            <div className="text-2xl mb-2">😴</div>
            <h3 className="text-lg font-semibold text-amber-800 dark:text-slate-200 mb-1">
              Sleep Time (11 PM - 5 AM)
            </h3>
            <p className="text-sm text-amber-700 dark:text-slate-300">
              Current time: {new Date().toLocaleTimeString('en-US', { 
                hour: 'numeric', 
                minute: '2-digit',
                hour12: true 
              })} • Rest and recharge for tomorrow's discipline
            </p>
          </div>
        )}
      
      <div className="space-y-6" data-testid="container-timeline">
        {['morning', 'work', 'evening'].map((category) => {
          const items = groupedSchedule[category] || [];
          if (items.length === 0) return null;
          
          return (
            <div key={category} className="space-y-4">
             <div className={`text-center py-6 px-4 rounded-xl transition-all duration-300 ${
               currentActiveCategory === category
                 ? 'bg-gradient-to-br from-amber-100 to-orange-100 dark:from-slate-800/60 dark:to-slate-700/40 border-2 border-amber-300 dark:border-slate-600 shadow-lg'
                 : 'bg-gradient-to-br from-amber-50/50 to-orange-50/30 dark:from-slate-800/30 dark:to-slate-700/20'
             }`}>
                <div className="flex items-center justify-center space-x-3 mb-3">
                  <span className="text-3xl">{getCategoryEmoji(category)}</span>
                  <h2 className="text-xl font-semibold text-amber-900 dark:text-slate-100">
                    {getCategoryTitle(category)}
                  </h2>
                </div>
                
                {currentActiveCategory === category && (
                  <div className="space-y-2">
                    <div className="inline-flex items-center space-x-2 bg-amber-200 dark:bg-slate-700/50 text-amber-800 dark:text-slate-200 px-3 py-1.5 rounded-full text-sm font-medium">
                      <div className="w-2 h-2 bg-amber-600 dark:bg-slate-400 rounded-full animate-pulse"></div>
                      <span>You're doing great!</span>
                    </div>
                    <div className="text-sm text-amber-700 dark:text-slate-300 font-medium">
                      {new Date().toLocaleTimeString('en-US', { 
                        hour: 'numeric', 
                        minute: '2-digit',
                        hour12: true 
                      })}
                    </div>
                  </div>
                )}
              </div>
              
              <div className="space-y-3">
                {items.map((item) => (
                  <DisciplineTimeCard
                    key={item.originalIndex}
                    time={item.timeRange}
                    activity={item.activity}
                    psychologicalImpact={item.psychologicalImpact}
                    isActive={activeCardIndex === item.originalIndex}
                    onCardClick={() => handleCardClick(item.originalIndex)}
                    isHighlight={item.isHighlight}
                  />
                ))}
              </div>
            </div>
          );
        })}
        
        {/* Key Rules Section */}
        <Card className="p-6 bg-gradient-to-br from-amber-100/50 via-orange-50/30 to-yellow-50/20 dark:from-amber-900/30 dark:via-orange-900/20 dark:to-yellow-900/10 border-amber-300 dark:border-amber-700/50 hover-elevate active-elevate-2 transition-all duration-300 animate-in slide-in-from-bottom-4">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-amber-200 dark:bg-amber-800/50 rounded-lg">
              <Target className="h-6 w-6 text-amber-600 dark:text-amber-400" />
            </div>
            <h3 className="text-xl font-bold text-amber-900 dark:text-amber-100">
              📜 Key Rules & Notes
            </h3>
          </div>
          <div className="grid gap-4">
            {KEY_RULES.map((rule, index) => (
              <div 
                key={index} 
                className="group flex items-start space-x-4 p-4 rounded-lg bg-card/50 border border-border/50 hover:bg-card hover:border-amber-300 dark:hover:border-amber-700 transition-all duration-200 hover:scale-[1.02] hover:shadow-lg"
                style={{
                  animationDelay: `${index * 100}ms`
                }}
              >
                <div className="text-2xl group-hover:scale-110 transition-transform duration-200">
                  {rule.icon}
                </div>
                <div className="flex-1 space-y-1">
                  <h4 className="font-semibold text-foreground text-base group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors duration-200">
                    {rule.title}
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {rule.description}
                  </p>
                </div>
                <CheckCircle className="h-5 w-5 text-green-500 opacity-0 group-hover:opacity-100 transition-all duration-200 transform group-hover:scale-110" />
              </div>
            ))}
          </div>
        </Card>
        
        {/* Must Post Highlights */}
        <Card className="p-6 bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 dark:from-purple-950/20 dark:via-pink-950/20 dark:to-orange-950/20 border-purple-200 dark:border-purple-800 hover-elevate active-elevate-2 transition-all duration-300 animate-in slide-in-from-bottom-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
              <Camera className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-foreground bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              📸 Must-Post Highlights (Instagram Story/Reel)
            </h3>
          </div>
          
          <div className="grid gap-3">
            {MUST_POST_HIGHLIGHTS.map((highlight, index) => (
              <div 
                key={index} 
                className="group flex items-center space-x-4 p-3 rounded-xl bg-white/70 dark:bg-card/50 border border-purple-100 dark:border-purple-800/50 hover:bg-white dark:hover:bg-card hover:border-purple-300 dark:hover:border-purple-600 transition-all duration-200 hover:scale-[1.02] hover:shadow-md"
                style={{
                  animationDelay: `${index * 150 + 300}ms`
                }}
              >
                <div className="text-2xl group-hover:scale-110 transition-transform duration-200 drop-shadow-sm">
                  {highlight.icon}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-foreground group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-200">
                    {highlight.activity}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {highlight.tip}
                  </p>
                </div>
                <Camera className="h-4 w-4 text-purple-500 opacity-0 group-hover:opacity-100 transition-all duration-200 transform group-hover:scale-110" />
              </div>
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-gradient-to-r from-purple-100/50 to-pink-100/50 dark:from-purple-900/30 dark:to-pink-900/30 rounded-lg border border-purple-200/50 dark:border-purple-800/50">
            <p className="text-sm text-muted-foreground italic text-center leading-relaxed">
              💡 <strong>Pro Tip:</strong> Record short 10–20 sec clips of key tasks daily. Your actions, not fancy videos, build trust and motivation in your circle.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}