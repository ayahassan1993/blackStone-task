import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
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
import { Router } from '@angular/router';

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

  minDate: string = new Date().toISOString().split('T')[0];
  users = [
    { id: 1, name: 'User 1' },
    { id: 2, name: 'User 2' },
    { id: 3, name: 'User 3' },
  ];
  priorities = ['Low', 'Medium', 'High'];

  constructor(
    private dashboardServ: DashboardService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.taskForm = new FormGroup({
      taskName: new FormControl('', [
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

  // Submit handler
  onSubmit() {
    this.dashboardServ.addTask(this.taskForm.getRawValue());
    this.router.navigate(['/']);
  }
}
