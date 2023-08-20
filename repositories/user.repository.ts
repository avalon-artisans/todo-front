import BaseRepository from '@/repositories/base.repository';
import {RegisterFormData} from "@/types/user";

type ParseUserFormData = Omit<RegisterFormData, 'retypePassword'>;

/**
 * UserRepository class
 * @author Kenneth Sumang
 */
export default class UserRepository extends BaseRepository {
  constructor() {
    super();
    this.class = 'Todo';
  }

  /**
   * Registers a new user
   * @param formData
   */
  async register(formData: ParseUserFormData): Promise<{ success: boolean, code: number, message: string, data?: Record<string, any> }> {
    const response = await this.post(formData);
    if (response.statusCode === 201) {
      return {
        success: true,
        code: 201,
        message: 'Successfully registered.',
        data: response.data,
      };
    }

    return {
      success: false,
      code: response.statusCode,
      message: response.message,
    };
  }
}