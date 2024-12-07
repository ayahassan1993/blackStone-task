import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { Task } from '../../models/task.model';

@Component({
  selector: 'task-card',
  standalone: true,
  imports: [CommonModule, DragDropModule],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.scss',
})
export class TaskCardComponent {
  task = input.required<Task>();
  taskAction = output<string>();
}
