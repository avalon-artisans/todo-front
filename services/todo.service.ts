import {TodoFormData, TodoItem} from '@/types/todo';
import axios, {AxiosResponse, HttpStatusCode} from 'axios';
import {ErrorResponseData, SuccessResponseData} from '@/types';
import CreateTodoValidator from "@/validators/todo/create.validator";

/**
 * TodoService class
 * @author Kenneth Sumang
 */
export default class TodoService {
  /**
   * Fetches todos
   * @returns {Promise<TodoItem[]>}
   */
  async fetchTodos(): Promise<{ success: boolean; data: TodoItem[]; message: string }> {
    const response = await this.requestFetchTodos();
    if (response.status !== HttpStatusCode.Ok) {
      const errorResponse = response as AxiosResponse<ErrorResponseData>;
      return {
        success: false,
        message: errorResponse.data.errors.detail,
        data: [],
      };
    }

    const successResponse = response as AxiosResponse<SuccessResponseData>;
    return {
      success: true,
      message: 'Login successful.',
      data: successResponse.data.data,
    };
  }

  /**
   * Creates todo
   * @param   {Record<string, any>} formData
   * @returns {Promise<{ success: boolean; data?: TodoItem[]; message: string }>}
   */
  async processCreateTodo(formData: Record<string, any>): Promise<{ success: boolean; data?: TodoItem; message: string }> {
    const validationResponse = this.validateFormData(formData);
    if (!validationResponse.success) {
      return {
        success: false,
        message: validationResponse.message
      }
    }

    const data = formData as TodoFormData;
    const apiResponse = await this.requestCreateTodo(data);
    if (apiResponse.status !== HttpStatusCode.Created) {
      const errorResponse = apiResponse as AxiosResponse<ErrorResponseData>;
      return {
        success: false,
        message: errorResponse.data.errors.detail,
      };
    }

    const successResponse = apiResponse as AxiosResponse<SuccessResponseData>;
    return {
      success: true,
      message: 'Successfully created todo.',
      data: successResponse.data.data,
    };
  }

  /**
   * Checks if the form data is valid.
   * @param {any} data
   * @returns {success: boolean, message: string}
   */
  validateFormData(data: any): {success: boolean, message: string} {
    const validator = new CreateTodoValidator();

    const result = validator.validate(data);
    if (!result.valid) {
      return {
        success: false,
        message: result.message || ''
      }
    }

    return { success: true, message: '' };
  }

  /**
   * Requests fetching of todos in API
   * @returns {Promise<AxiosResponse<SuccessResponseData|ErrorResponseData>>}
   */
  async requestFetchTodos(): Promise<AxiosResponse<SuccessResponseData|ErrorResponseData>> {
    return axios({
      method: 'GET',
      url: '/api/todo/fetch',
      headers: {
        'Content-Type': 'application/json',
      }
    });
  }

  /**
   * Requests create of todo in API
   * @param   {TodoFormData} data
   * @returns {Promise<AxiosResponse<SuccessResponseData|ErrorResponseData>>}
   */
  async requestCreateTodo(data: TodoFormData): Promise<AxiosResponse<SuccessResponseData|ErrorResponseData>> {
    return axios({
      method: 'POST',
      url: '/api/todo/create',
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    });
  }

}