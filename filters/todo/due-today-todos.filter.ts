import {TodoItem, TodoStatus} from '@/types/todo';
import BaseFilter from '@/filters/base.filter';
import _ from 'lodash';
import dayjs from 'dayjs';

export default class DueTodayTodosFilter<T extends TodoItem> extends BaseFilter<T> {
  applyFilter(items: T[], options?: Record<string, any>): T[] {
    return _.filter(items, (item) => {
      if (item.due_date && item.due_date.length > 0) {
        return item.due_date!.includes(dayjs().utc().format('YYYY-MM-DD')) && item.status !== TodoStatus.DONE;
      }
      return false;
    });
  }
}