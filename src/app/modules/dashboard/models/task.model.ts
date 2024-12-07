import { User } from './user.modal';

export interface Task {
  id: number;
  name: string;
  description: string;
  priority: string;
  status: string;
  assignedTo: User;
  dueDate: string;
}
