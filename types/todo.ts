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
  due_date?: string|null;
}

export type { TodoItem };
export { TodoStatus };