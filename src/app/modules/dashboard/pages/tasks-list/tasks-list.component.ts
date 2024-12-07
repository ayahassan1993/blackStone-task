import { CommonModule } from '@angular/common';
import {
  Component,
  computed,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import {
  CdkDragDrop,
  DragDropModule,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { TaskCardComponent } from '../../components/task-card/task-card.component';
import { Task } from '../../models/task.model';
import { Subscription } from 'rxjs';
import { DashboardService } from '../../services/dashboard.service';
import { TaskStatus } from '../../enum/task.enum';
import { NoDataFoundComponent } from '../../../../shared/components/no-data-found/no-data-found.component';
@Component({
  selector: 'app-tasks-list',
  standalone: true,
  imports: [
    CommonModule,
    DragDropModule,
    TaskCardComponent,
    NoDataFoundComponent,
  ],
  templateUrl: './tasks-list.component.html',
  styleUrl: './tasks-list.component.scss',
})
export class TasksListComponent {
  allTasks: WritableSignal<Task[]> = signal([]);
  activeStatus: WritableSignal<string> = signal('');

  pendingTasks: Signal<Task[]> = computed(() =>
    this.allTasks().filter((task) => task.status === 'Pending')
  );
  inProgressTasks: Signal<Task[]> = computed(() =>
    this.allTasks().filter((task) => task.status === 'InProgress')
  );
  completedTasks: Signal<Task[]> = computed(() =>
    this.allTasks().filter((task) => task.status === 'Completed')
  );

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.getTasks();
  }

  getTasks() {
    this.allTasks.set(this.dashboardService.getTasks());
  }

  onDrop(event: any) {
    const newArray = this.allTasks()?.map((task) => {
      return task.id === +event?.item?.element?.nativeElement?.id
        ? {
            ...task,
            status: event?.container?.id,
          }
        : task;
    });
    this.dashboardService.updateTasks(newArray);
    this.getTasks();
  }

  deleteTask(task: any) {
    console.log('Delete Task:', task);
    // Implement delete functionality here
  }
}
