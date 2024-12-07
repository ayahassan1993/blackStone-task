import { CommonModule } from '@angular/common';
import { Component, signal, WritableSignal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { DashboardService } from '../../services/dashboard.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.scss',
})
export class AddTaskComponent {
  taskForm: FormGroup = new FormGroup({});
  task: WritableSignal<Task> = signal({} as Task);
  editViewMode: WritableSignal<string> = signal('');

  minDate: string = new Date().toISOString().split('T')[0];
  users = [
    { id: 1, name: 'User 1' },
    { id: 2, name: 'User 2' },
    { id: 3, name: 'User 3' },
  ];
  priorities = ['Low', 'Medium', 'High'];

  constructor(
    private dashboardServ: DashboardService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initForm();
    const id = this.activeRoute.snapshot.params?.['id'];
    id ? this.getTask(id) : null;
  }

  getTask(id: number) {
    this.task.set(this.dashboardServ.getTask(id) as Task);
    this.editViewMode.set(this.router.url?.includes('edit') ? 'edit' : 'view');
    console.log(this.task());
    this.taskForm.patchValue(this.task());
    this.editViewMode() == 'view' ? this.taskForm.disable() : null;
  }

  initForm() {
    this.taskForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.maxLength(50),
      ]),
      description: new FormControl('', [Validators.maxLength(200)]),
      priority: new FormControl('Low', Validators.required),
      status: new FormControl('Pending', Validators.required),
      assignedTo: new FormControl('', Validators.required),
      dueDate: new FormControl('', Validators.required),
    });
  }

  compareWith(item1: any, item2: any) {
    return item1.id == item2.id;
  }

  // Submit handler
  onSubmit() {
    console.log(this.editViewMode() == 'edit');
    this.editViewMode() == 'edit'
      ? this.dashboardServ.updateTask({
          ...this.taskForm.getRawValue(),
          id: this.task()?.id,
        })
      : this.dashboardServ.addTask(this.taskForm.getRawValue());
    this.router.navigate(['/']);
  }
}
