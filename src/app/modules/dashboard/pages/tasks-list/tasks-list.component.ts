import { CommonModule } from '@angular/common';
import {
  Component,
  computed,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { TaskCardComponent } from '../../components/task-card/task-card.component';
import { Task } from '../../models/task.model';
import { DashboardService } from '../../services/dashboard.service';
import { NoDataFoundComponent } from '../../../../shared/components/no-data-found/no-data-found.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { UsersService } from '../../services/users.service';
import { User } from '../../models/user.modal';

@Component({
  selector: 'app-tasks-list',
  standalone: true,
  imports: [
    CommonModule,
    DragDropModule,
    TaskCardComponent,
    NoDataFoundComponent,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    CdkAccordionModule,
  ],
  templateUrl: './tasks-list.component.html',
  styleUrl: './tasks-list.component.scss',
})
export class TasksListComponent {
  allTasks: WritableSignal<Task[]> = signal([]);
  activeStatus: WritableSignal<string> = signal('');

  pendingTasks: Signal<Task[]> = computed(() => {
    return this.allTasks().filter((task) => task.status === 'Pending');
  });
  inProgressTasks: Signal<Task[]> = computed(() =>
    this.allTasks().filter((task) => task.status === 'InProgress')
  );
  completedTasks: Signal<Task[]> = computed(() =>
    this.allTasks().filter((task) => task.status === 'Completed')
  );

  filterForm: FormGroup = new FormGroup({
    searchKey: new FormControl(''),
    status: new FormControl(''),
    priority: new FormControl(''),
    assignedTo: new FormControl(''),
  });

  users: WritableSignal<User[]> = signal([]);
  priorities = ['Low', 'Medium', 'High'];
  constructor(
    private dashboardService: DashboardService,
    private userServ: UsersService
  ) {}

  ngOnInit(): void {
    this.getTasks();
    this.getUsers();
    this.filterForm.valueChanges.subscribe((value) => {
      this.allTasks.set([...this.dashboardService.filterTasks(value)]);
    });
  }

  getUsers() {
    this.users.set(this.userServ.getUsers());
  }

  getTasks() {
    this.allTasks.set([...this.dashboardService.getTasks()]);
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
}
