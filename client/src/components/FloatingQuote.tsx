import { Card } from "@/components/ui/card";
import { KEY_RULES } from "@/data/disciplineSchedule";
import { CheckCircle, Target, Zap } from "lucide-react";

export function FloatingQuote() {
  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="text-center py-4">
        <div className="text-3xl mb-2">🕉️</div>
        <h1 className="text-2xl font-bold text-amber-900 dark:text-slate-100 mb-2 flex items-center justify-center space-x-2">
          <Target className="h-6 w-6 text-amber-600" />
          <span>Key Rules & Guidelines</span>
        </h1>
        <p className="text-amber-700 dark:text-slate-400">
          Essential principles for disciplined living through the four Purusharthas
        </p>
      </div>

      {/* Rules */}
      <div className="space-y-4">
        {KEY_RULES.map((rule, index) => (
          <Card key={index} className="p-6 bg-gradient-to-br from-amber-100/50 via-orange-50/30 to-yellow-50/20 dark:from-slate-800/40 dark:via-slate-700/30 dark:to-slate-800/20 border-amber-300 dark:border-slate-600/50">
            <div className="flex items-start space-x-4">
              <div className="p-2 bg-amber-200 dark:bg-slate-700/50 rounded-lg flex-shrink-0">
                <div className="text-2xl">{rule.icon}</div>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-amber-900 dark:text-slate-100 mb-2">
                  {rule.title}
                </h3>
                <p className="text-amber-700 dark:text-slate-300 leading-relaxed">
                  {rule.description}
                </p>
              </div>
              <CheckCircle className="h-5 w-5 text-amber-600 dark:text-slate-400 flex-shrink-0 mt-1" />
            </div>
          </Card>
        ))}
      </div>

      {/* Motivational Quote */}
      <Card className="p-6 bg-gradient-to-br from-amber-100/60 via-orange-50/40 to-yellow-50/30 dark:from-slate-800/50 dark:via-slate-700/40 dark:to-slate-800/30 border-amber-300 dark:border-slate-600/50">
        <div className="text-center">
          <div className="text-4xl mb-4">🕉️</div>
          <h3 className="text-lg font-semibold text-amber-900 dark:text-slate-100 mb-2">
            Remember
          </h3>
          <p className="text-amber-700 dark:text-slate-300 italic">
            "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन - You have the right to work, but not to the fruits. This is the essence of disciplined living."
          </p>
          <p className="text-sm text-amber-600 dark:text-slate-400 mt-2">
            - Bhagavad Gita 2.47 (Discipline & Purushartha)
          </p>
        </div>
      </Card>

      {/* Quick Tips */}
      <Card className="p-6 bg-gradient-to-br from-green-100 via-emerald-50 to-teal-50 dark:from-slate-800/40 dark:via-slate-700/30 dark:to-slate-800/20 border-green-300 dark:border-slate-600">
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2 bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg">
            <Zap className="h-6 w-6 text-white" />
          </div>
          <h3 className="text-lg font-semibold text-green-800 dark:text-slate-100">Discipline & Purushartha Tips</h3>
        </div>
        
        <div className="space-y-3 text-sm">
          <div className="flex items-start space-x-2">
            <span className="text-green-600 dark:text-green-400 font-bold">•</span>
            <p className="text-green-700 dark:text-slate-300"><strong>Dharma:</strong> Follow your duty without attachment to results</p>
          </div>
          <div className="flex items-start space-x-2">
            <span className="text-green-600 dark:text-green-400 font-bold">•</span>
            <p className="text-green-700 dark:text-slate-300"><strong>Artha:</strong> Earn wealth through righteous means and discipline</p>
          </div>
          <div className="flex items-start space-x-2">
            <span className="text-green-600 dark:text-green-400 font-bold">•</span>
            <p className="text-green-700 dark:text-slate-300"><strong>Kama:</strong> Fulfill desires within the bounds of dharma</p>
          </div>
          <div className="flex items-start space-x-2">
            <span className="text-green-600 dark:text-green-400 font-bold">•</span>
            <p className="text-green-700 dark:text-slate-300"><strong>Moksha:</strong> Use discipline as the path to liberation</p>
          </div>
        </div>
      </Card>
    </div>
  );
}