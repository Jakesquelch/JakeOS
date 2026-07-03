import { Routes } from '@angular/router';
import { Dashboard } from './pages/dashboard/dashboard';
import { ToDoList } from './pages/to-do-list/to-do-list';
import { Journal } from './pages/journal/journal';
import { HabitTracker } from './pages/habit-tracker/habit-tracker';

export const routes: Routes = [
  { path: '', component: Dashboard },
  { path: 'todo', component: ToDoList },
  { path: 'journal', component: Journal },
  { path: 'habit', component: HabitTracker },
];
