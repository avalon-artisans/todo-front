import { TodoItem } from '@/types/todo';
import {Typography} from '@material-tailwind/react';
import dayjs, {Dayjs} from "dayjs";

interface TodoItemProps {
  todo?: TodoItem;
}
export default function ShowTodoItem(props: TodoItemProps) {
  let formattedDueDate: string|null = null;
  if (props.todo?.due_date && props.todo?.due_date.length !== 0) {
    formattedDueDate = dayjs(props.todo?.due_date, 'YYYY-MM-DD HH:mm:ss').format('dddd, MMMM D, YYYY h:mm A');
  }
  return (
    <>
      <Typography variant="h5" className="mb-6">{props.todo?.title}</Typography>
      {
        (!props.todo?.description || props.todo.description.length === 0)
          ? <></>
          : <p>{props.todo.description}</p>
      }
      {
        (formattedDueDate === null)
          ? <p>No Due Date set.</p>
          : <p>
            <b>Due Date: </b>
            {formattedDueDate}
          </p>
      }
    </>
  );
}