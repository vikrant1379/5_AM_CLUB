import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Settings, 
  Clock, 
  Bell, 
  Palette, 
  User,
  Moon,
  Sun,
  Zap,
  Target
} from "lucide-react";
import { useState } from "react";

interface PersonalizationSettingsProps {
  onSettingsChange: (settings: any) => void;
}

export function PersonalizationSettings({ onSettingsChange }: PersonalizationSettingsProps) {
  const [settings, setSettings] = useState({
    // Schedule customization
    wakeUpTime: '5:00',
    sleepTime: '23:00',
    workStartTime: '9:00',
    workEndTime: '17:00',
    
    // Notification preferences
    reminderTime: '5', // minutes before
    enableMotivationalQuotes: true,
    enableStreakAlerts: true,
    enableMissedActivityReminders: false,
    
    // Theme preferences
    theme: 'system', // light, dark, system
    accentColor: 'blue',
    compactMode: false,
    
    // Personal preferences
    name: '',
    timezone: 'UTC',
    language: 'en',
    
    // Challenge preferences
    challengeDuration: 100,
    enableGamification: true,
    enableSocialSharing: true,
    enableProgressTracking: true
  });

  const handleSettingChange = (key: string, value: any) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    onSettingsChange(newSettings);
  };

  const timeOptions = Array.from({ length: 24 }, (_, i) => {
    const hour = i.toString().padStart(2, '0');
    return { value: `${hour}:00`, label: `${hour}:00` };
  });

  const accentColors = [
    { value: 'emerald', label: 'Emerald', color: 'bg-emerald-500' },
    { value: 'green', label: 'Green', color: 'bg-green-500' },
    { value: 'purple', label: 'Purple', color: 'bg-purple-500' },
    { value: 'orange', label: 'Orange', color: 'bg-orange-500' },
    { value: 'pink', label: 'Pink', color: 'bg-pink-500' },
    { value: 'red', label: 'Red', color: 'bg-red-500' }
  ];

  const timezones = [
    { value: 'UTC', label: 'UTC (Coordinated Universal Time)' },
    { value: 'America/New_York', label: 'Eastern Time (ET)' },
    { value: 'America/Chicago', label: 'Central Time (CT)' },
    { value: 'America/Denver', label: 'Mountain Time (MT)' },
    { value: 'America/Los_Angeles', label: 'Pacific Time (PT)' },
    { value: 'Europe/London', label: 'Greenwich Mean Time (GMT)' },
    { value: 'Europe/Paris', label: 'Central European Time (CET)' },
    { value: 'Asia/Tokyo', label: 'Japan Standard Time (JST)' },
    { value: 'Asia/Shanghai', label: 'China Standard Time (CST)' },
    { value: 'Australia/Sydney', label: 'Australian Eastern Time (AET)' }
  ];

  return (
    <Card className="p-6 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-indigo-950/20 dark:via-purple-950/20 dark:to-pink-950/20 border-indigo-200 dark:border-indigo-800">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg">
          <Settings className="h-6 w-6 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">
            Personalization Settings
          </h3>
          <p className="text-sm text-muted-foreground">
            Customize your discipline journey
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Schedule Customization */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4 text-indigo-500" />
            <h4 className="font-medium text-foreground">Schedule Customization</h4>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="wakeUpTime" className="text-sm">Wake Up Time</Label>
              <Select value={settings.wakeUpTime} onValueChange={(value) => handleSettingChange('wakeUpTime', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {timeOptions.slice(4, 8).map((time) => (
                    <SelectItem key={time.value} value={time.value}>
                      {time.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="sleepTime" className="text-sm">Sleep Time</Label>
              <Select value={settings.sleepTime} onValueChange={(value) => handleSettingChange('sleepTime', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {timeOptions.slice(20, 24).map((time) => (
                    <SelectItem key={time.value} value={time.value}>
                      {time.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Notification Preferences */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Bell className="h-4 w-4 text-indigo-500" />
            <h4 className="font-medium text-foreground">Notification Preferences</h4>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-lg bg-white/70 dark:bg-card/50 border border-indigo-100 dark:border-indigo-800/50">
              <div>
                <Label className="font-medium text-foreground">Reminder Time</Label>
                <p className="text-sm text-muted-foreground">Minutes before each activity</p>
              </div>
              <Select value={settings.reminderTime} onValueChange={(value) => handleSettingChange('reminderTime', value)}>
                <SelectTrigger className="w-20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {['1', '5', '10', '15', '30'].map((minutes) => (
                    <SelectItem key={minutes} value={minutes}>
                      {minutes}m
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {[
              { key: 'enableMotivationalQuotes', label: 'Motivational Quotes', description: 'Daily inspirational messages' },
              { key: 'enableStreakAlerts', label: 'Streak Alerts', description: 'Celebrate your progress' },
              { key: 'enableMissedActivityReminders', label: 'Missed Activity Reminders', description: 'Gentle reminders for missed tasks' }
            ].map((setting) => (
              <div key={setting.key} className="flex items-center justify-between p-3 rounded-lg bg-white/70 dark:bg-card/50 border border-indigo-100 dark:border-indigo-800/50">
                <div>
                  <Label className="font-medium text-foreground">{setting.label}</Label>
                  <p className="text-sm text-muted-foreground">{setting.description}</p>
                </div>
                <Switch
                  checked={settings[setting.key as keyof typeof settings] as boolean}
                  onCheckedChange={(checked) => handleSettingChange(setting.key, checked)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Theme Preferences */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Palette className="h-4 w-4 text-indigo-500" />
            <h4 className="font-medium text-foreground">Theme Preferences</h4>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-lg bg-white/70 dark:bg-card/50 border border-indigo-100 dark:border-indigo-800/50">
              <div>
                <Label className="font-medium text-foreground">Theme</Label>
                <p className="text-sm text-muted-foreground">Choose your preferred theme</p>
              </div>
              <Select value={settings.theme} onValueChange={(value) => handleSettingChange('theme', value)}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">
                    <div className="flex items-center space-x-2">
                      <Sun className="h-4 w-4" />
                      <span>Light</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="dark">
                    <div className="flex items-center space-x-2">
                      <Moon className="h-4 w-4" />
                      <span>Dark</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="system">
                    <div className="flex items-center space-x-2">
                      <Settings className="h-4 w-4" />
                      <span>System</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-white/70 dark:bg-card/50 border border-indigo-100 dark:border-indigo-800/50">
              <div>
                <Label className="font-medium text-foreground">Accent Color</Label>
                <p className="text-sm text-muted-foreground">Choose your accent color</p>
              </div>
              <div className="flex space-x-2">
                {accentColors.map((color) => (
                  <button
                    key={color.value}
                    onClick={() => handleSettingChange('accentColor', color.value)}
                    className={`w-8 h-8 rounded-full ${color.color} border-2 ${
                      settings.accentColor === color.value ? 'border-foreground' : 'border-transparent'
                    } hover:scale-110 transition-transform duration-200`}
                    title={color.label}
                  />
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-white/70 dark:bg-card/50 border border-indigo-100 dark:border-indigo-800/50">
              <div>
                <Label className="font-medium text-foreground">Compact Mode</Label>
                <p className="text-sm text-muted-foreground">Use smaller spacing and text</p>
              </div>
              <Switch
                checked={settings.compactMode}
                onCheckedChange={(checked) => handleSettingChange('compactMode', checked)}
              />
            </div>
          </div>
        </div>

        {/* Personal Information */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <User className="h-4 w-4 text-indigo-500" />
            <h4 className="font-medium text-foreground">Personal Information</h4>
          </div>
          
          <div className="space-y-3">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm">Name (Optional)</Label>
              <Input
                id="name"
                value={settings.name}
                onChange={(e) => handleSettingChange('name', e.target.value)}
                placeholder="Enter your name"
                className="bg-white/70 dark:bg-card/50"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="timezone" className="text-sm">Timezone</Label>
              <Select value={settings.timezone} onValueChange={(value) => handleSettingChange('timezone', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {timezones.map((tz) => (
                    <SelectItem key={tz.value} value={tz.value}>
                      {tz.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Challenge Preferences */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Target className="h-4 w-4 text-indigo-500" />
            <h4 className="font-medium text-foreground">Challenge Preferences</h4>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-lg bg-white/70 dark:bg-card/50 border border-indigo-100 dark:border-indigo-800/50">
              <div>
                <Label className="font-medium text-foreground">Challenge Duration</Label>
                <p className="text-sm text-muted-foreground">Number of days for your challenge</p>
              </div>
              <Select value={settings.challengeDuration.toString()} onValueChange={(value) => handleSettingChange('challengeDuration', parseInt(value))}>
                <SelectTrigger className="w-20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[30, 60, 90, 100, 365].map((days) => (
                    <SelectItem key={days} value={days.toString()}>
                      {days} days
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {[
              { key: 'enableGamification', label: 'Gamification', description: 'Points, badges, and achievements' },
              { key: 'enableSocialSharing', label: 'Social Sharing', description: 'Share progress on social media' },
              { key: 'enableProgressTracking', label: 'Progress Tracking', description: 'Detailed analytics and insights' }
            ].map((setting) => (
              <div key={setting.key} className="flex items-center justify-between p-3 rounded-lg bg-white/70 dark:bg-card/50 border border-indigo-100 dark:border-indigo-800/50">
                <div>
                  <Label className="font-medium text-foreground">{setting.label}</Label>
                  <p className="text-sm text-muted-foreground">{setting.description}</p>
                </div>
                <Switch
                  checked={settings[setting.key as keyof typeof settings] as boolean}
                  onCheckedChange={(checked) => handleSettingChange(setting.key, checked)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Save Button */}
        <div className="pt-4 border-t border-indigo-200 dark:border-indigo-800">
          <Button 
            className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600"
            onClick={() => {
              console.log('Settings saved:', settings);
              // In a real app, this would save to a database
            }}
          >
            <Zap className="h-4 w-4 mr-2" />
            Save Settings
          </Button>
        </div>
      </div>
    </Card>
  );
}
