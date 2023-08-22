import { parseServerConfig } from '@/providers/parse-server.provider';
import axios from 'axios';

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

  prepareRequestParams(sessionToken?: string, objectId?: string): { url: string; headers: Record<string, string> } {
    let url = this.serverUrl + '/classes/' + this.class;
    if (objectId) {
      url += `/${objectId}`;
    }

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'X-Parse-Application-Id': this.applicationId,
      'X-Parse-REST-API-Key': this.restApiKey
    };

    if (sessionToken) {
      headers['X-Parse-Session-Token'] = sessionToken;
    }

    return {
      url,
      headers,
    };
  }

  /**
   * Sends a login request to Parse server
   * @param   {{username: string, password: string}} credentials
   * @returns {Promise<any>}
   */
  async login(credentials: { username: string, password: string }): Promise<any> {
    const url = this.serverUrl + '/login';
    return axios.post(url, credentials, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Parse-Application-Id': this.applicationId,
        'X-Parse-REST-API-Key': this.restApiKey,
        'X-Parse-Revocable-Session': '1',
      },
    });
  }

  /**
   * Requests a post endpoint to Parse Server
   * @param   {Record<string, any>} data
   * @param   {string}              sessionToken
   * @returns {Promise<any>}}
   */
  async post(data: Record<string, any>, sessionToken?: string): Promise<any> {
    const requestParams = this.prepareRequestParams(sessionToken);
    return axios.post(requestParams.url, data, {
      method: 'POST',
      headers: requestParams.headers,
    });
  }

  /**
   * Fetches all in given class
   * @param   {string} sessionToken
   * @returns {Promise<any>}
   */
  async fetchAll(sessionToken?: string): Promise<any> {
    const requestParams = this.prepareRequestParams(sessionToken);
    return axios.get(requestParams.url, {
      headers: requestParams.headers,
    });
  }

  /**
   * Fetches specific objectId in given class
   * @param   {string}  objectId
   * @param   {string?} sessionToken
   * @returns {Promise<any>}}
   */
  async fetchSpecific(objectId: string, sessionToken?: string): Promise<any> {
    const requestParams = this.prepareRequestParams(sessionToken, objectId);
    return axios.get(requestParams.url, {
      headers: requestParams.headers,
    });
  }
}