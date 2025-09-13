// Real discipline schedule data from the 100 Days Challenge framework
export interface ScheduleItem {
  time: string;
  timeRange: string;
  activity: string;
  psychologicalImpact: string;
  category: 'morning' | 'work' | 'evening';
  isHighlight?: boolean;
}

export const DISCIPLINE_SCHEDULE: ScheduleItem[] = [
  // 🌅 Win the Morning, Win the Day
  {
    time: "5:00 AM",
    timeRange: "5:00 AM – 5:10 AM",
    activity: "Wake up, gratitude, make bed",
    psychologicalImpact: "Positivity & order",
    category: "morning",
    isHighlight: true
  },
  {
    time: "5:10 AM", 
    timeRange: "5:10 AM – 5:25 AM",
    activity: "Splash water on face, drink at least one glass of lukewarm water; optional little instant coffee",
    psychologicalImpact: "Cleanse body & mind",
    category: "morning"
  },
  {
    time: "5:25 AM",
    timeRange: "5:25 AM – 5:45 AM", 
    activity: "20-min warmup exercise",
    psychologicalImpact: "Pump blood, energy boost",
    category: "morning",
    isHighlight: true
  },
  {
    time: "5:45 AM",
    timeRange: "5:45 AM – 6:00 AM",
    activity: "Diary/journaling (make a plan for the day)",
    psychologicalImpact: "Mental clarity & reflection",
    category: "morning"
  },
  {
    time: "6:00 AM",
    timeRange: "6:00 AM – 7:30 AM",
    activity: "Personal Mastery Hour (deep focus) 🚀",
    psychologicalImpact: "Main growth block/Learning time",
    category: "morning",
    isHighlight: true
  },
  {
    time: "7:30 AM",
    timeRange: "7:30 AM – 8:00 AM",
    activity: "Brush, washroom, shower",
    psychologicalImpact: "Fresh & reset",
    category: "morning"
  },
  {
    time: "8:00 AM",
    timeRange: "8:00 AM – 8:15 AM",
    activity: "Prayer/meditation/yoga\n/manifestation",
    psychologicalImpact: "Inner peace & focus",
    category: "morning"
  },
  {
    time: "8:15 AM",
    timeRange: "8:15 AM – 8:30 AM",
    activity: "Light breakfast / pack up",
    psychologicalImpact: "Fuel for commute",
    category: "morning"
  },
  {
    time: "8:30 AM",
    timeRange: "8:30 AM – 9:00 AM",
    activity: "Commute – non-fiction audiobook/reading",
    psychologicalImpact: "Focused learning on the go",
    category: "morning"
  },
  
  // Work/College Time
  {
    time: "9:00 AM",
    timeRange: "9:00 AM – 5:00 PM",
    activity: "Office/college work",
    psychologicalImpact: "Primary duties",
    category: "work"
  },
  
  // 🌙 Strong Evenings, Strong Growth
  {
    time: "5:00 PM",
    timeRange: "5:00 PM – 5:30 PM",
    activity: "Commute back home",
    psychologicalImpact: "Recharge & transition",
    category: "evening"
  },
  {
    time: "6:00 PM",
    timeRange: "6:00 PM – 7:00 PM",
    activity: "Gym/workout (choose your pre-/post-workout protein & diet)",
    psychologicalImpact: "Physical fitness & strength",
    category: "evening",
    isHighlight: true
  },
  {
    time: "7:00 PM",
    timeRange: "7:00 PM – 7:30 PM",
    activity: "Refresh & reset",
    psychologicalImpact: "Light recovery",
    category: "evening"
  },
  {
    time: "7:30 PM",
    timeRange: "7:30 PM – 9:30 PM",
    activity: "Upload a small clip on Insta story/reel, Family time + dinner",
    psychologicalImpact: "Bonding & recovery",
    category: "evening"
  },
  {
    time: "9:30 PM",
    timeRange: "9:30 PM – 10:30 PM",
    activity: "Personal Mastery Hour, or finish any leftover office/college work",
    psychologicalImpact: "Learning time/clear any pending tasks",
    category: "evening",
    isHighlight: true
  },
  {
    time: "10:30 PM",
    timeRange: "10:30 PM – 11:00 PM",
    activity: "Read a few pages of a non-fiction book, prepare for sleep",
    psychologicalImpact: "Calm mind & readiness",
    category: "evening"
  },
  {
    time: "11:00 PM",
    timeRange: "11:00 PM",
    activity: "Sleep",
    psychologicalImpact: "Recovery & reset",
    category: "evening",
    isHighlight: true
  }
];

export const KEY_RULES = [
  {
    icon: "💧",
    title: "Hydration Rule",
    description: "Drink water after exercise and keep hydrated throughout the day"
  },
  {
    icon: "📵",
    title: "Morning Focus Rule",
    description: "No social media or entertainment (songs, reels, etc.) from 10 PM to 9 AM – stay distraction-free"
  },
  {
    icon: "🎯",
    title: "Mindful Learning",
    description: "If using YouTube or other platforms for learning, avoid reels or unrelated videos to maintain focus"
  },
  {
    icon: "🏃‍♂️",
    title: "Morning Priority",
    description: "20-minute quick exercise, with Personal Mastery Hour deep work as the main priority; heavy workouts are reserved for the evening"
  },
  {
    icon: "😴",
    title: "Sleep Schedule",
    description: "Be asleep by 11:00 PM sharp for optimal recovery and brain function"
  }
];

export const MUST_POST_HIGHLIGHTS = [
  {
    icon: "🌅",
    activity: "5 AM wake-up",
    tip: "Show your early morning dedication"
  },
  {
    icon: "🏃‍♂️",
    activity: "Morning warm-up",
    tip: "Capture your morning energy boost"
  },
  {
    icon: "🎯",
    activity: "Personal Mastery Hour/learning session",
    tip: "Share your growth mindset"
  },
  {
    icon: "💪",
    activity: "Evening workout",
    tip: "Showcase your strength building"
  },
  {
    icon: "📚",
    activity: "Inspiring quote or thought from non-fiction reading",
    tip: "Motivate others with wisdom"
  }
];