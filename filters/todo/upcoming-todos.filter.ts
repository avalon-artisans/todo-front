import {TodoItem, TodoStatus} from '@/types/todo';
import BaseFilter from '@/filters/base.filter';
import _ from 'lodash';
import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';

dayjs.extend(isSameOrAfter);

export default class UpcomingTodosFilter<T extends TodoItem> extends BaseFilter<T> {
  applyFilter(items: T[], options?: Record<string, any>): T[] {
    return _.filter(items, (item) => {
      if (!item.due_date || item.due_date.length === 0) {
        return false;
      }

      const dueDate = dayjs(item.due_date, 'YYYY-MM-DD HH:mm:ss');
      const tomorrow = dayjs().add(1, 'day').startOf('day');

      return dueDate.isSameOrAfter(tomorrow) && item.status !== TodoStatus.DONE;
    });
  }
}