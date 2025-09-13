import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, Filter, Search } from "lucide-react";
import { ArticleCard } from "./ArticleCard";
import { ARTICLES, Article, getFeaturedArticles, getArticlesByCategory } from "@/data/articles";

export function ArticlesLibrary() {
  const [selectedCategory, setSelectedCategory] = useState<Article['category'] | 'all' | 'featured'>('featured');

  const getFilteredArticles = () => {
    switch (selectedCategory) {
      case 'featured':
        return getFeaturedArticles();
      case 'all':
        return ARTICLES;
      default:
        return getArticlesByCategory(selectedCategory);
    }
  };

  const filteredArticles = getFilteredArticles();

  const categoryOptions: { value: Article['category'] | 'all' | 'featured'; label: string; count: number }[] = [
    { value: 'featured', label: 'Featured', count: getFeaturedArticles().length },
    { value: 'all', label: 'All Articles', count: ARTICLES.length },
    { value: 'morning-routine', label: 'Morning Routines', count: getArticlesByCategory('morning-routine').length },
    { value: 'productivity', label: 'Productivity', count: getArticlesByCategory('productivity').length },
    { value: 'health', label: 'Health & Wellness', count: getArticlesByCategory('health').length },
    { value: 'mindset', label: 'Mindset', count: getArticlesByCategory('mindset').length },
  ];

  return (
    <div className="px-4 py-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <BookOpen className="h-8 w-8 text-amber-600 dark:text-slate-400" />
          <div>
            <h1 className="text-3xl font-bold text-amber-900 dark:text-slate-100" data-testid="heading-articles-library">
              Articles Library
            </h1>
            <p className="text-amber-700 dark:text-slate-300 mt-1">
              Discover insights, tips, and strategies to enhance your discipline journey
            </p>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-3" data-testid="container-category-filters">
          {categoryOptions.map((option) => (
            <Button
              key={option.value}
              variant={selectedCategory === option.value ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(option.value)}
              className={`transition-all duration-200 ${
                selectedCategory === option.value
                  ? 'bg-amber-600 hover:bg-amber-700 text-white border-amber-600'
                  : 'border-amber-300 dark:border-slate-600 text-amber-700 dark:text-slate-300 hover:bg-amber-50 dark:hover:bg-slate-800'
              }`}
              data-testid={`button-filter-${option.value}`}
            >
              <div className="flex items-center space-x-2">
                <span>{option.label}</span>
                <Badge 
                  variant="secondary" 
                  className={`text-xs ${
                    selectedCategory === option.value
                      ? 'bg-amber-500 text-white'
                      : 'bg-amber-100 dark:bg-slate-700 text-amber-700 dark:text-slate-300'
                  }`}
                >
                  {option.count}
                </Badge>
              </div>
            </Button>
          ))}
        </div>
      </div>

      {/* Articles Grid */}
      {filteredArticles.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3" data-testid="grid-articles">
          {filteredArticles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      ) : (
        <Card className="p-12 text-center border-2 border-dashed border-amber-300 dark:border-slate-600">
          <BookOpen className="h-16 w-16 text-amber-400 dark:text-slate-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-amber-900 dark:text-slate-200 mb-2">
            No Articles Found
          </h3>
          <p className="text-amber-700 dark:text-slate-400 mb-4">
            We're working on adding more content to this category.
          </p>
          <Button
            variant="outline"
            onClick={() => setSelectedCategory('all')}
            className="border-amber-300 dark:border-slate-600 text-amber-700 dark:text-slate-300 hover:bg-amber-50 dark:hover:bg-slate-800"
          >
            Browse All Articles
          </Button>
        </Card>
      )}

      {/* Stats */}
      <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4 text-center border-l-4 border-l-amber-400 dark:border-l-slate-500">
          <div className="text-2xl font-bold text-amber-900 dark:text-slate-100" data-testid="stat-total-articles">
            {ARTICLES.length}
          </div>
          <div className="text-sm text-amber-700 dark:text-slate-300">Total Articles</div>
        </Card>
        <Card className="p-4 text-center border-l-4 border-l-orange-400 dark:border-l-slate-500">
          <div className="text-2xl font-bold text-amber-900 dark:text-slate-100" data-testid="stat-featured-articles">
            {getFeaturedArticles().length}
          </div>
          <div className="text-sm text-amber-700 dark:text-slate-300">Featured</div>
        </Card>
        <Card className="p-4 text-center border-l-4 border-l-green-400 dark:border-l-slate-500">
          <div className="text-2xl font-bold text-amber-900 dark:text-slate-100" data-testid="stat-morning-routines">
            {getArticlesByCategory('morning-routine').length}
          </div>
          <div className="text-sm text-amber-700 dark:text-slate-300">Morning Routines</div>
        </Card>
        <Card className="p-4 text-center border-l-4 border-l-blue-400 dark:border-l-slate-500">
          <div className="text-2xl font-bold text-amber-900 dark:text-slate-100" data-testid="stat-avg-read-time">
            {Math.round(ARTICLES.reduce((acc, article) => acc + article.readTime, 0) / ARTICLES.length)}
          </div>
          <div className="text-sm text-amber-700 dark:text-slate-300">Avg. Read Time (min)</div>
        </Card>
      </div>
    </div>
  );
}