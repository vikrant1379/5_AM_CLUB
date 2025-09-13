import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ExternalLink, Maximize2, BookOpen } from "lucide-react";

interface ArticleViewerProps {
  title: string;
  url: string;
  description?: string;
}

export function ArticleViewer({ title, url, description }: ArticleViewerProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleOpenInNewTab = () => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <Card className="p-6 border-amber-200 dark:border-slate-600 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-slate-800/50 dark:to-slate-700/30">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <BookOpen className="h-6 w-6 text-amber-600 dark:text-amber-400" />
          <div>
            <h3 className="text-lg font-semibold text-amber-900 dark:text-slate-100" data-testid="text-article-title">
              {title}
            </h3>
            {description && (
              <p className="text-sm text-amber-700 dark:text-slate-300 mt-1" data-testid="text-article-description">
                {description}
              </p>
            )}
          </div>
        </div>
        <div className="flex space-x-2">
          <Dialog open={isFullscreen} onOpenChange={setIsFullscreen}>
            <DialogTrigger asChild>
              <Button 
                variant="outline" 
                size="sm"
                className="text-amber-700 dark:text-slate-300 border-amber-300 dark:border-slate-600 hover:bg-amber-100 dark:hover:bg-slate-700"
                data-testid="button-expand-article"
              >
                <Maximize2 className="h-4 w-4 mr-2" />
                Expand
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-6xl h-[90vh] p-2">
              <DialogHeader className="px-4 py-2">
                <DialogTitle className="flex items-center justify-between">
                  <span>{title}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleOpenInNewTab}
                    className="ml-4"
                    data-testid="button-open-new-tab"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Open Original
                  </Button>
                </DialogTitle>
              </DialogHeader>
              <iframe
                src={url}
                className="w-full h-full border-0 rounded-lg"
                title={title}
                data-testid="iframe-article-expanded"
              />
            </DialogContent>
          </Dialog>
          
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleOpenInNewTab}
            className="text-amber-700 dark:text-slate-300 border-amber-300 dark:border-slate-600 hover:bg-amber-100 dark:hover:bg-slate-700"
            data-testid="button-open-external"
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            Open
          </Button>
        </div>
      </div>

      <div className="relative bg-white dark:bg-slate-800 rounded-lg border border-amber-200 dark:border-slate-600 overflow-hidden shadow-sm">
        <iframe
          src={url}
          className="w-full h-96 border-0"
          title={title}
          data-testid="iframe-article-preview"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-amber-50/20 to-transparent pointer-events-none dark:from-slate-800/20" />
      </div>

      <div className="mt-4 text-xs text-amber-600 dark:text-slate-400 text-center">
        Click "Expand" for better reading experience or "Open" to view in a new tab
      </div>
    </Card>
  );
}