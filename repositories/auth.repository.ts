import BaseRepository from '@/repositories/base.repository';

export default class AuthRepository extends BaseRepository {
  async loginUser(credentials: {username: string, password: string}): Promise<{ success: boolean, code: number, message: string, data?: Record<string, any> }> {
    const response = await this.login(credentials);
    if (response.statusCode === 201) {
      return {
        success: true,
        code: 200,
        message: 'Successfully logged in.',
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