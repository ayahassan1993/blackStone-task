export interface Task {
  id: number;
  name: string;
  description: string;
  priority: string;
  status: string;
  assignedTo: { id: number; name: string };
  dueDate: string;
}
