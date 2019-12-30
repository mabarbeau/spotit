// eslint-disable-next-line no-unused-vars
import axios, { AxiosInstance, AxiosResponse, AxiosRequestConfig } from 'axios'
import { transform, isEmpty, camelCase } from 'lodash'
import querystring from 'querystring'

class BaseException extends Error implements App.Error {
  constructor(message: string) {
    super(`\n\n${message}`)
    Object.setPrototypeOf(this, BaseException.prototype)
  }

  getMessage() {
    return this.message
  }
}

class RouteNotFoundException extends BaseException {
  constructor(message: string) {
    super(`Route Not Found Exception: ${message}`)
  }
}
class ParamNotFoundException extends BaseException {
  constructor(message: string) {
    super(`Parameter Not Found Exception: ${message}`)
  }
}

export default class Router {
  protected routes: any

  protected axios: AxiosInstance

  protected errorHandler: App.ErrorHandler

  constructor(
    routes: any,
    config: AxiosRequestConfig | undefined = undefined,
    errorHandler: App.ErrorHandler
  ) {
    this.routes = routes
    this.axios = axios.create(config)
    this.errorHandler = errorHandler
  }

  public async get({
    name,
    params = undefined,
    payload = '',
  }: {
    name: string
    params?: any | undefined
    payload?: querystring.ParsedUrlQueryInput | string
  }) {
    try {
      const query = typeof payload === 'string'
        ? payload
        : `?${querystring.stringify(payload)}`
      return this.return(this.axios.get(this.url(name, params) + query))
    } catch (error) {
      this.handleError(error)
      return undefined
    }
  }

  public async post({
    name,
    params = undefined,
    payload = undefined,
  }: Routing.RouteParameters) {
    try {
      return this.return(this.axios.post(this.url(name, params), payload))
    } catch (error) {
      this.handleError(error)
      return undefined
    }
  }

  public async put({
    name,
    params = undefined,
    payload = undefined,
  }: Routing.RouteParameters) {
    try {
      return this.return(this.axios.put(this.url(name, params), payload))
    } catch (error) {
      this.handleError(error)
      return undefined
    }
  }

  public async patch({
    name,
    params = undefined,
    payload = undefined,
  }: Routing.RouteParameters) {
    try {
      return this.return(
        this.axios.patch(this.url(name, params), payload)
      )
    } catch (error) {
      this.handleError(error)
      return undefined
    }
  }

  public async delete({
    name,
    params = undefined,
  }: {
    name: string
    params?: any | undefined
  }) {
    try {
      return this.return(
        this.axios.delete(this.url(name, params))
      )
    } catch (error) {
      this.handleError(error)
      return undefined
    }
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
    if (params && params.length) console.warn('Unnecessary parameters provided to router', params)
    return url
  }

  protected path(
    routes: any,
    [next, ...rest]: string[]
  ): string {
    if (!(next in routes)) {
      throw new RouteNotFoundException(
        `'${next}' not found in api routes`
      )
    }
    if (!rest.length) {
      return routes[next]
    }
    return this.path(routes[next], rest)
  }

  protected async return(response: Promise<AxiosResponse>) {
    return response
      .then((reply) => this.camelCaseKeys(reply.data))
      .catch((error) => this.handleError(error))
  }

  protected camelCaseKeys(object: any): any {
    return transform(
      object,
      (result: any, value: any, key: string) => {
        if (typeof value === 'object' && !isEmpty(value)) {
          value = this.camelCaseKeys(value)
        }
        result[camelCase(key)] = value
      }
    )
  }

  protected handleError(error: App.Error) {
    this.errorHandler.handle(error)
  }
}
