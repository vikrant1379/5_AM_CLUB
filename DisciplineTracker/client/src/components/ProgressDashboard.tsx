import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Trophy, 
  Target, 
  Flame, 
  Clock, 
  CheckCircle2, 
  TrendingUp,
  Calendar,
  Zap
} from "lucide-react";
import { DISCIPLINE_SCHEDULE } from "@/data/disciplineSchedule";
import { SocialSharing } from "./SocialSharing";
import { NotificationSystem } from "./NotificationSystem";
import { GamificationSystem } from "./GamificationSystem";
import { PersonalizationSettings } from "./PersonalizationSettings";

interface ProgressDashboardProps {
  currentDay: number;
}

export function ProgressDashboard({ currentDay }: ProgressDashboardProps) {
  // Mock data - in a real app, this would come from a database
  const totalDays = 100;
  const completedDays = Math.min(currentDay - 1, 0); // Adjust based on actual completion
  const currentStreak = Math.min(currentDay, 7); // Mock streak
  const totalActivities = DISCIPLINE_SCHEDULE.length;
  const completedToday = Math.floor(Math.random() * 5); // Mock today's completion
  
  const todayProgress = (completedToday / totalActivities) * 100;
  const overallProgress = (completedDays / totalDays) * 100;

  const stats = [
    {
      title: "Current Streak",
      value: `${currentStreak} days`,
      icon: Flame,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200"
    },
    {
      title: "Today's Progress",
      value: `${Math.round(todayProgress)}%`,
      icon: Target,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
      borderColor: "border-emerald-200"
    },
    {
      title: "Overall Progress",
      value: `${Math.round(overallProgress)}%`,
      icon: TrendingUp,
      color: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200"
    },
    {
      title: "Days Completed",
      value: `${completedDays}/${totalDays}`,
      icon: Calendar,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200"
    }
  ];

  const achievements = [
    {
      title: "Early Bird",
      description: "Wake up at 5 AM for 7 days straight",
      icon: Clock,
      unlocked: currentStreak >= 7,
      color: "text-yellow-600"
    },
    {
      title: "Discipline Master",
      description: "Complete 30 days of the challenge",
      icon: Trophy,
      unlocked: completedDays >= 30,
      color: "text-gold-600"
    },
    {
      title: "Focus Warrior",
      description: "Complete Personal Mastery Hour 10 times",
      icon: Zap,
      unlocked: completedToday >= 3,
      color: "text-emerald-600"
    }
  ];

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="text-center py-4">
        <h1 className="text-2xl font-bold text-foreground mb-2">
          Your Progress
        </h1>
        <p className="text-muted-foreground">
          Day {currentDay} of your discipline journey
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card 
              key={stat.title}
              className={`p-4 ${stat.bgColor} ${stat.borderColor} border-2 hover:shadow-md transition-all duration-200`}
            >
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <Icon className={`h-5 w-5 ${stat.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-muted-foreground truncate">
                    {stat.title}
                  </p>
                  <p className={`text-lg font-bold ${stat.color}`}>
                    {stat.value}
                  </p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Today's Progress */}
      <Card className="p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2 bg-amber-200 dark:bg-amber-800/50 rounded-lg">
            <Target className="h-6 w-6 text-amber-600 dark:text-amber-400" />
          </div>
          <h3 className="text-lg font-semibold text-foreground">
            Today's Activities
          </h3>
        </div>
        
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-medium">{completedToday}/{totalActivities} completed</span>
          </div>
          <Progress value={todayProgress} className="h-2" />
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {DISCIPLINE_SCHEDULE.slice(0, 6).map((activity, index) => (
            <div 
              key={index}
              className="flex items-center space-x-2"
            >
              <CheckCircle2 
                className={`h-4 w-4 ${
                  index < completedToday 
                    ? "text-green-500" 
                    : "text-muted-foreground"
                }`} 
              />
              <span className="text-xs text-muted-foreground truncate max-w-20">
                {activity.time}
              </span>
            </div>
          ))}
        </div>
      </Card>

      {/* Achievements */}
      <Card className="p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg">
            <Trophy className="h-6 w-6 text-white" />
          </div>
          <h3 className="text-lg font-semibold text-foreground">
            Achievements
          </h3>
        </div>
        
        <div className="space-y-3">
          {achievements.map((achievement, index) => {
            const Icon = achievement.icon;
            return (
              <div 
                key={index}
                className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 ${
                  achievement.unlocked 
                    ? "bg-green-50 border border-green-200" 
                    : "bg-muted/50 border border-border"
                }`}
              >
                <Icon 
                  className={`h-5 w-5 ${
                    achievement.unlocked 
                      ? achievement.color 
                      : "text-muted-foreground"
                  }`} 
                />
                <div className="flex-1">
                  <h4 className={`font-medium ${
                    achievement.unlocked 
                      ? "text-foreground" 
                      : "text-muted-foreground"
                  }`}>
                    {achievement.title}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {achievement.description}
                  </p>
                </div>
                {achievement.unlocked && (
                  <Badge variant="secondary" className="bg-green-100 text-green-700">
                    Unlocked
                  </Badge>
                )}
              </div>
            );
          })}
        </div>
      </Card>

      {/* Gamification System */}
      <GamificationSystem
        currentDay={currentDay}
        completedActivities={completedToday}
        totalActivities={totalActivities}
        currentStreak={currentStreak}
      />

      {/* Social Sharing */}
      <SocialSharing
        completedActivities={DISCIPLINE_SCHEDULE.slice(0, completedToday).map(a => a.activity)}
        currentDay={currentDay}
        onShare={(activity, platform) => {
          console.log(`Sharing ${activity} on ${platform}`);
          // In a real app, this would handle the actual sharing
        }}
      />

      {/* Notification System */}
      <NotificationSystem
        onNotificationRequest={() => {
          console.log('Notification permission requested');
          // In a real app, this would handle notification setup
        }}
      />

      {/* Personalization Settings */}
      <PersonalizationSettings
        onSettingsChange={(settings) => {
          console.log('Settings updated:', settings);
          // In a real app, this would save to a database
        }}
      />

      {/* Motivational Quote */}
      <Card className="p-6 bg-gradient-to-br from-amber-100/50 via-orange-50/30 to-yellow-50/20 dark:from-amber-900/30 dark:via-orange-900/20 dark:to-yellow-900/10 border-amber-300 dark:border-amber-700/50">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Keep Going! 💪
          </h3>
          <p className="text-muted-foreground italic">
            "Discipline is choosing between what you want now and what you want most."
          </p>
        </div>
      </Card>
    </div>
  );
}
