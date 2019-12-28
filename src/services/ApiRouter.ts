import ApiRoutes from './ApiRoutes'
import ApiService from './ApiService'

if (!process.env.VUE_APP_API) throw new Error('API is undefined')
const Api = new ApiService(process.env.VUE_APP_API)

class BaseException extends Error {
  constructor(message: string) {
    super(message)
    Object.setPrototypeOf(this, BaseException.prototype)
  }

  getMessage() {
    return this.message
  }
}

class RouteNotFoundException extends BaseException {}
class ParamNotFoundException extends BaseException {}

export default class ApiRouter {
  public static get(name: string, params: any = {}) {
    [name, params] = this.url(name, params)
    return Api.get(name, params)
  }

  protected static url(name: string, params: any = {}): any[] {
    let url = this.path(ApiRoutes, name.split('.'))
    if (url.includes(':')) {
      url = url
        .split('/')
        .map((segment) => {
          if (!segment.includes(':')) return segment
          const key = segment.substr(1)
          if (!(key in params)) {
            throw new ParamNotFoundException(
              `${key} not found in parameters`
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
    routes: any = ApiRoutes,
    [next, ...rest]: string[]
  ): string {
    if (!(next in routes)) {
      throw new RouteNotFoundException(
        `${next} not found in api`
      )
    }
    if (rest.length) return this.path(routes[next], rest)
    return routes[next]
  }
}
