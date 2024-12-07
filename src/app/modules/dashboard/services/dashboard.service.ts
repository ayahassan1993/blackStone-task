import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  tasksList: Task[] = [];
  tasksListBehavior = new BehaviorSubject<Task[]>([
    {
      id: 1,
      name: 'Task 1',
      description: 'Description of Task 1',
      priority: 'High',
      status: 'Pending',
      assignedTo: { id: 3, name: 'User 3' },
      dueDate: '2023-12-10',
    },
    {
      id: 2,
      name: 'Task 2',
      description: 'Description of Task 2',
      priority: 'Medium',
      status: 'Pending',
      assignedTo: { id: 2, name: 'User 2' },
      dueDate: '2023-12-15',
    },
    {
      id: 3,
      name: 'Task 3',
      description: 'Description of Task 3',
      priority: 'Low',
      status: 'InProgress',
      assignedTo: { id: 1, name: 'User 1' },
      dueDate: '2023-12-12',
    },
    {
      id: 4,
      name: 'Task 4',
      description: 'Description of Task 4',
      priority: 'Medium',
      status: 'Completed',
      assignedTo: { id: 2, name: 'User 2' },
      dueDate: '2023-12-05',
    },
  ]);

  constructor() {
    this.tasksListBehavior.subscribe((tasks) => (this.tasksList = tasks));
  }

  getTasks() {
    return this.tasksList;
  }

  getTask(id: number) {
    return this.tasksList.find((task) => +task.id === +id);
  }

  addTask(task: Task) {
    const id = this.tasksList[this.tasksList?.length - 1]?.id + 1;
    this.tasksList.push({ ...task, id: id });
    this.tasksListBehavior.next(this.tasksList);
  }

  deleteTask(task: Task) {
    let index = this.tasksList.findIndex((t) => t.id == task.id);
    if (index > -1) {
      this.tasksList.splice(index, 1);
      this.tasksListBehavior.next(this.tasksList);
    }
  }

  updateTask(task: Task) {
    let index = this.tasksList.findIndex((t) => t.id == task.id);
    console.log(this.tasksList);
    if (index > -1) {
      this.tasksList[index] = { ...task };

      this.tasksListBehavior.next(this.tasksList);
    }
  }

  updateTasks(tasks: Task[]) {
    this.tasksList = tasks;
    this.tasksListBehavior.next(this.tasksList);
  }
}
