/**
 * Base class for filter
 */
export default class BaseFilter<T> {
  /**
   * Applies the filter
   * @param   {any[]} items
   * @param   {Record<string, any>} options
   * @returns {any[]}
   */
  applyFilter(items: T[], options?: Record<string, any>): T[] {
    return [];
  }
}