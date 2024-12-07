import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTaskComponent } from './add-task.component';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('AddTaskComponent', () => {
  let component: AddTaskComponent;
  let fixture: ComponentFixture<AddTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddTaskComponent, RouterTestingModule, BrowserAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(AddTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should initialize the form with default values', () => {
    fixture.detectChanges();

    const nameControl = component.taskForm.get('name');
    const descriptionControl = component.taskForm.get('description');
    const priorityControl = component.taskForm.get('priority');
    const statusControl = component.taskForm.get('status');
    const assignedToControl = component.taskForm.get('assignedTo');
    const dueDateControl = component.taskForm.get('dueDate');

    expect(nameControl?.value).toBe('');
    expect(descriptionControl?.value).toBe('');
    expect(priorityControl?.value).toBe('Low');
    expect(statusControl?.value).toBe('Pending');
    expect(assignedToControl?.value).toBe('');
    expect(dueDateControl?.value).toBe('');

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
