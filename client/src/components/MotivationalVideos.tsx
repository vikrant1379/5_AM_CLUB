import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Play, Clock, BookOpen } from "lucide-react";

interface VideoData {
  id: string;
  title: string;
  duration: string;
  theme: string;
  embedId: string;
}

export function MotivationalVideos() {
  const motivationalVideos: VideoData[] = [
    {
      id: "1",
      title: "DISCIPLINE YOURSELF - The Power of Self Control",
      duration: "8 min",
      theme: "Self-Discipline",
      embedId: "DG-oAF1i_UA"
    },
    {
      id: "2", 
      title: "TURN YOURSELF INTO A MONSTER - David Goggins",
      duration: "12 min",
      theme: "Mental Toughness",
      embedId: "5tSTk1083VY"
    },
    {
      id: "3",
      title: "UNSTOPPABLE - Jocko Willink & David Goggins",
      duration: "10 min", 
      theme: "Self-Discipline",
      embedId: "IdTMDpizis8"
    },
    {
      id: "4",
      title: "INNER STRENGTH & DISCIPLINE - Navy SEAL Power",
      duration: "9 min",
      theme: "Mental Toughness",
      embedId: "78I9dTB9vqM"
    },
    {
      id: "5",
      title: "THE MOST SAVAGE 5 MINUTES OF YOUR LIFE",
      duration: "5 min",
      theme: "Self-Discipline",
      embedId: "hbkZrOU1Zag"
    },
    {
      id: "6",
      title: "BE UNCOMFORTABLE EVERYDAY - Navy SEAL Motivation",
      duration: "11 min",
      theme: "Mental Toughness",
      embedId: "mgmVOuLgFB0"
    },
    {
      id: "7",
      title: "DISCIPLINE EQUALS FREEDOM - Jocko Willink",
      duration: "7 min",
      theme: "Self-Discipline",
      embedId: "TQMbvJNRpLE"
    },
    {
      id: "8",
      title: "STOP BEING WEAK - Powerful Mindset Shift",
      duration: "6 min",
      theme: "Mental Toughness",
      embedId: "EyhOmBPtGNM"
    }
  ];

  const getThemeColor = (theme: string) => {
    const colors: { [key: string]: string } = {
      "Self-Discipline": "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400",
      "Morning Routine": "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400", 
      "Mental Toughness": "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400",
      "Motivation": "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400",
      "Habit Building": "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400",
      "Courage": "bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-400"
    };
    return colors[theme] || "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400";
  };

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="text-center py-4">
        <div className="text-3xl mb-2">🎬</div>
        <h1 className="text-2xl font-bold text-foreground mb-2 flex items-center justify-center space-x-2">
          <Play className="h-6 w-6 text-red-600 dark:text-red-400" />
          <span>Motivational Videos</span>
        </h1>
        <p className="text-muted-foreground">
          Daily dose of inspiration to fuel your discipline journey
        </p>
      </div>

      {/* Videos Grid */}
      <div className="grid grid-cols-1 gap-6">
        {motivationalVideos.map((video) => (
          <Card key={video.id} className="p-0 bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-800 dark:via-slate-700 dark:to-slate-800 border-slate-200 dark:border-slate-600 shadow-lg overflow-hidden">
            <div className="relative">
              {/* Video Embed */}
              <div className="relative w-full h-48 md:h-56">
                <iframe
                  src={`https://www.youtube.com/embed/${video.embedId}?rel=0&showinfo=0&modestbranding=1`}
                  title={video.title}
                  className="absolute inset-0 w-full h-full rounded-t-lg"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              
              {/* Video Info Overlay */}
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground text-sm leading-tight mb-2">
                      {video.title}
                    </h3>
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>{video.duration}</span>
                      </div>
                      <Badge 
                        variant="secondary" 
                        className={`text-xs ${getThemeColor(video.theme)}`}
                      >
                        {video.theme}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Inspirational Footer */}
      <Card className="p-4 bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 dark:from-indigo-950/20 dark:via-purple-950/20 dark:to-pink-950/20 border-indigo-200 dark:border-indigo-800">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg">
            <BookOpen className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-indigo-900 dark:text-slate-100 text-sm">
              Pro Tip
            </h3>
            <p className="text-indigo-700 dark:text-slate-300 text-xs">
              Watch one video during your morning routine or before workouts to boost motivation and mental strength.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}