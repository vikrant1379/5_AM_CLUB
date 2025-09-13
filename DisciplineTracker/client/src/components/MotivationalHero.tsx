export function MotivationalHero() {
  return (
    <div className="text-center py-6 px-4">
      <div className="bg-gradient-to-br from-amber-100/50 via-orange-50/30 to-yellow-50/20 dark:from-amber-900/30 dark:via-orange-900/20 dark:to-yellow-900/10 rounded-2xl p-6 border border-amber-300 dark:border-amber-700/50">
        <h1 className="text-2xl font-bold text-foreground mb-3 leading-tight" data-testid="text-hero-title">
          Motivation fades.
          <br />
          <span className="text-amber-600 dark:text-amber-400">Discipline stays.</span>
          <br />
          Let's Create Discipline.
        </h1>
        <p className="text-muted-foreground text-base leading-relaxed mb-4" data-testid="text-hero-subtitle">
          Transform your life through consistent daily habits. Follow this proven schedule from 5 AM to 11 PM.
        </p>
        
        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4 mt-4">
          <div className="text-center">
            <div className="text-lg font-bold text-amber-600 dark:text-amber-400">100</div>
            <div className="text-xs text-muted-foreground">Days</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-amber-600 dark:text-amber-400">15</div>
            <div className="text-xs text-muted-foreground">Activities</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-amber-600 dark:text-amber-400">5AM</div>
            <div className="text-xs text-muted-foreground">Start</div>
          </div>
        </div>
      </div>
    </div>
  );
}