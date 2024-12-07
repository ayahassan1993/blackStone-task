import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  input,
  output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { Task } from '../../models/task.model';
import { RouterModule } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DashboardService } from '../../services/dashboard.service';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'task-card',
  standalone: true,
  imports: [CommonModule, DragDropModule, RouterModule, MatDialogModule],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.scss',
})
export class TaskCardComponent {
  @ViewChild('deleteConfirmation') deleteConfirmation!: TemplateRef<any>;
  @Input() task: Task = {} as Task;
  updateList = output<boolean>();

  constructor(
    private dialog: MatDialog,
    private dashboardServ: DashboardService
  ) {}

  confirmDelete(): void {
    this.dialog.open(this.deleteConfirmation, {
      data: {},
    });
  }

  deleteTask(): void {
    this.dashboardServ.deleteTask(this.task);
    this.updateList.emit(true);
  }
}
