import { effect, Injectable, signal } from '@angular/core';
import { Task } from '../models/task.model';

const STORAGE_KEY = 'jakeos-tasks';

@Injectable({ providedIn: 'root' })
export class TaskService {
  // Only the service can write to this signal:
  private tasksSignal = signal<Task[]>(this.loadTasks());
  // ...components get a read-only view of it:
  readonly tasks = this.tasksSignal.asReadonly();

  constructor() {
    // Runs once now, then again every time the tasks signal changes,
    // so every add/delete/edit is saved without each method having to remember to.
    effect(() => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.tasksSignal()));
    });
  }

  private loadTasks(): Task[] {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      // Corrupted/hand-edited data shouldn't crash the app; start fresh.
      return [];
    }
  }

  addTask(title: string, priority: Task['priority'], group?: string) {
    const newTask: Task = {
      id: Date.now(),
      title,
      completed: false,
      priority,
      group: group || undefined,
    };
    this.tasksSignal.update((tasks) => [...tasks, newTask]);
  }

  deleteTask(id: number) {
    this.tasksSignal.update((tasks) => tasks.filter((task) => task.id !== id));
  }

  toggleComplete(id: number) {
    this.tasksSignal.update((tasks) =>
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }

  updateTitle(id: number, title: string) {
    this.tasksSignal.update((tasks) =>
      tasks.map((task) => (task.id === id ? { ...task, title } : task))
    );
  }
}
