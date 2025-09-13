import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Trophy, 
  Star, 
  Flame, 
  Target, 
  Zap,
  Crown,
  Medal,
  Award,
  TrendingUp,
  Calendar,
  Clock
} from "lucide-react";
import { useState } from "react";

interface GamificationSystemProps {
  currentDay: number;
  completedActivities: number;
  totalActivities: number;
  currentStreak: number;
}

export function GamificationSystem({ 
  currentDay, 
  completedActivities, 
  totalActivities, 
  currentStreak 
}: GamificationSystemProps) {
  const [selectedTab, setSelectedTab] = useState<'points' | 'badges' | 'achievements'>('points');

  // Mock data - in a real app, this would come from a database
  const totalPoints = currentDay * 10 + completedActivities * 5;
  const level = Math.floor(totalPoints / 100) + 1;
  const pointsToNextLevel = 100 - (totalPoints % 100);
  const levelProgress = (totalPoints % 100) / 100 * 100;

  const badges = [
    {
      id: 'early-bird',
      title: 'Early Bird',
      description: 'Wake up at 5 AM for 7 days straight',
      icon: Clock,
      unlocked: currentStreak >= 7,
      rarity: 'common',
      points: 50,
      progress: Math.min(currentStreak, 7),
      maxProgress: 7
    },
    {
      id: 'discipline-master',
      title: 'Discipline Master',
      description: 'Complete 30 days of the challenge',
      icon: Crown,
      unlocked: currentDay >= 30,
      rarity: 'rare',
      points: 200,
      progress: Math.min(currentDay, 30),
      maxProgress: 30
    },
    {
      id: 'focus-warrior',
      title: 'Focus Warrior',
      description: 'Complete Personal Mastery Hour 10 times',
      icon: Target,
      unlocked: completedActivities >= 10,
      rarity: 'epic',
      points: 150,
      progress: Math.min(completedActivities, 10),
      maxProgress: 10
    },
    {
      id: 'streak-legend',
      title: 'Streak Legend',
      description: 'Maintain a 30-day streak',
      icon: Flame,
      unlocked: currentStreak >= 30,
      rarity: 'legendary',
      points: 500,
      progress: Math.min(currentStreak, 30),
      maxProgress: 30
    },
    {
      id: 'perfect-day',
      title: 'Perfect Day',
      description: 'Complete all activities in a single day',
      icon: Star,
      unlocked: completedActivities === totalActivities,
      rarity: 'epic',
      points: 100,
      progress: completedActivities,
      maxProgress: totalActivities
    },
    {
      id: 'century-club',
      title: 'Century Club',
      description: 'Complete the full 100-day challenge',
      icon: Trophy,
      unlocked: currentDay >= 100,
      rarity: 'legendary',
      points: 1000,
      progress: Math.min(currentDay, 100),
      maxProgress: 100
    }
  ];

  const achievements = [
    {
      id: 'first-steps',
      title: 'First Steps',
      description: 'Complete your first day',
      icon: Award,
      unlocked: currentDay >= 1,
      points: 25
    },
    {
      id: 'week-warrior',
      title: 'Week Warrior',
      description: 'Complete 7 days',
      icon: Medal,
      unlocked: currentDay >= 7,
      points: 75
    },
    {
      id: 'month-master',
      title: 'Month Master',
      description: 'Complete 30 days',
      icon: Crown,
      unlocked: currentDay >= 30,
      points: 300
    },
    {
      id: 'halfway-hero',
      title: 'Halfway Hero',
      description: 'Complete 50 days',
      icon: Trophy,
      unlocked: currentDay >= 50,
      points: 500
    }
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'text-gray-600 bg-gray-100 border-gray-200';
      case 'rare': return 'text-emerald-600 bg-emerald-100 border-emerald-200';
      case 'epic': return 'text-purple-600 bg-purple-100 border-purple-200';
      case 'legendary': return 'text-yellow-600 bg-yellow-100 border-yellow-200';
      default: return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  const getRarityIcon = (rarity: string) => {
    switch (rarity) {
      case 'common': return '⚪';
      case 'rare': return '🔵';
      case 'epic': return '🟣';
      case 'legendary': return '🟡';
      default: return '⚪';
    }
  };

  return (
    <Card className="p-6 bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50 dark:from-yellow-950/20 dark:via-orange-950/20 dark:to-red-950/20 border-yellow-200 dark:border-yellow-800">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg">
          <Trophy className="h-6 w-6 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">
            Gamification Hub
          </h3>
          <p className="text-sm text-muted-foreground">
            Level up your discipline journey
          </p>
        </div>
      </div>

      {/* Level Progress */}
      <div className="mb-6 p-4 bg-white dark:bg-card rounded-lg border border-yellow-200 dark:border-yellow-800">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Crown className="h-5 w-5 text-yellow-500" />
            <span className="font-semibold text-foreground">Level {level}</span>
          </div>
          <div className="text-right">
            <div className="text-sm font-medium text-foreground">{totalPoints} points</div>
            <div className="text-xs text-muted-foreground">
              {pointsToNextLevel} to next level
            </div>
          </div>
        </div>
        <Progress value={levelProgress} className="h-2" />
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-6 bg-muted/50 p-1 rounded-lg">
        {[
          { id: 'points', label: 'Points', icon: Star },
          { id: 'badges', label: 'Badges', icon: Medal },
          { id: 'achievements', label: 'Achievements', icon: Trophy }
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setSelectedTab(tab.id as any)}
              className={`flex-1 flex items-center justify-center space-x-2 py-2 px-3 rounded-md text-sm font-medium transition-all duration-200 ${
                selectedTab === tab.id
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Points Tab */}
      {selectedTab === 'points' && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-white dark:bg-card rounded-lg border border-yellow-200 dark:border-yellow-800">
              <div className="text-2xl font-bold text-yellow-600">{totalPoints}</div>
              <div className="text-sm text-muted-foreground">Total Points</div>
            </div>
            <div className="text-center p-4 bg-white dark:bg-card rounded-lg border border-yellow-200 dark:border-yellow-800">
              <div className="text-2xl font-bold text-orange-600">{level}</div>
              <div className="text-sm text-muted-foreground">Current Level</div>
            </div>
          </div>

          <div className="p-4 bg-white dark:bg-card rounded-lg border border-yellow-200 dark:border-yellow-800">
            <h4 className="font-medium text-foreground mb-3">How to Earn Points</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Complete an activity</span>
                <span className="font-medium text-green-600">+5 points</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Complete a full day</span>
                <span className="font-medium text-green-600">+10 points</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Maintain a streak</span>
                <span className="font-medium text-green-600">+2 points/day</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Unlock a badge</span>
                <span className="font-medium text-green-600">+50-500 points</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Badges Tab */}
      {selectedTab === 'badges' && (
        <div className="space-y-4">
          <div className="grid gap-3">
            {badges.map((badge) => {
              const Icon = badge.icon;
              const progressPercentage = (badge.progress / badge.maxProgress) * 100;
              
              return (
                <div 
                  key={badge.id}
                  className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                    badge.unlocked 
                      ? `${getRarityColor(badge.rarity)} shadow-md` 
                      : 'bg-muted/50 border-border'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${
                      badge.unlocked ? 'bg-current' : 'bg-muted'
                    }`}>
                      <Icon className={`h-5 w-5 ${
                        badge.unlocked ? 'text-white' : 'text-muted-foreground'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className={`font-medium ${
                          badge.unlocked ? 'text-foreground' : 'text-muted-foreground'
                        }`}>
                          {badge.title}
                        </h4>
                        <span className="text-lg">
                          {getRarityIcon(badge.rarity)}
                        </span>
                        {badge.unlocked && (
                          <Badge variant="secondary" className="bg-green-100 text-green-700">
                            Unlocked
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {badge.description}
                      </p>
                      <div className="flex items-center space-x-2">
                        <Progress value={progressPercentage} className="flex-1 h-1" />
                        <span className="text-xs text-muted-foreground">
                          {badge.progress}/{badge.maxProgress}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-yellow-600">
                        +{badge.points}
                      </div>
                      <div className="text-xs text-muted-foreground">points</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Achievements Tab */}
      {selectedTab === 'achievements' && (
        <div className="space-y-4">
          <div className="grid gap-3">
            {achievements.map((achievement) => {
              const Icon = achievement.icon;
              
              return (
                <div 
                  key={achievement.id}
                  className={`p-4 rounded-lg border transition-all duration-200 ${
                    achievement.unlocked 
                      ? 'bg-green-50 border-green-200 shadow-sm' 
                      : 'bg-muted/50 border-border'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${
                      achievement.unlocked ? 'bg-green-500' : 'bg-muted'
                    }`}>
                      <Icon className={`h-5 w-5 ${
                        achievement.unlocked ? 'text-white' : 'text-muted-foreground'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h4 className={`font-medium ${
                          achievement.unlocked ? 'text-foreground' : 'text-muted-foreground'
                        }`}>
                          {achievement.title}
                        </h4>
                        {achievement.unlocked && (
                          <Badge variant="secondary" className="bg-green-100 text-green-700">
                            Earned
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {achievement.description}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-yellow-600">
                        +{achievement.points}
                      </div>
                      <div className="text-xs text-muted-foreground">points</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Motivational Quote */}
      <div className="mt-6 p-4 bg-gradient-to-r from-yellow-100/50 to-orange-100/50 dark:from-yellow-900/30 dark:to-orange-900/30 rounded-lg border border-yellow-200/50 dark:border-yellow-800/50">
        <div className="text-center">
          <h4 className="font-medium text-foreground mb-2">
            Keep Leveling Up! 🚀
          </h4>
          <p className="text-sm text-muted-foreground italic">
            "Every point earned is a step closer to the person you want to become."
          </p>
        </div>
      </div>
    </Card>
  );
}
