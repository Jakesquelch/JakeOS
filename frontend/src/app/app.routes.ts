import { Routes } from '@angular/router';
import { LandingPage } from './landing-page/landing-page';
import { ToDoList } from './to-do-list/to-do-list';
import { Journal } from './journal/journal';
import { HabitTracker } from './habit-tracker/habit-tracker';

export const routes: Routes = [
  { path: '', component: LandingPage },
  { path: 'todo', component: ToDoList },
  { path: 'journal', component: Journal },
  { path: 'habit', component: HabitTracker },
];
