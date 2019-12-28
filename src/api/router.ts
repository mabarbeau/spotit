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

export default class Router {
  public static get(name: string, params: any = {}) {
    [name, params] = this.url(name, params)
    return Api.get(name, params)
  }

  protected static url(name: string, params: any = {}): any[] {
    let url = this.path(Routes, name.split('.'))
    if (url.includes(':')) {
      url = url
        .split('/')
        .map((segment) => {
          if (!segment.includes(':')) return segment
          const key = segment.substr(1)
          if (!(key in params)) {
            throw new ParamNotFoundException(
              `${key} not found`
            )
          }
          segment = params[key]
          delete params[key]
          return segment
        })
        .join('/')
    }
    return [url, params]
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
    if (!routes[next].children) {
      throw new RouteNotFoundException(
        `'${next}' has no children`
      )
    }
    return this.path(routes[next].children, rest)
  }
}
