enum TodoStatus {
  TODO = 'todo',
  DOING = 'doing',
  DONE = 'done',
};

/**
 * TodoItem structure
 */
interface TodoItem {
  objectId: string;
  title: string;
  description?: string|null;
  status: TodoStatus;
  createdAt: string;
  updatedAt: string;
  user: any;
  parent?: string|null;
  due_date?: string|null;
}

interface TodoFormData {
  title: string;
  description?: string|null;
  due_date?: string|null;
  timezone: string;
}

export type { TodoItem, TodoFormData };
export { TodoStatus };