import {TodoItem} from '@/types/todo';
import {Typography} from '@material-tailwind/react';
import TodoList from '@/components/todo/TodoList';
import CompletedTodosFilter from '@/filters/todo/completed-todos.filter';
import DueTodayTodosFilter from '@/filters/todo/due-today-todos.filter';
import OverdueTodosFilter from '@/filters/todo/overdue-todos.filter';
import UpcomingTodosFilter from '@/filters/todo/upcoming-todos.filter';
import NoDueTodosFilter from '@/filters/todo/no-due-todos.filter';
import dayjs from 'dayjs';

import utc from 'dayjs/plugin/utc';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import NotStartedTodosFilter from "@/filters/todo/not-started-todos.filter";

dayjs.extend(utc);
dayjs.extend(customParseFormat);

interface DashboardProps {
  todos?: TodoItem[];
}

/**
 * Dashboard component
 * @author Kenneth Sumang
 */
export default function Dashboard(props: DashboardProps) {
  const todoItems = props.todos;

  function filterItemsDone(): TodoItem[] {
    return new CompletedTodosFilter().applyFilter(todoItems as TodoItem[]);
  }

  function filterItemsTodo(): TodoItem[] {
    return new NotStartedTodosFilter().applyFilter(todoItems as TodoItem[]);
  }

  const itemGroups: Record<string, TodoItem[]> = {
    'Done': filterItemsDone(),
    'Todo': filterItemsTodo(),
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