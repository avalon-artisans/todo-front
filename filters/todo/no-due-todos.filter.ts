import {TodoItem, TodoStatus} from '@/types/todo';
import BaseFilter from '@/filters/base.filter';
import _ from 'lodash';

export default class NoDueTodosFilter<T extends TodoItem> extends BaseFilter<T> {
  applyFilter(items: T[], options?: Record<string, any>): T[] {
    return _.filter(items, (item) => {
      return (!item.due_date || item.due_date.length === 0) && item.status !== TodoStatus.DONE;
    });
  }
}