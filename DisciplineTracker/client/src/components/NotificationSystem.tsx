import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { 
  Bell, 
  BellOff, 
  Clock, 
  Settings, 
  CheckCircle2,
  AlertCircle,
  Zap
} from "lucide-react";
import { useState, useEffect } from "react";
import { DISCIPLINE_SCHEDULE } from "@/data/disciplineSchedule";

interface NotificationSystemProps {
  onNotificationRequest: () => void;
}

export function NotificationSystem({ onNotificationRequest }: NotificationSystemProps) {
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [nextActivity, setNextActivity] = useState<string | null>(null);
  const [timeUntilNext, setTimeUntilNext] = useState<string>('');

  // Check notification permission on mount
  useEffect(() => {
    if ('Notification' in window) {
      setPermissionGranted(Notification.permission === 'granted');
      setNotificationsEnabled(Notification.permission === 'granted');
    }
  }, []);

  // Calculate next activity
  useEffect(() => {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    
    const nextActivityItem = DISCIPLINE_SCHEDULE.find(item => {
      const [startHour] = item.timeRange.split(' – ')[0].split(':').map(Number);
      return startHour > currentHour || (startHour === currentHour && currentMinute < 5);
    });

    if (nextActivityItem) {
      setNextActivity(nextActivityItem.activity);
      
      // Calculate time until next activity
      const nextTime = new Date();
      const [nextHour] = nextActivityItem.timeRange.split(' – ')[0].split(':').map(Number);
      nextTime.setHours(nextHour, 0, 0, 0);
      
      const timeDiff = nextTime.getTime() - now.getTime();
      const hours = Math.floor(timeDiff / (1000 * 60 * 60));
      const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
      
      if (hours > 0) {
        setTimeUntilNext(`${hours}h ${minutes}m`);
      } else {
        setTimeUntilNext(`${minutes}m`);
      }
    }
  }, []);

  const requestNotificationPermission = async () => {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      setPermissionGranted(permission === 'granted');
      setNotificationsEnabled(permission === 'granted');
      
      if (permission === 'granted') {
        onNotificationRequest();
      }
    }
  };

  const sendTestNotification = () => {
    if (permissionGranted) {
      new Notification('Discipline Tracker', {
        body: 'Test notification! Your discipline journey is ready to begin.',
        icon: '/favicon.ico',
        tag: 'discipline-tracker-test'
      });
    }
  };

  const notificationSettings = [
    {
      title: "Activity Reminders",
      description: "Get notified 5 minutes before each scheduled activity",
      enabled: true,
      icon: Clock
    },
    {
      title: "Motivation Boost",
      description: "Receive daily motivational quotes and tips",
      enabled: true,
      icon: Zap
    },
    {
      title: "Streak Alerts",
      description: "Celebrate your progress and maintain streaks",
      enabled: true,
      icon: CheckCircle2
    },
    {
      title: "Missed Activity",
      description: "Gentle reminders if you miss a scheduled activity",
      enabled: false,
      icon: AlertCircle
    }
  ];

  return (
    <Card className="p-6 bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 dark:from-emerald-950/20 dark:via-green-950/20 dark:to-teal-950/20 border-emerald-200 dark:border-emerald-800">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-gradient-to-r from-emerald-500 to-green-500 rounded-lg">
          <Bell className="h-6 w-6 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">
            Smart Notifications
          </h3>
          <p className="text-sm text-muted-foreground">
            Stay on track with intelligent reminders
          </p>
        </div>
      </div>

      {/* Permission Status */}
      <div className="mb-6">
        {!permissionGranted ? (
          <div className="p-4 bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-800 rounded-lg">
            <div className="flex items-center space-x-3">
              <AlertCircle className="h-5 w-5 text-orange-500" />
              <div className="flex-1">
                <h4 className="font-medium text-foreground">Enable Notifications</h4>
                <p className="text-sm text-muted-foreground">
                  Allow notifications to get timely reminders for your activities
                </p>
              </div>
              <Button
                size="sm"
                onClick={requestNotificationPermission}
                className="bg-orange-500 hover:bg-orange-600"
              >
                Enable
              </Button>
            </div>
          </div>
        ) : (
          <div className="p-4 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg">
            <div className="flex items-center space-x-3">
              <CheckCircle2 className="h-5 w-5 text-green-500" />
              <div className="flex-1">
                <h4 className="font-medium text-foreground">Notifications Enabled</h4>
                <p className="text-sm text-muted-foreground">
                  You'll receive timely reminders for your activities
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={sendTestNotification}
                className="border-green-200 hover:bg-green-50"
              >
                Test
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Next Activity */}
      {nextActivity && (
        <div className="mb-6 p-4 bg-white dark:bg-card rounded-lg border border-emerald-200 dark:border-emerald-800">
          <div className="flex items-center space-x-3">
            <Clock className="h-5 w-5 text-emerald-500" />
            <div className="flex-1">
              <h4 className="font-medium text-foreground">Next Activity</h4>
              <p className="text-sm text-muted-foreground">{nextActivity}</p>
            </div>
            <Badge variant="outline" className="text-emerald-600 border-emerald-200">
              {timeUntilNext}
            </Badge>
          </div>
        </div>
      )}

      {/* Notification Settings */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Settings className="h-4 w-4 text-muted-foreground" />
          <h4 className="font-medium text-foreground">Notification Settings</h4>
        </div>
        
        {notificationSettings.map((setting, index) => {
          const Icon = setting.icon;
          return (
            <div 
              key={index}
              className="flex items-center justify-between p-3 rounded-lg bg-white/70 dark:bg-card/50 border border-emerald-100 dark:border-emerald-800/50"
            >
              <div className="flex items-center space-x-3">
                <Icon className="h-4 w-4 text-emerald-500" />
                <div>
                  <h5 className="font-medium text-foreground text-sm">
                    {setting.title}
                  </h5>
                  <p className="text-xs text-muted-foreground">
                    {setting.description}
                  </p>
                </div>
              </div>
              <Switch
                checked={setting.enabled && notificationsEnabled}
                disabled={!notificationsEnabled}
                onCheckedChange={(checked) => {
                  // In a real app, this would update user preferences
                  console.log(`${setting.title} notifications: ${checked}`);
                }}
              />
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="mt-6 flex space-x-2">
        <Button
          variant="outline"
          size="sm"
          className="flex-1 h-9 border-emerald-200 hover:bg-emerald-50"
          onClick={() => {
            // In a real app, this would open notification settings
            console.log('Opening notification settings');
          }}
        >
          <Settings className="h-3 w-3 mr-1" />
          Settings
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="flex-1 h-9 border-emerald-200 hover:bg-emerald-50"
          onClick={() => {
            // In a real app, this would schedule all notifications
            console.log('Scheduling all notifications');
          }}
        >
          <Bell className="h-3 w-3 mr-1" />
          Schedule All
        </Button>
      </div>

      {/* Pro Tips */}
      <div className="mt-6 p-4 bg-gradient-to-r from-emerald-100/50 to-green-100/50 dark:from-emerald-900/30 dark:to-green-900/30 rounded-lg border border-emerald-200/50 dark:border-emerald-800/50">
        <div className="flex items-start space-x-2">
          <Zap className="h-4 w-4 text-emerald-500 mt-0.5 flex-shrink-0" />
          <div className="text-xs text-muted-foreground">
            <p className="font-medium mb-1">Smart Notification Tips:</p>
            <ul className="space-y-1 text-xs">
              <li>• Notifications are sent 5 minutes before each activity</li>
              <li>• You can customize timing in your device settings</li>
              <li>• Notifications work even when the app is closed</li>
              <li>• Use "Do Not Disturb" mode during sleep hours</li>
            </ul>
          </div>
        </div>
      </div>
    </Card>
  );
}
