import { TodoItem, TodoStatus } from '@/types/todo';
import { Card, CardBody, Checkbox, List, ListItem, ListItemPrefix } from '@material-tailwind/react';
import { formatDateToHumanReadable, isDateBeforeNow } from '@/libraries/date.library';
import React from 'react';
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import TodoService from "@/services/todo.service";
import {useRouter} from "next/router";

/**
 * TodoListProps structure
 */
interface TodoListProps {
  items: TodoItem[];
}

export default function TodoList({ items }: TodoListProps) {
  const router = useRouter();

  function displayDueDateString(status: string, dueDate?: string|null): React.ReactNode {
    if (!dueDate || dueDate.length === 0) {
      return <small>No Due Date set.</small>
    }

    const humanReadableDate = formatDateToHumanReadable(dueDate as string);
    if (isDateBeforeNow(dueDate as string) && status === TodoStatus.TODO) {
      return (
        <small className="flex flex-row text-red-800">
          <ExclamationCircleIcon height="15" />
          <p className="pt-0.5 pl-1">{ humanReadableDate }</p>

        </small>
      );
    }

    return <small>{ humanReadableDate }</small>;
  }

  async function handleToggleTodoStatus(objectId: string, isChecked: boolean) {
    const todoService = new TodoService();
    const response = await todoService.processTodoStatusToggle(objectId, isChecked);
    if (!response.success) {
      console.error(response);
    }

    // re-trigger server-side props
    router.replace(router.asPath);
  }

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
                      onChange={(e) => handleToggleTodoStatus(todoItem.objectId, e.target.checked)}
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
                    { displayDueDateString(todoItem.status, todoItem.due_date) }
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