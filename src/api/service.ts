// eslint-disable-next-line no-unused-vars
import axios, { AxiosInstance } from 'axios'
import { transform, isEmpty, camelCase } from 'lodash'
import querystring from 'querystring'

interface AxiosResponse {
  data: any[];
}

export default class Service {
  private axios: AxiosInstance;

  private error: Error | null = null

  constructor(baseURL: string) {
    this.axios = axios.create({
      baseURL,
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }

  public async get(url: string, params: querystring.ParsedUrlQueryInput | string = '') {
    const query = typeof params === 'string'
      ? params
      : `?${querystring.stringify(params)}`
    const ret = this.return(this.axios.get(url + query))
    return ret
  }

  public async post(url: string, params: any = {}) {
    return this.return(this.axios.post(url, params))
  }

  public async put(url: string, params: any = {}) {
    return this.return(this.axios.put(url, params))
  }

  public async patch(url: string, params: any = {}) {
    return this.return(this.axios.patch(url, params))
  }

  public async delete(url: string) {
    return this.return(this.axios.delete(url))
  }

  private async return(response: Promise<AxiosResponse>) {
    return response
      .then((reply) => this.camelCaseKeys(reply.data))
      .catch((error) => this.handleError(error))
  }

  private camelCaseKeys(object: any): any {
    return transform(object, (result: any, value: any, key: string) => {
      if (typeof value === 'object' && !isEmpty(value)) {
        value = this.camelCaseKeys(value)
      }
      result[camelCase(key)] = value
    })
  }

  // TODO: Error handling
  private handleError(error: Error) {
    this.error = error
    console.error(error)
    return error
  }
}
