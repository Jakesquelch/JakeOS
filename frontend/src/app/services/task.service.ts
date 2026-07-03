import { Injectable, signal } from '@angular/core';
import { Task } from '../models/task.model';

@Injectable({ providedIn: 'root' })
export class TaskService {
  // Only the service can write to this signal:
  private tasksSignal = signal<Task[]>([]);
  // ...components get a read-only view of it:
  readonly tasks = this.tasksSignal.asReadonly();

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
