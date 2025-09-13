import { useState, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Play, Pause, Clock, BookOpen, FileText, Headphones, Volume2, Eye, Download, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

interface ContentItem {
  id: string;
  title: string;
  duration?: string;
  readTime?: string;
  theme: string;
  type: 'video' | 'audiobook' | 'article' | 'pdf';
  embedId?: string;
  audioUrl?: string;
  content?: string;
  pdfUrl?: string;
  description: string;
}

type ContentType = 'video' | 'audiobook' | 'article' | 'pdf';

export function DisciplineLibrary() {
  const [activeContentType, setActiveContentType] = useState<ContentType>('video');
  const [playingAudio, setPlayingAudio] = useState<string | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<ContentItem | null>(null);
  const audioRefs = useRef<{ [key: string]: HTMLAudioElement }>({});

  const disciplineContent: ContentItem[] = [
    // Videos
    {
      id: "v1",
      title: "DISCIPLINE YOURSELF - The Power of Self Control",
      duration: "8 min",
      theme: "Self-Discipline",
      type: "video",
      embedId: "DG-oAF1i_UA",
      description: "Heavy background music with intense Navy SEAL motivation"
    },
    {
      id: "v2",
      title: "TURN YOURSELF INTO A MONSTER - David Goggins",
      duration: "12 min",
      theme: "Mental Toughness",
      type: "video",
      embedId: "5tSTk1083VY",
      description: "Raw, aggressive motivation with cinematic soundtrack"
    },
    {
      id: "v3",
      title: "UNSTOPPABLE - Jocko Willink & David Goggins",
      duration: "10 min",
      theme: "Self-Discipline",
      type: "video",
      embedId: "IdTMDpizis8",
      description: "Military-inspired discipline with powerful music"
    },
    
    // Audiobooks (using YouTube audio)
    {
      id: "a1",
      title: "Discipline Equals Freedom - Field Manual",
      duration: "45 min",
      theme: "Self-Discipline",
      type: "audiobook",
      embedId: "R1JBQMXm_ok",
      description: "Jocko Willink's complete guide to discipline and freedom"
    },
    {
      id: "a2",
      title: "Can't Hurt Me - David Goggins Full Audiobook",
      duration: "60 min",
      theme: "Mental Toughness",
      type: "audiobook",
      embedId: "dGlaWNWkSQU", 
      description: "Transform your mind and unleash your inner warrior"
    },
    {
      id: "a3",
      title: "The 5 AM Club - Robin Sharma Audio",
      duration: "35 min",
      theme: "Morning Routine",
      type: "audiobook",
      embedId: "IlU0CSSE4I8",
      description: "Master your morning, elevate your life"
    },

    // Articles
    {
      id: "ar1",
      title: "The Psychology of Self-Control",
      readTime: "8 min read",
      theme: "Self-Discipline",
      type: "article",
      description: "Scientific insights into building unbreakable discipline",
      content: `
        <h2>The Science Behind Self-Control</h2>
        <p>Self-control is like a muscle - the more you exercise it, the stronger it becomes. Research from Stanford University shows that individuals with high self-control consistently outperform their peers in academic, professional, and personal achievements.</p>
        
        <h3>The Marshmallow Test Legacy</h3>
        <p>Walter Mischel's famous marshmallow experiments revealed that the ability to delay gratification in childhood predicts success in life. Children who could wait for a second marshmallow showed higher SAT scores, better academic performance, and lower rates of obesity and addiction later in life.</p>
        
        <h3>Building Your Discipline Muscle</h3>
        <ul>
          <li><strong>Start Small:</strong> Begin with tiny habits you can maintain consistently</li>
          <li><strong>Remove Temptations:</strong> Design your environment to support your goals</li>
          <li><strong>Use Implementation Intentions:</strong> Create if-then plans for challenging situations</li>
          <li><strong>Practice Delayed Gratification:</strong> Regularly postpone small pleasures</li>
        </ul>
        
        <h3>The Discipline-Freedom Paradox</h3>
        <p>As Navy SEAL Jocko Willink says, "Discipline equals freedom." The more disciplined you are in certain areas, the more freedom you have in others. This counterintuitive principle is the foundation of all high achievement.</p>
      `
    },
    {
      id: "ar2",
      title: "Morning Routines of Champions",
      readTime: "12 min read",
      theme: "Morning Routine",
      type: "article",
      description: "How successful people start their day with purpose",
      content: `
        <h2>The Power of the First Hour</h2>
        <p>The way you start your morning sets the tone for your entire day. Champions across every field share remarkably similar morning routines that prioritize physical health, mental clarity, and spiritual growth.</p>
        
        <h3>David Goggins - 4:30 AM Start</h3>
        <ul>
          <li>4:30 AM: Wake up, immediate cold shower</li>
          <li>5:00 AM: 6-mile run regardless of weather</li>
          <li>6:30 AM: Stretching and mobility work</li>
          <li>7:00 AM: Meditation and mental preparation</li>
        </ul>
        
        <h3>Jocko Willink - Discipline from Dawn</h3>
        <ul>
          <li>4:30 AM: Wake up, no snooze button ever</li>
          <li>4:35 AM: Immediate workout or jiu-jitsu</li>
          <li>6:00 AM: Review priorities and plan the day</li>
          <li>6:30 AM: Healthy breakfast and supplements</li>
        </ul>
        
        <h3>The Science of Early Rising</h3>
        <p>Research shows that morning people tend to be more proactive, optimistic, and successful. The quiet hours before the world wakes up provide uninterrupted time for personal development and goal achievement.</p>
      `
    },

    // PDFs (Links to discipline resources)
    {
      id: "p1",
      title: "The Complete Discipline Manual",
      readTime: "45 min",
      theme: "Self-Discipline",
      type: "pdf",
      pdfUrl: "https://www.jockowillink.com/application/files/1716/6502/3851/Extreme_Ownership.pdf",
      description: "Comprehensive guide to building unbreakable habits and mental toughness"
    },
    {
      id: "p2",
      title: "100-Day Challenge Blueprint",
      readTime: "25 min",
      theme: "Challenge",
      type: "pdf",
      pdfUrl: "https://jamesclear.com/wp-content/uploads/2023/01/atomic-habits-summary.pdf",
      description: "Step-by-step system for transforming your life in 100 days"
    }
  ];

  const getFilteredContent = (type: ContentType) => {
    return disciplineContent.filter(item => item.type === type);
  };

  const contentTypes = [
    { id: 'video', label: 'Videos', icon: Play, color: 'text-red-600', bgColor: 'bg-red-50' },
    { id: 'audiobook', label: 'Audio', icon: Headphones, color: 'text-green-600', bgColor: 'bg-green-50' },
    { id: 'article', label: 'Articles', icon: FileText, color: 'text-blue-600', bgColor: 'bg-blue-50' },
    { id: 'pdf', label: 'PDFs', icon: Download, color: 'text-purple-600', bgColor: 'bg-purple-50' }
  ];

  const getThemeColor = (theme: string) => {
    const colors: { [key: string]: string } = {
      "Self-Discipline": "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400",
      "Mental Toughness": "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400", 
      "Morning Routine": "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400",
      "Challenge": "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/20 dark:text-indigo-400"
    };
    return colors[theme] || "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400";
  };

  const renderContent = (item: ContentItem) => {
    switch (item.type) {
      case 'video':
        return (
          <div className="relative w-full h-48 md:h-56">
            <iframe
              src={`https://www.youtube.com/embed/${item.embedId}?rel=0&showinfo=0&modestbranding=1`}
              title={item.title}
              className="absolute inset-0 w-full h-full rounded-t-lg"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        );
      
      case 'audiobook':
        return (
          <div className="relative w-full h-48 md:h-56">
            <iframe
              src={`https://www.youtube.com/embed/${item.embedId}?rel=0&showinfo=0&modestbranding=1`}
              title={item.title}
              className="absolute inset-0 w-full h-full rounded-t-lg"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        );

      case 'article':
        return (
          <div className="relative w-full h-48 md:h-56 bg-gradient-to-br from-blue-100 to-indigo-200 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-t-lg flex items-center justify-center">
            <div className="text-center">
              <div className="bg-blue-600 p-4 rounded-full mb-4 mx-auto w-16 h-16 flex items-center justify-center">
                <Eye className="h-8 w-8 text-white" />
              </div>
              <Button 
                onClick={() => setSelectedArticle(item)}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <BookOpen className="h-4 w-4 mr-2" />
                Read Article
              </Button>
            </div>
          </div>
        );

      case 'pdf':
        return (
          <div className="relative w-full h-48 md:h-56 bg-gradient-to-br from-purple-100 to-violet-200 dark:from-purple-900/20 dark:to-violet-900/20 rounded-t-lg flex items-center justify-center">
            <div className="text-center">
              <div className="bg-purple-600 p-4 rounded-full mb-4 mx-auto w-16 h-16 flex items-center justify-center">
                <FileText className="h-8 w-8 text-white" />
              </div>
              <Button 
                onClick={() => window.open(item.pdfUrl, '_blank')}
                className="bg-purple-600 hover:bg-purple-700 text-white"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Open PDF
              </Button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="text-center py-4">
        <div className="text-3xl mb-2">📚</div>
        <h1 className="text-2xl font-bold text-foreground mb-2 flex items-center justify-center space-x-2">
          <BookOpen className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
          <span>Discipline Library</span>
        </h1>
        <p className="text-muted-foreground">
          Videos, audiobooks, articles & PDFs for your discipline journey
        </p>
      </div>

      {/* Content Type Tabs */}
      <div className="flex flex-wrap gap-2 justify-center">
        {contentTypes.map((type) => {
          const Icon = type.icon;
          const isActive = activeContentType === type.id;
          
          return (
            <Button
              key={type.id}
              onClick={() => setActiveContentType(type.id as ContentType)}
              variant={isActive ? "default" : "outline"}
              size="sm"
              className={cn(
                "flex items-center space-x-2",
                isActive && `${type.bgColor} ${type.color} border-current`
              )}
            >
              <Icon className="h-4 w-4" />
              <span>{type.label}</span>
            </Button>
          );
        })}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 gap-6">
        {getFilteredContent(activeContentType).map((item) => (
          <Card key={item.id} className="p-0 bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-800 dark:via-slate-700 dark:to-slate-800 border-slate-200 dark:border-slate-600 shadow-lg overflow-hidden">
            <div className="relative">
              {renderContent(item)}
              
              {/* Content Info */}
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground text-sm leading-tight mb-2">
                      {item.title}
                    </h3>
                    <p className="text-xs text-muted-foreground mb-2 leading-relaxed">
                      {item.description}
                    </p>
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>{item.duration || item.readTime}</span>
                      </div>
                      <Badge 
                        variant="secondary" 
                        className={`text-xs ${getThemeColor(item.theme)}`}
                      >
                        {item.theme}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Learning Tip */}
      <Card className="p-4 bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 dark:from-indigo-950/20 dark:via-purple-950/20 dark:to-pink-950/20 border-indigo-200 dark:border-indigo-800">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg">
            <BookOpen className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-indigo-900 dark:text-slate-100 text-sm">
              Learning Tip
            </h3>
            <p className="text-indigo-700 dark:text-slate-300 text-xs">
              Combine different content types: Watch videos for motivation, listen to audiobooks during workouts, read articles for deep insights, and reference PDFs for practical frameworks.
            </p>
          </div>
        </div>
      </Card>

      {/* Article Reader Dialog */}
      <Dialog open={selectedArticle !== null} onOpenChange={() => setSelectedArticle(null)}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <BookOpen className="h-5 w-5 text-blue-600" />
              <span>{selectedArticle?.title}</span>
            </DialogTitle>
          </DialogHeader>
          <ScrollArea className="mt-4 max-h-[60vh] pr-4">
            <div 
              className="prose dark:prose-invert max-w-none text-sm leading-relaxed"
              dangerouslySetInnerHTML={{ __html: selectedArticle?.content || '' }}
            />
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  );
}