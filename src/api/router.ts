import axios, { AxiosInstance, AxiosResponse, AxiosRequestConfig } from 'axios'
import { transform, isEmpty, camelCase } from 'lodash'
import querystring from 'querystring'

interface RouteParameters<payload = object> {
  params?: object | undefined
  payload?: payload
}

export class RouteNotFoundException extends Error {
  constructor(message: string) {
    super(`\n\nRoute Not Found Exception: ${message}`)
    Object.setPrototypeOf(this, RouteNotFoundException.prototype)
  }
}

export class ParamNotFoundException extends Error {
  constructor(message: string) {
    super(`\n\nParameter Not Found Exception: ${message}`)
    Object.setPrototypeOf(this, ParamNotFoundException.prototype)
  }
}

export default class Router {
  protected routes: any

  protected client: AxiosInstance

  constructor(routes: any, config?: AxiosRequestConfig) {
    this.routes = routes
    this.client = axios.create(config)
  }

  public async get(
    name: string,
    {
      params = undefined,
      payload,
    }: RouteParameters<querystring.ParsedUrlQueryInput | string> = {},
    config?: AxiosRequestConfig
  ) {
    const query =
      typeof payload === 'string'
        ? payload
        : `?${querystring.stringify(payload)}`
    return this.return(
      this.client.get(`${this.url(name, params)}${query}`, config)
    )
  }

  public async post(
    name: string,
    { params = undefined, payload = undefined }: RouteParameters = {},
    config?: AxiosRequestConfig
  ) {
    return this.return(
      this.client.post(this.url(name, params), payload, config)
    )
  }

  public async put(
    name: string,
    { params = undefined, payload = undefined }: RouteParameters = {},
    config?: AxiosRequestConfig
  ) {
    return this.return(this.client.put(this.url(name, params), payload, config))
  }

  public async patch(
    name: string,
    { params = undefined, payload = undefined }: RouteParameters = {},
    config?: AxiosRequestConfig
  ) {
    return this.return(
      this.client.patch(this.url(name, params), payload, config)
    )
  }

  public async delete(name: string, params?: any, config?: AxiosRequestConfig) {
    return this.return(this.client.delete(this.url(name, params), config))
  }

  protected url(name: string, params: any = undefined): string {
    let url = this.path(this.routes, name.split('.'))
    if (url.includes(':')) {
      url = url
        .split('/')
        .map((segment) => {
          if (!segment.includes(':')) return segment
          const key = segment.substr(1)
          if (!(key in params)) {
            throw new ParamNotFoundException(`${key} not found`)
          }
          segment = params[key]
          delete params[key]
          return segment
        })
        .join('/')
    }
    if (params && params.length)
      console.warn('Unnecessary parameters provided to router', params)
    return url
  }

  protected path(routes: any, [next, ...rest]: string[]): string {
    if (!(next in routes)) {
      throw new RouteNotFoundException(`'${next}' not found in api routes`)
    }
    if (!rest.length) {
      return routes[next]
    }
    return this.path(routes[next], rest)
  }

  protected async return(response: Promise<AxiosResponse>) {
    return response.then((reply) => this.camelCaseKeys(reply.data))
  }

  protected camelCaseKeys(object: any): any {
    return transform(object, (result: any, value: any, key: string) => {
      if (typeof value === 'object' && !isEmpty(value)) {
        value = this.camelCaseKeys(value)
      }
      result[camelCase(key)] = value
    })
  }
}
