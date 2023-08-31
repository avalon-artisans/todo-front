import BaseFilter from '@/filters/base.filter';
import _ from 'lodash';
import {TodoItem, TodoStatus} from "@/types/todo";

export default class CompletedTodosFilter<T extends TodoItem> extends BaseFilter<T> {
  applyFilter(items: T[]): T[] {
    return _.filter(items, (item) => {
      return item.status === TodoStatus.DONE;
    });
  }
}