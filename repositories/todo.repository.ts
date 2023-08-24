import BaseRepository from '@/repositories/base.repository';
import type { RepositoryResponse } from '@/types';
import {catchAxiosError} from "@/decorators/catch-error.decorator";

export default class TodoRepository extends BaseRepository {
  constructor() {
    super();
    this.class = 'Todo';
  }

  /**
   * Fetches specific todo
   * @param   {string}  objectId
   * @param   {string?} sessionToken
   * @returns {Promise<RepositoryResponse>}
   */
  @catchAxiosError()
  async fetchSpecificTodo(objectId: string, sessionToken?: string): Promise<RepositoryResponse<any>> {
    const response = await this.fetchSpecific(objectId, sessionToken);

    if (response.status === 200) {
      return {
        success: true,
        code: 200,
        message: 'Successfully fetched.',
        data: response.data,
      };
    }

    return {
      success: false,
      code: response.status,
      message: response.message,
    };
  }

  /**
   * Fetches all todos
   * @param   {string?} sessionToken
   * @returns {Promise<RepositoryResponse>}
   */
  @catchAxiosError()
  async fetchAllTodos(sessionToken?: string): Promise<RepositoryResponse<any>> {
    const response = await this.fetchAll(sessionToken);
    if (response.status === 200) {
      return {
        success: true,
        code: 200,
        message: 'Successfully fetched.',
        data: response.data.results,
      };
    }

    return {
      success: false,
      code: response.status,
      message: response.message,
    };
  }

  /**
   * Creates a new todo
   * @param {Record<string, any> } formData
   * @param {string}               sessionToken
   */
  @catchAxiosError()
  async create(formData: Record<string, any>, sessionToken?: string): Promise<RepositoryResponse<any>> {
    const response = await this.post(formData, sessionToken);
    if (response.statusCode === 201) {
      return {
        success: true,
        code: 201,
        message: 'Successfully created.',
        data: response.data,
      };
    }

    return {
      success: false,
      code: response.status,
      message: response.message,
    };
  }
}