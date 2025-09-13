import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Clock, 
  Target, 
  Zap, 
  BookOpen,
  Calendar,
  CheckCircle2
} from "lucide-react";
import { DISCIPLINE_SCHEDULE, KEY_RULES, MUST_POST_HIGHLIGHTS } from "@/data/disciplineSchedule";
import { ArticleViewer } from "@/components/ArticleViewer";

// Utility function to remove AM/PM from time format
function removeAmPm(timeString: string): string {
  return timeString.replace(/\s*(AM|PM)/gi, '');
}

export function QuickReference() {
  const morningActivities = DISCIPLINE_SCHEDULE.filter(item => item.category === 'morning');
  const eveningActivities = DISCIPLINE_SCHEDULE.filter(item => item.category === 'evening');

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="text-center py-4">
        <h1 className="text-2xl font-bold text-foreground mb-2 flex items-center justify-center space-x-2">
          <BookOpen className="h-6 w-6 text-amber-600 dark:text-amber-400" />
          <span>Quick Reference</span>
        </h1>
        <p className="text-muted-foreground">
          Your daily discipline guide at a glance
        </p>
      </div>

      {/* Morning Routine */}
      <Card className="p-6 bg-gradient-to-br from-orange-50 via-yellow-50 to-amber-50 dark:from-orange-950/20 dark:via-yellow-950/20 dark:to-amber-950/20 border-orange-200 dark:border-orange-800">
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-lg">
            <Clock className="h-6 w-6 text-white" />
          </div>
          <h2 className="text-xl font-bold text-foreground">🌅 Morning Routine</h2>
        </div>
        
        <div className="space-y-3">
          {morningActivities.map((activity, index) => (
            <div key={index} className="flex items-center space-x-3 p-3 rounded-lg bg-white/70 dark:bg-card/50 border border-orange-100 dark:border-orange-800/50">
              <div className="text-sm font-mono text-orange-600 w-32 flex-shrink-0 text-center whitespace-nowrap">
                {removeAmPm(activity.timeRange)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-foreground text-sm leading-tight">
                  {activity.activity}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {activity.psychologicalImpact}
                </p>
              </div>
              {activity.isHighlight && (
                <Badge variant="outline" className="text-orange-600 border-orange-200 text-xs">
                  Key
                </Badge>
              )}
            </div>
          ))}
        </div>
      </Card>

      {/* Evening Routine */}
      <Card className="p-6 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-indigo-950/20 dark:via-purple-950/20 dark:to-pink-950/20 border-indigo-200 dark:border-indigo-800">
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg">
            <Target className="h-6 w-6 text-white" />
          </div>
          <h2 className="text-xl font-bold text-foreground">🌙 Evening Routine</h2>
        </div>
        
        <div className="space-y-3">
          {eveningActivities.map((activity, index) => (
            <div key={index} className="flex items-center space-x-3 p-3 rounded-lg bg-white/70 dark:bg-card/50 border border-indigo-100 dark:border-indigo-800/50">
              <div className="text-sm font-mono text-indigo-600 w-32 flex-shrink-0 text-center whitespace-nowrap">
                {removeAmPm(activity.timeRange)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-foreground text-sm leading-tight">
                  {activity.activity}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {activity.psychologicalImpact}
                </p>
              </div>
              {activity.isHighlight && (
                <Badge variant="outline" className="text-indigo-600 border-indigo-200 text-xs">
                  Key
                </Badge>
              )}
            </div>
          ))}
        </div>
      </Card>

      {/* Key Rules */}
      <Card className="p-6 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-green-950/20 dark:via-emerald-950/20 dark:to-teal-950/20 border-green-200 dark:border-green-800">
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg">
            <Zap className="h-6 w-6 text-white" />
          </div>
          <h2 className="text-xl font-bold text-foreground">📜 Key Rules</h2>
        </div>
        
        <div className="space-y-3">
          {KEY_RULES.map((rule, index) => (
            <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-white/70 dark:bg-card/50 border border-green-100 dark:border-green-800/50">
              <div className="text-2xl flex-shrink-0 w-8 h-8 flex items-center justify-center">
                {rule.icon}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-foreground text-sm mb-1">
                  {rule.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {rule.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Daily Checklist */}
      <Card className="p-6 bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 dark:from-emerald-950/20 dark:via-green-950/20 dark:to-teal-950/20 border-emerald-200 dark:border-emerald-800">
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2 bg-gradient-to-r from-emerald-500 to-green-500 rounded-lg">
            <CheckCircle2 className="h-6 w-6 text-white" />
          </div>
          <h2 className="text-xl font-bold text-foreground">✅ Daily Checklist</h2>
        </div>
        
        <div className="grid grid-cols-1 gap-2">
          {MUST_POST_HIGHLIGHTS.map((highlight, index) => (
            <div key={index} className="flex items-center space-x-3 p-2 rounded-lg bg-white/70 dark:bg-card/50 border border-emerald-100 dark:border-emerald-800/50">
              <div className="text-lg flex-shrink-0 w-8 h-8 flex items-center justify-center">
                {highlight.icon}
              </div>
              <div className="flex-1">
                <p className="font-medium text-foreground text-sm">
                  {highlight.activity}
                </p>
                <p className="text-xs text-muted-foreground">
                  {highlight.tip}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Quick Tips */}
      <Card className="p-6 bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 dark:from-purple-950/20 dark:via-pink-950/20 dark:to-rose-950/20 border-purple-200 dark:border-purple-800">
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
            <Calendar className="h-6 w-6 text-white" />
          </div>
          <h2 className="text-xl font-bold text-foreground">💡 Quick Tips</h2>
        </div>
        
        <div className="space-y-3 text-sm">
          <div className="flex items-start space-x-3">
            <span className="text-purple-600 font-bold flex-shrink-0 w-4 h-4 flex items-center justify-center">•</span>
            <p className="text-muted-foreground flex-1">Start with just 3 days to build momentum</p>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-purple-600 font-bold flex-shrink-0 w-4 h-4 flex items-center justify-center">•</span>
            <p className="text-muted-foreground flex-1">Focus on the morning routine first - it sets the tone</p>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-purple-600 font-bold flex-shrink-0 w-4 h-4 flex items-center justify-center">•</span>
            <p className="text-muted-foreground flex-1">Personal Mastery Hour is your growth engine</p>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-purple-600 font-bold flex-shrink-0 w-4 h-4 flex items-center justify-center">•</span>
            <p className="text-muted-foreground flex-1">Evening workouts help you sleep better</p>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-purple-600 font-bold flex-shrink-0 w-4 h-4 flex items-center justify-center">•</span>
            <p className="text-muted-foreground flex-1">Consistency beats perfection every time</p>
          </div>
        </div>
      </Card>

      {/* Morning Routine Research Article */}
      <ArticleViewer
        title="Ultimate Guide to Morning Routines for Peak Productivity"
        url="https://www.upskillist.com/blog/ultimate-guide-to-morning-routines-for-peak-productivity/"
        description="Expert insights and research-backed strategies to enhance your morning routine and boost daily productivity."
      />
    </div>
  );
}
