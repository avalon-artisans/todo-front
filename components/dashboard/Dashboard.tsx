import { useState, useEffect } from 'react';
import TodoService from '@/services/todo.service';
import {TodoItem} from '@/types/todo';
import {Typography} from '@material-tailwind/react';
import TodoList from '@/components/dashboard/TodoList';
import { useDispatch } from 'react-redux';
import { changeAlertColor, changeAlertVisibility, changeMessage } from "@/store/slices/alertSlice";
import _ from 'lodash';
import dayjs from 'dayjs';

import utc from 'dayjs/plugin/utc';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(utc);
dayjs.extend(customParseFormat);

/**
 * Dashboard component
 * @author Kenneth Sumang
 */
export default function Dashboard() {
  const [todoItems, setTodoItems] = useState<TodoItem[]>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchTodos()
      .then((data) => {
        if (!data.success) {
          dispatch(changeMessage(data.message));
          dispatch(changeAlertColor('red'));
          dispatch(changeAlertVisibility(true));
          return;
        }

        setTodoItems(data.data);
      })
      .catch(() => {
        dispatch(changeMessage('A server error has occurred.'));
        dispatch(changeAlertColor('red'));
        dispatch(changeAlertVisibility(true));
      })
  }, []);

  /**
   * Fetch todos
   * @returns {Promise<Object[]>}
   */
  async function fetchTodos(): Promise<{ success: boolean; data: TodoItem[]; message: string }> {
    const todoService = new TodoService();
    return todoService.fetchTodos();
  }

  function filterItemsDueToday(): TodoItem[] {
    return _.filter(todoItems, (item) => {
      if (item.due_date && item.due_date.length > 0) {
        return item.due_date!.includes(dayjs().utc().format('YYYY-MM-DD'));
      }
      return false;
    });
  }

  function filterItemsOverdue(): TodoItem[] {
    return _.filter(todoItems, (item) => {
      if (!item.due_date || item.due_date.length === 0) {
        return false;
      }

      const dueDate = dayjs(item.due_date, 'YYYY-MM-DD HH:mm:ss');
      const timeNow = dayjs();

      return timeNow.isAfter(dueDate);
    });
  }

  function filterItemsUpcoming(): TodoItem[] {
    return _.filter(todoItems, (item) => {
      if (!item.due_date || item.due_date.length === 0) {
        return false;
      }

      const dueDate = dayjs(item.due_date, 'YYYY-MM-DD HH:mm:ss');
      const timeNow = dayjs();

      return timeNow.isBefore(dueDate);
    });
  }

  function filterNoDue(): TodoItem[] {
    return _.filter(todoItems, (item) => {
      return !item.due_date || item.due_date.length === 0;


    });
  }

  return (
    <>
      <div className="mb-5">
        <Typography variant="h5" className="mb-1">Overdue</Typography>
        <TodoList items={filterItemsOverdue()} />
      </div>
      <div>
        <Typography variant="h5" className="mb-1">Today</Typography>
        <TodoList items={filterItemsDueToday()} />
      </div>
      <div>
        <Typography variant="h5" className="mb-1">Upcoming</Typography>
        <TodoList items={filterItemsUpcoming()} />
      </div>
      <div>
        <Typography variant="h5" className="mb-1">No Due Date</Typography>
        <TodoList items={filterNoDue()} />
      </div>
    </>
  );
}