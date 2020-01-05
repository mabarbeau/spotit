// eslint-disable-next-line no-unused-vars
import axios, { AxiosInstance, AxiosResponse, AxiosRequestConfig } from 'axios'
import { transform, isEmpty, camelCase } from 'lodash'
import querystring from 'querystring'

class RouteNotFoundException extends Error {
  constructor(message: string) {
    super(`\n\nRoute Not Found Exception: ${message}`)
    Object.setPrototypeOf(this, RouteNotFoundException.prototype)
  }
}

class ParamNotFoundException extends Error {
  constructor(message: string) {
    super(`\n\nParameter Not Found Exception: ${message}`)
    Object.setPrototypeOf(this, RouteNotFoundException.prototype)
  }
}

export default class Router {
  protected routes: any

  protected axios: AxiosInstance

  constructor(routes: any, config: AxiosRequestConfig | undefined = undefined) {
    this.routes = routes
    this.axios = axios.create(config)
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
    const query =
      typeof payload === 'string'
        ? payload
        : `?${querystring.stringify(payload)}`
    return this.return(this.axios.get(this.url(name, params) + query))
  }

  public async post({
    name,
    params = undefined,
    payload = undefined,
  }: Routing.RouteParameters) {
    return this.return(this.axios.post(this.url(name, params), payload))
  }

  public async put({
    name,
    params = undefined,
    payload = undefined,
  }: Routing.RouteParameters) {
    return this.return(this.axios.put(this.url(name, params), payload))
  }

  public async patch({
    name,
    params = undefined,
    payload = undefined,
  }: Routing.RouteParameters) {
    return this.return(this.axios.patch(this.url(name, params), payload))
  }

  public async delete({
    name,
    params = undefined,
  }: {
    name: string
    params?: any | undefined
  }) {
    return this.return(this.axios.delete(this.url(name, params)))
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
