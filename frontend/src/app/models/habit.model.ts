export interface Habit {
  id: number;
  name: string;
  completedDates: string[]; // local dates the habit was done, e.g. "2026-07-03"
}
