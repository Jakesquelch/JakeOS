import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Habit } from '../../models/habit.model';
import { HabitService } from '../../services/habit.service';

// "2026-07-03" in local time (toISOString would shift the date near midnight, since it uses UTC).
function toLocalDate(date: Date): string {
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${date.getFullYear()}-${month}-${day}`;
}

@Component({
  selector: 'app-habit-tracker',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './habit-tracker.html',
  styleUrl: './habit-tracker.css',
})
export class HabitTracker {
  private habitService = inject(HabitService);

  habits = this.habitService.habits;
  newHabitName = '';
  today = toLocalDate(new Date());
  // Last 7 days, oldest first, e.g. { date: "2026-07-03", label: "Thu" }.
  recentDays = this.buildRecentDays();

  private buildRecentDays() {
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      days.push({
        date: toLocalDate(d),
        label: d.toLocaleDateString(undefined, { weekday: 'short' }),
      });
    }
    return days;
  }

  addHabit() {
    if (!this.newHabitName.trim()) return;
    this.habitService.addHabit(this.newHabitName);
    this.newHabitName = '';
  }

  deleteHabit(id: number) {
    this.habitService.deleteHabit(id);
  }

  toggleDay(habit: Habit, date: string) {
    this.habitService.toggleDate(habit.id, date);
  }

  isDone(habit: Habit, date: string): boolean {
    return habit.completedDates.includes(date);
  }

  // Consecutive days done, counting back from today (or from yesterday,
  // so an unticked today doesn't kill a streak you're still on).
  streak(habit: Habit): number {
    const done = new Set(habit.completedDates);
    const day = new Date();
    if (!done.has(toLocalDate(day))) {
      day.setDate(day.getDate() - 1);
    }
    let count = 0;
    while (done.has(toLocalDate(day))) {
      count++;
      day.setDate(day.getDate() - 1);
    }
    return count;
  }
}
