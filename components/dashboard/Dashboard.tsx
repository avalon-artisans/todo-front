import {useEffect, useState} from 'react';
import TodoService from '@/services/todo.service';
import {TodoItem, TodoStatus} from '@/types/todo';
import {Typography} from '@material-tailwind/react';
import TodoList from '@/components/dashboard/TodoList';
import {useDispatch} from 'react-redux';
import {changeAlertColor, changeAlertVisibility, changeMessage} from "@/store/slices/alertSlice";
import _ from 'lodash';
import dayjs from 'dayjs';

import utc from 'dayjs/plugin/utc';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import {ServiceResponse} from "@/types";

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

        setTodoItems(data.data as TodoItem[]);
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
  async function fetchTodos(): Promise<ServiceResponse<TodoItem[]>> {
    const todoService = new TodoService();
    return todoService.fetchTodos();
  }

  function filterItemsDone(): TodoItem[] {
    return _.filter(todoItems, (item) => {
      return item.status === TodoStatus.DONE;
    });
  }

  function filterItemsDueToday(): TodoItem[] {
    return _.filter(todoItems, (item) => {
      if (item.due_date && item.due_date.length > 0) {
        return item.due_date!.includes(dayjs().utc().format('YYYY-MM-DD')) && item.status !== TodoStatus.DONE;
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

      return timeNow.isAfter(dueDate) && item.status !== TodoStatus.DONE;
    });
  }

  function filterItemsUpcoming(): TodoItem[] {
    return _.filter(todoItems, (item) => {
      if (!item.due_date || item.due_date.length === 0) {
        return false;
      }

      const dueDate = dayjs(item.due_date, 'YYYY-MM-DD HH:mm:ss');
      const timeNow = dayjs();

      return timeNow.isBefore(dueDate) && item.status !== TodoStatus.DONE;
    });
  }

  function filterNoDue(): TodoItem[] {
    return _.filter(todoItems, (item) => {
      return (!item.due_date || item.due_date.length === 0) && item.status !== TodoStatus.DONE;
    });
  }

  const itemGroups: Record<string, TodoItem[]> = {
    'Done': filterItemsDone(),
    'Overdue': filterItemsOverdue(),
    'Today': filterItemsDueToday(),
    'Upcoming': filterItemsUpcoming(),
    'No Due Date': filterNoDue(),
  };
  return (
    <>
      {
        Object.keys(itemGroups).map((itemKey) => {
          if (itemGroups[itemKey].length !== 0) {
            return (
              <div
                key={itemKey}
                className="mb-5"
              >
                <Typography variant="h5" className="mb-1">
                  {itemKey}
                </Typography>
                <TodoList items={itemGroups[itemKey]} />
              </div>
            );
          }
        })
      }
    </>
  );
}