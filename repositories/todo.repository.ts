import BaseRepository from '@/repositories/base.repository';

export default class TodoRepository extends BaseRepository {
  constructor() {
    super();
    this.class = 'Todo';
  }

  /**
   * Creates a new todo
   * @param formData
   */
  async create(formData: Record<string, any>): Promise<{ success: boolean, code: number, message: string, data?: Record<string, any> }> {
    const response = await this.post(formData);
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