import axios from 'axios'
import { transform, isEmpty, camelCase } from 'lodash'

interface Axios {
  get(url: string): any;
  post(url: string, params: any): any;
  put(url: string, params: any): any;
  delete(url: string): any;
}
interface AxiosResponse {
  data: any[];
}

function serialize(object: any) {
  const arr: string[] = []
  Object.keys(object).forEach((key) => arr.push(`${encodeURIComponent(key)}=${encodeURIComponent(object[key])}`))
  return `?${arr.join('&')}`
}

export default class ApiService implements Axios {
  private axios: Axios;

  private error: Error | null = null

  constructor(baseURL: string = process.env.VUE_APP_API) {
    this.axios = axios.create({
      baseURL,
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }

  public async get(url: string, params: any = {}) {
    const query = params ? serialize(params) : window.location.search
    return this.return(this.axios.get(url + query))
  }

  public async post(url: string, params: any = {}) {
    return this.return(this.axios.post(url, params))
  }

  public async put(url: string, params: any) {
    return this.return(this.axios.put(url, params))
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
