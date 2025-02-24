export interface Task {
  id:          string;
  title:       string;
  description: string;
  completed:   boolean;
  priority:    string;
  due_date:    Date;
  created_at:  Date;
}

export interface UseTasksProps {
  priority?: number
  isCompleted?: boolean
  page?: number
  size?: number
}
