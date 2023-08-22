import { TodoItem, TodoStatus } from '@/types/todo';
import {Checkbox, List, ListItem, ListItemPrefix} from '@material-tailwind/react';

/**
 * TodoListProps structure
 */
interface TodoListProps {
  items: TodoItem[];
}

export default function TodoList({ items }: TodoListProps) {
  return (
    <List className="p-0">
      {
        items.map((todoItem) => {
          return (
            <ListItem
              className="group font-normal py-1 leading-none"
              key={todoItem.objectId}
              ripple={false}
            >
              <ListItemPrefix>
                <Checkbox
                  checked={todoItem.status === TodoStatus.DONE}
                  containerProps={{ className: 'p-0' }}
                  onChange={() => {}}
                />
              </ListItemPrefix>
              <a href={`/todo/${todoItem.objectId}`}>
                {todoItem.title}
              </a>
            </ListItem>
          );
        })
      }
    </List>
  );
}