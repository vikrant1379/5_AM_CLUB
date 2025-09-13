import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Clock, User, Calendar, BookOpen, ExternalLink } from "lucide-react";
import { Article } from "@/data/articles";

interface ArticleCardProps {
  article: Article;
}

export function ArticleCard({ article }: ArticleCardProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="cursor-pointer transition-all duration-200 hover-elevate group border-l-4 border-l-amber-300 dark:border-l-slate-600 hover:border-l-amber-500 dark:hover:border-l-slate-400" data-testid={`card-article-${article.id}`}>
          <div className="p-6">
            {/* Article Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <Badge variant="secondary" className="text-xs bg-amber-100 dark:bg-slate-700 text-amber-800 dark:text-slate-200">
                    {article.category.replace('-', ' ').toUpperCase()}
                  </Badge>
                  {article.featured && (
                    <Badge className="text-xs bg-orange-200 dark:bg-orange-900 text-orange-800 dark:text-orange-200">
                      Featured
                    </Badge>
                  )}
                </div>
                <h3 className="text-lg font-semibold text-amber-900 dark:text-slate-100 mb-2 line-clamp-2 group-hover:text-amber-700 dark:group-hover:text-slate-50 transition-colors" data-testid={`text-title-${article.id}`}>
                  {article.title}
                </h3>
                <p className="text-sm text-amber-700 dark:text-slate-300 line-clamp-3 leading-relaxed" data-testid={`text-description-${article.id}`}>
                  {article.description}
                </p>
              </div>
              <div className="flex-shrink-0 ml-4">
                <BookOpen className="h-8 w-8 text-amber-600 dark:text-slate-400 group-hover:text-amber-700 dark:group-hover:text-slate-300 transition-colors" />
              </div>
            </div>

            {/* Article Meta */}
            <div className="flex items-center justify-between text-xs text-amber-600 dark:text-slate-400">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <Clock className="h-3 w-3" />
                  <span data-testid={`text-readtime-${article.id}`}>{article.readTime} min read</span>
                </div>
                <div className="flex items-center space-x-1">
                  <User className="h-3 w-3" />
                  <span data-testid={`text-author-${article.id}`}>{article.author}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="h-3 w-3" />
                  <span data-testid={`text-date-${article.id}`}>
                    {new Date(article.publishDate).toLocaleDateString()}
                  </span>
                </div>
              </div>
              <ExternalLink className="h-4 w-4 opacity-50 group-hover:opacity-100 transition-opacity" />
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1 mt-3">
              {article.tags.slice(0, 3).map((tag, index) => (
                <span
                  key={index}
                  className="text-xs bg-amber-50 dark:bg-slate-800 text-amber-700 dark:text-slate-300 px-2 py-1 rounded-full"
                  data-testid={`tag-${tag.replace(/\s+/g, '-').toLowerCase()}-${article.id}`}
                >
                  {tag}
                </span>
              ))}
              {article.tags.length > 3 && (
                <span className="text-xs text-amber-600 dark:text-slate-400 px-2 py-1">
                  +{article.tags.length - 3} more
                </span>
              )}
            </div>
          </div>
        </Card>
      </DialogTrigger>

      <DialogContent className="max-w-4xl max-h-[80vh] p-0 border-2 border-amber-200 dark:border-slate-600">
        <DialogHeader className="p-6 border-b border-amber-100 dark:border-slate-700">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-3">
                <Badge variant="secondary" className="bg-amber-100 dark:bg-slate-700 text-amber-800 dark:text-slate-200">
                  {article.category.replace('-', ' ').toUpperCase()}
                </Badge>
                {article.featured && (
                  <Badge className="bg-orange-200 dark:bg-orange-900 text-orange-800 dark:text-orange-200">
                    Featured
                  </Badge>
                )}
              </div>
              <DialogTitle className="text-2xl font-bold text-amber-900 dark:text-slate-100 mb-3 leading-tight">
                {article.title}
              </DialogTitle>
              <div className="flex items-center space-x-6 text-sm text-amber-600 dark:text-slate-400">
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>{article.readTime} min read</span>
                </div>
                <div className="flex items-center space-x-1">
                  <User className="h-4 w-4" />
                  <span>{article.author}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(article.publishDate).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
            <BookOpen className="h-12 w-12 text-amber-600 dark:text-slate-400" />
          </div>

          {/* Tags in Modal */}
          <div className="flex flex-wrap gap-2 mt-4">
            {article.tags.map((tag, index) => (
              <span
                key={index}
                className="text-sm bg-amber-50 dark:bg-slate-800 text-amber-700 dark:text-slate-300 px-3 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </DialogHeader>

        <ScrollArea className="flex-1 px-6 py-4">
          <div className="prose prose-amber dark:prose-invert max-w-none prose-headings:text-amber-900 dark:prose-headings:text-slate-100 prose-p:text-amber-800 dark:prose-p:text-slate-200 prose-strong:text-amber-900 dark:prose-strong:text-slate-100 prose-blockquote:text-amber-700 dark:prose-blockquote:text-slate-300 prose-blockquote:border-l-amber-400 dark:prose-blockquote:border-l-slate-500">
            <div dangerouslySetInnerHTML={{ __html: formatArticleContent(article.content) }} />
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

// Helper function to format markdown-like content to HTML
function formatArticleContent(content: string): string {
  return content
    // Headers
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    
    // Bold text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    
    // Lists
    .replace(/^\- (.*$)/gim, '<li>$1</li>')
    .replace(/(<li>[\s\S]*?<\/li>)/g, '<ul>$1</ul>')
    
    // Blockquotes
    .replace(/^> (.*$)/gim, '<blockquote>$1</blockquote>')
    
    // Line breaks
    .replace(/\n\n/g, '</p><p>')
    .replace(/^(.*)$/gim, '<p>$1</p>')
    
    // Clean up extra p tags around other elements
    .replace(/<p><h([1-6])>/g, '<h$1>')
    .replace(/<\/h([1-6])><\/p>/g, '</h$1>')
    .replace(/<p><ul>/g, '<ul>')
    .replace(/<\/ul><\/p>/g, '</ul>')
    .replace(/<p><blockquote>/g, '<blockquote>')
    .replace(/<\/blockquote><\/p>/g, '</blockquote>')
    .replace(/<p><\/p>/g, '');
}