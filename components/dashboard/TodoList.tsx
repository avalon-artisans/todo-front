import { TodoItem, TodoStatus } from '@/types/todo';
import {Card, CardBody, Checkbox, List, ListItem, ListItemPrefix} from '@material-tailwind/react';
import {formatDateToHumanReadable} from "@/libraries/date.library";

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
              className="group font-normal leading-none p-0"
              key={todoItem.objectId}
              ripple={false}
            >
              <Card
                className="mt-1 w-full"
                shadow={false}
              >
                <CardBody className="flex flex-row px-0 py-2">
                  <ListItemPrefix>
                    <Checkbox
                      checked={todoItem.status === TodoStatus.DONE}
                      containerProps={{ className: 'p-0' }}
                      onChange={() => {}}
                    />
                  </ListItemPrefix>
                  <div className="flex flex-col">
                    <a href={`/todo/${todoItem.objectId}`}>
                      <b>{todoItem.title}</b>
                    </a>
                    {
                      (todoItem.description && todoItem.description.length !== 0)
                        ? <small>{todoItem.description}</small>
                        : <small>No Description.</small>
                    }
                    <br />
                    {
                      (todoItem.due_date && todoItem.due_date.length !== 0)
                        ? <small>{ formatDateToHumanReadable(todoItem.due_date) }</small>
                        : <small>No due date set.</small>
                    }
                  </div>
                </CardBody>
              </Card>

            </ListItem>
          );
        })
      }
    </List>
  );
}