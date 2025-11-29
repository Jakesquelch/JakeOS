import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Task } from '../models/task.model';
import { CommonModule, TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-to-do-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, TitleCasePipe],
  templateUrl: './to-do-list.html',
  styleUrl: './to-do-list.css',
})
export class ToDoList {
  tasks: Task[] = [];
  newTaskTitle = '';
  newTaskGroup = '';
  newTaskPriority: 'low' | 'medium' | 'high' = 'medium';
  editingTaskId: number | null = null;
  editTaskTitle = '';

  addTask() {
    if (!this.newTaskTitle.trim()) return;
    const newTask: Task = {
      id: Date.now(),
      title: this.newTaskTitle,
      completed: false,
      priority: this.newTaskPriority,
      group: this.newTaskGroup || undefined,
    };
    this.tasks.push(newTask);
    this.newTaskTitle = '';
    this.newTaskGroup = '';
    this.newTaskPriority = 'medium';
  }

  deleteTask(id: number) {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }

  toggleComplete(task: Task) {
    task.completed = !task.completed;
  }

  editTask(task: Task) {
    this.editingTaskId = task.id;
    this.editTaskTitle = task.title;
  }

  saveTask(task: Task) {
    if (!this.editTaskTitle.trim()) return;
    task.title = this.editTaskTitle;
    this.editingTaskId = null;
  }

  cancelEdit() {
    this.editingTaskId = null;
  }

  get sortedTasks() {
    return this.tasks.sort((a, b) => {
      const priorities = { high: 3, medium: 2, low: 1 };
      return priorities[b.priority] - priorities[a.priority];
    });
  }
}
