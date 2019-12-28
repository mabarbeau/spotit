import Routes from './routes'
import Service from './service'

if (!process.env.VUE_APP_API) throw new Error('API is undefined')
const Api = new Service(process.env.VUE_APP_API)

class BaseException extends Error {
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

interface RouteParameters {
  name: string
  params?: any | undefined
  payload?: any | undefined
}

type methods = 'get' | 'post' | 'put' | 'patch' | 'delete'

export default class Router {
  public static get(params: RouteParameters) {
    return this.method('get', params)
  }

  public static post(params: RouteParameters) {
    return this.method('post', params)
  }

  public static put(params: RouteParameters) {
    return this.method('put', params)
  }

  public static patch(params: RouteParameters) {
    return this.method('patch', params)
  }

  public static delete(params: RouteParameters) {
    return this.method('delete', params)
  }

  protected static method(
    method: methods,
    { name, params = undefined, payload = undefined }: RouteParameters
  ) {
    return Api[method](this.url(name, params), payload)
  }

  protected static url(name: string, params: any = undefined): string {
    let url = this.path(Routes, name.split('.'))
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

  protected static path(
    routes: any = Routes,
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
}
