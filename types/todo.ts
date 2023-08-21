enum TodoStatus {
  TODO = 'todo',
  DOING = 'doing',
  DONE = 'done',
};

/**
 * TodoItem structure
 */
interface TodoItem {
  objectId: number;
  title: string;
  description?: string|null;
  status: TodoStatus;
  createdAt: string;
  updatedAt: string;
  user: any;
  parent?: string|null;
}

export type { TodoItem, TodoStatus };