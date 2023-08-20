import { parseServerConfig } from '@/providers/parse-server.provider';

/**
 * BaseRepository class
 * @author Kenneth Sumang
 */
export default class BaseRepository {
  serverUrl: string = '';
  applicationId: string = '';
  restApiKey: string = '';
  class: string = '';

  constructor() {
    this.serverUrl = parseServerConfig.serverUrl;
    this.applicationId = parseServerConfig.applicationId;
    this.restApiKey = parseServerConfig.restApiKey;
  }

  /**
   * Sends a login request to Parse server
   * @param   {{username: string, password: string}} credentials
   * @returns {Promise<any>}
   */
  async login(credentials: { username: string, password: string }): Promise<any> {
    const url = this.serverUrl + '/login';
    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Parse-Application-Id': this.applicationId,
        'X-Parse-REST-API-Key': this.restApiKey
      },
      body: JSON.stringify(credentials),
    });
  }

  /**
   * Requests a post endpoint to Parse Server
   * @param   {Record<string, any>} data
   * @returns {Promise<any>}}
   */
  async post(data: Record<string, any>): Promise<any> {
    const url = this.serverUrl + '/classes/' + this.class;
    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Parse-Application-Id': this.applicationId,
        'X-Parse-REST-API-Key': this.restApiKey
      },
      body: JSON.stringify(data),
    });
  }
}