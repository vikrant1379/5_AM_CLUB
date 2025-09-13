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

      {/* World-Class Motivational Quotes */}
      <div className="space-y-4">
        <Card className="p-6 bg-gradient-to-br from-purple-100/60 via-indigo-50/40 to-blue-50/30 dark:from-slate-800/50 dark:via-slate-700/40 dark:to-slate-800/30 border-purple-300 dark:border-slate-600/50">
          <div className="text-center">
            <div className="text-3xl mb-3">🧠</div>
            <p className="text-purple-700 dark:text-slate-300 italic text-lg leading-relaxed">
              "You have power over your mind - not outside events. Realize this, and you will find strength."
            </p>
            <p className="text-sm text-purple-600 dark:text-slate-400 mt-3 font-medium">
              - Marcus Aurelius, Roman Emperor & Stoic Philosopher
            </p>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-emerald-100/60 via-green-50/40 to-teal-50/30 dark:from-slate-800/50 dark:via-slate-700/40 dark:to-slate-800/30 border-emerald-300 dark:border-slate-600/50">
          <div className="text-center">
            <div className="text-3xl mb-3">💪</div>
            <p className="text-emerald-700 dark:text-slate-300 italic text-lg leading-relaxed">
              "No man is free who is not master of himself."
            </p>
            <p className="text-sm text-emerald-600 dark:text-slate-400 mt-3 font-medium">
              - Epictetus, Ancient Greek Stoic Philosopher
            </p>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-orange-100/60 via-amber-50/40 to-yellow-50/30 dark:from-slate-800/50 dark:via-slate-700/40 dark:to-slate-800/30 border-orange-300 dark:border-slate-600/50">
          <div className="text-center">
            <div className="text-3xl mb-3">🌟</div>
            <p className="text-orange-700 dark:text-slate-300 italic text-lg leading-relaxed">
              "Mastering others is strength. Mastering yourself is true power."
            </p>
            <p className="text-sm text-orange-600 dark:text-slate-400 mt-3 font-medium">
              - Lao Tzu, Ancient Chinese Philosopher
            </p>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-rose-100/60 via-pink-50/40 to-red-50/30 dark:from-slate-800/50 dark:via-slate-700/40 dark:to-slate-800/30 border-rose-300 dark:border-slate-600/50">
          <div className="text-center">
            <div className="text-3xl mb-3">🏆</div>
            <p className="text-rose-700 dark:text-slate-300 italic text-lg leading-relaxed">
              "The first and best victory is to conquer self."
            </p>
            <p className="text-sm text-rose-600 dark:text-slate-400 mt-3 font-medium">
              - Plato, Ancient Greek Philosopher
            </p>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-cyan-100/60 via-blue-50/40 to-indigo-50/30 dark:from-slate-800/50 dark:via-slate-700/40 dark:to-slate-800/30 border-cyan-300 dark:border-slate-600/50">
          <div className="text-center">
            <div className="text-3xl mb-3">☮️</div>
            <p className="text-cyan-700 dark:text-slate-300 italic text-lg leading-relaxed">
              "A disciplined mind leads to happiness, and an undisciplined mind leads to suffering."
            </p>
            <p className="text-sm text-cyan-600 dark:text-slate-400 mt-3 font-medium">
              - Buddha, Spiritual Teacher & Philosopher
            </p>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-amber-100/60 via-orange-50/40 to-yellow-50/30 dark:from-slate-800/50 dark:via-slate-700/40 dark:to-slate-800/30 border-amber-300 dark:border-slate-600/50">
          <div className="text-center">
            <div className="text-3xl mb-3">🕉️</div>
            <p className="text-amber-700 dark:text-slate-300 italic text-lg leading-relaxed">
              "We must all suffer one of two things: the pain of discipline or the pain of regret and disappointment."
            </p>
            <p className="text-sm text-amber-600 dark:text-slate-400 mt-3 font-medium">
              - Jim Rohn, American Entrepreneur & Motivational Speaker
            </p>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-violet-100/60 via-purple-50/40 to-fuchsia-50/30 dark:from-slate-800/50 dark:via-slate-700/40 dark:to-slate-800/30 border-violet-300 dark:border-slate-600/50">
          <div className="text-center">
            <div className="text-3xl mb-3">🎯</div>
            <p className="text-violet-700 dark:text-slate-300 italic text-lg leading-relaxed">
              "We are what we repeatedly do. Excellence, then, is not an act, but a habit."
            </p>
            <p className="text-sm text-violet-600 dark:text-slate-400 mt-3 font-medium">
              - Aristotle, Ancient Greek Philosopher
            </p>
          </div>
        </Card>
      </div>

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