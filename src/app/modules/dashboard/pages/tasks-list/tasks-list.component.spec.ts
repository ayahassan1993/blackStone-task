import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksListComponent } from './tasks-list.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('TasksListComponent', () => {
  let component: TasksListComponent;
  let fixture: ComponentFixture<TasksListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TasksListComponent, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(TasksListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should set allTasks correctly if valid tasks are returned', () => {
    const validTasks = [
      {
        id: 1,
        name: 'Task 1',
        description: 'Task 1 description',
        priority: 'Low',
        status: 'Pending',
        assignedTo: { id: 1, name: 'User 1' },
        dueDate: '2024-12-07',
      },
    ];
    spyOn(component['dashboardService'], 'getTasks').and.returnValue(
      validTasks
    );

    component.getTasks();

    expect(component.allTasks()).toEqual(validTasks);
  });
});
