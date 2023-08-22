import { TodoItem } from '@/types/todo';
import {Typography} from "@material-tailwind/react";

interface TodoItemProps {
  todo?: TodoItem;
}
export default function TodoItem(props: TodoItemProps) {
  return (
    <>
      <Typography variant="h5" className="mb-6">{props.todo?.title}</Typography>
      {
        (!props.todo?.description || props.todo.description.length === 0)
          ? <></>
          : <p>{props.todo.description}</p>
      }
      {
        (!props.todo?.due_date || props.todo?.due_date.length === 0)
          ? <p>No Due Date set.</p>
          : <p>
            <b>Due Date:</b>
            {props.todo?.due_date}
          </p>
      }
    </>
  );
}