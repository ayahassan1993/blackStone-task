import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';

export const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,

    children: [
      {
        path: '',
        loadComponent: () =>
          import('./pages/tasks-list/tasks-list.component').then(
            (mod) => mod.TasksListComponent
          ),
      },
      {
        path: 'add',
        loadComponent: () =>
          import('./pages/add-task/add-task.component').then(
            (mod) => mod.AddTaskComponent
          ),
      },
      {
        path: ':id/edit',
        loadComponent: () =>
          import('./pages/add-task/add-task.component').then(
            (mod) => mod.AddTaskComponent
          ),
      },
      {
        path: ':id',
        loadComponent: () =>
          import('./pages/add-task/add-task.component').then(
            (mod) => mod.AddTaskComponent
          ),
      },
    ],
  },
];
