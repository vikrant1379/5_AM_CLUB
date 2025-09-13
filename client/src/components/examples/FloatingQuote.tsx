import { FloatingQuote } from '../FloatingQuote';

export default function FloatingQuoteExample() {
  const testQuotes = [
    "Discipline is the bridge between goals and accomplishment.",
    "Success is the sum of small efforts repeated day in and day out.",
    "The pain of discipline weighs ounces, but the pain of regret weighs tons."
  ];

  return (
    <div className="relative h-96 p-4">
      <p className="text-muted-foreground">Floating quotes will appear in the top-right corner every 8 seconds</p>
      <FloatingQuote quotes={testQuotes} intervalMs={3000} />
    </div>
  );
}