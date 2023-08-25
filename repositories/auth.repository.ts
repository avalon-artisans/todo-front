import BaseRepository from '@/repositories/base.repository';
import { RepositoryResponse } from '@/types';
import type { LoginCredentials } from '@/types/auth';
import { catchAxiosError } from '@/decorators/catch-error.decorator';

export default class AuthRepository extends BaseRepository {
  /**
   * Logs in user using Parse endpoint
   * @param   {LoginCredentials} credentials
   * @returns {RepositoryResponse}
   */
  @catchAxiosError()
  async loginUser(credentials: LoginCredentials): Promise<RepositoryResponse<any>> {
    const response = await this.login(credentials);
    if (response.status === 200) {
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