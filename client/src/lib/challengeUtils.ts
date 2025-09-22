// Centralized challenge day calculation utility
// Uses local dates to ensure midnight transitions happen at user's local time

export interface ChallengeStatus {
  status: 'countdown' | 'active' | 'completed';
  currentDay: number;
  totalDays: number;
  progress: number;
  daysUntilStart?: number;
}

// Challenge starts September 22, 2025 (local time)
const CHALLENGE_START_YEAR = 2025;
const CHALLENGE_START_MONTH = 8; // September (0-indexed)
const CHALLENGE_START_DATE = 22;
const TOTAL_CHALLENGE_DAYS = 100;

export const getChallengeStartDate = (): Date => {
  const startDate = new Date(CHALLENGE_START_YEAR, CHALLENGE_START_MONTH, CHALLENGE_START_DATE);
  startDate.setHours(0, 0, 0, 0); // Set to local midnight
  return startDate;
};

export const getCurrentChallengeStatus = (): ChallengeStatus => {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  today.setHours(0, 0, 0, 0); // Truncate to local midnight
  
  const challengeStart = getChallengeStartDate();
  const timeDiff = today.getTime() - challengeStart.getTime();
  const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  
  if (daysDiff < 0) {
    // Before challenge starts
    return {
      status: 'countdown',
      currentDay: 1,
      totalDays: TOTAL_CHALLENGE_DAYS,
      progress: 0,
      daysUntilStart: Math.abs(daysDiff)
    };
  } else if (daysDiff >= 0 && daysDiff < TOTAL_CHALLENGE_DAYS) {
    // During challenge (Day 1, 2, 3...)
    const currentDay = daysDiff + 1;
    return {
      status: 'active',
      currentDay,
      totalDays: TOTAL_CHALLENGE_DAYS,
      progress: currentDay / TOTAL_CHALLENGE_DAYS
    };
  } else {
    // After challenge ends
    return {
      status: 'completed',
      currentDay: TOTAL_CHALLENGE_DAYS,
      totalDays: TOTAL_CHALLENGE_DAYS,
      progress: 1
    };
  }
};

export const getDateForChallengeDay = (day: number): Date => {
  const startDate = getChallengeStartDate();
  const targetDate = new Date(startDate);
  targetDate.setDate(startDate.getDate() + day - 1);
  return targetDate;
};