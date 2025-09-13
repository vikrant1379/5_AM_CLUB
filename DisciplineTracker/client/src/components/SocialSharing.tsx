import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Camera, 
  Share2, 
  Instagram, 
  CheckCircle2, 
  Sparkles,
  Clock,
  Target
} from "lucide-react";
import { useState } from "react";
import { MUST_POST_HIGHLIGHTS } from "@/data/disciplineSchedule";

interface SocialSharingProps {
  completedActivities: string[];
  currentDay: number;
  onShare: (activity: string, platform: 'instagram' | 'general') => void;
}

export function SocialSharing({ completedActivities, currentDay, onShare }: SocialSharingProps) {
  const [selectedActivity, setSelectedActivity] = useState<string | null>(null);

  const getShareableActivities = () => {
    return MUST_POST_HIGHLIGHTS.filter(highlight => 
      completedActivities.some(activity => 
        activity.toLowerCase().includes(highlight.activity.toLowerCase().split(' ')[0])
      )
    );
  };

  const shareableActivities = getShareableActivities();

  const handleShare = (activity: string, platform: 'instagram' | 'general') => {
    onShare(activity, platform);
    setSelectedActivity(null);
  };

  const getMotivationalMessage = (activity: string) => {
    const messages = {
      "5 AM wake-up": "Rising before the world wakes up! 🌅 Day {day} of discipline and growth. #EarlyRiser #DisciplineJourney",
      "Morning warm-up": "Starting the day with energy and purpose! 💪 20 minutes that set the tone for success. #MorningRoutine #Fitness",
      "Personal Mastery Hour": "Deep work session complete! 🎯 Investing in myself, one hour at a time. #PersonalGrowth #Focus",
      "Evening workout": "Strong body, strong mind! 💪 Evening gains for tomorrow's wins. #Fitness #Discipline",
      "Inspiring quote": "Today's wisdom: \"{quote}\" 📚 Knowledge is power, consistency is key. #Learning #Growth"
    };
    
    return messages[activity as keyof typeof messages]?.replace('{day}', currentDay.toString()) || 
           `Another step forward in my discipline journey! Day ${currentDay} complete. #Discipline #Growth`;
  };

  return (
    <Card className="p-6 bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 dark:from-pink-950/20 dark:via-purple-950/20 dark:to-indigo-950/20 border-pink-200 dark:border-pink-800">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-gradient-to-r from-pink-500 to-purple-500 rounded-lg">
          <Camera className="h-6 w-6 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">
            Share Your Progress
          </h3>
          <p className="text-sm text-muted-foreground">
            Inspire others with your discipline journey
          </p>
        </div>
      </div>

      {shareableActivities.length > 0 ? (
        <div className="space-y-4">
          <div className="flex items-center space-x-2 mb-4">
            <Sparkles className="h-4 w-4 text-pink-500" />
            <span className="text-sm font-medium text-foreground">
              Ready to share ({shareableActivities.length} activities)
            </span>
          </div>

          <div className="grid gap-3">
            {shareableActivities.map((activity, index) => (
              <div 
                key={index}
                className="group flex items-center justify-between p-3 rounded-lg bg-white/70 dark:bg-card/50 border border-pink-100 dark:border-pink-800/50 hover:bg-white dark:hover:bg-card hover:border-pink-300 dark:hover:border-pink-600 transition-all duration-200"
              >
                <div className="flex items-center space-x-3">
                  <div className="text-2xl group-hover:scale-110 transition-transform duration-200">
                    {activity.icon}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-foreground group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors duration-200">
                      {activity.activity}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {activity.tip}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedActivity(activity.activity)}
                    className="h-8 px-3 text-xs border-pink-200 hover:bg-pink-50 hover:border-pink-300"
                  >
                    <Share2 className="h-3 w-3 mr-1" />
                    Share
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Share Buttons */}
          <div className="flex space-x-2 pt-4 border-t border-pink-200 dark:border-pink-800">
            <Button
              variant="outline"
              size="sm"
              className="flex-1 h-10 border-pink-200 hover:bg-pink-50 hover:border-pink-300"
              onClick={() => handleShare("Daily Progress", 'general')}
            >
              <Share2 className="h-4 w-4 mr-2" />
              Quick Share
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex-1 h-10 border-pink-200 hover:bg-pink-50 hover:border-pink-300"
              onClick={() => handleShare("Discipline Journey", 'instagram')}
            >
              <Instagram className="h-4 w-4 mr-2" />
              Instagram
            </Button>
          </div>
        </div>
      ) : (
        <div className="text-center py-8">
          <div className="p-4 bg-muted/50 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <Target className="h-8 w-8 text-muted-foreground" />
          </div>
          <h4 className="font-medium text-foreground mb-2">
            Complete activities to share
          </h4>
          <p className="text-sm text-muted-foreground mb-4">
            Finish your daily tasks to unlock sharing opportunities
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            {MUST_POST_HIGHLIGHTS.slice(0, 3).map((highlight, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {highlight.icon} {highlight.activity}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Share Modal Preview */}
      {selectedActivity && (
        <div className="mt-6 p-4 bg-white dark:bg-card rounded-lg border border-pink-200 dark:border-pink-800">
          <h4 className="font-medium text-foreground mb-3 flex items-center">
            <Camera className="h-4 w-4 mr-2" />
            Share Preview
          </h4>
          <div className="bg-gradient-to-br from-pink-100 to-purple-100 dark:from-pink-900/30 dark:to-purple-900/30 rounded-lg p-4 mb-3">
            <p className="text-sm text-foreground font-medium mb-2">
              {selectedActivity}
            </p>
            <p className="text-xs text-muted-foreground">
              {getMotivationalMessage(selectedActivity)}
            </p>
          </div>
          <div className="flex space-x-2">
            <Button
              size="sm"
              onClick={() => handleShare(selectedActivity, 'instagram')}
              className="flex-1 h-8 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
            >
              <Instagram className="h-3 w-3 mr-1" />
              Post to Instagram
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleShare(selectedActivity, 'general')}
              className="flex-1 h-8"
            >
              <Share2 className="h-3 w-3 mr-1" />
              Share Elsewhere
            </Button>
          </div>
        </div>
      )}

      {/* Pro Tips */}
      <div className="mt-6 p-4 bg-gradient-to-r from-pink-100/50 to-purple-100/50 dark:from-pink-900/30 dark:to-purple-900/30 rounded-lg border border-pink-200/50 dark:border-pink-800/50">
        <div className="flex items-start space-x-2">
          <Sparkles className="h-4 w-4 text-pink-500 mt-0.5 flex-shrink-0" />
          <div className="text-xs text-muted-foreground">
            <p className="font-medium mb-1">Pro Tips for Social Sharing:</p>
            <ul className="space-y-1 text-xs">
              <li>• Record 10-20 second clips for maximum engagement</li>
              <li>• Use consistent hashtags: #DisciplineJourney #100DaysChallenge</li>
              <li>• Share your struggles and victories authentically</li>
              <li>• Tag friends who might benefit from your journey</li>
            </ul>
          </div>
        </div>
      </div>
    </Card>
  );
}
