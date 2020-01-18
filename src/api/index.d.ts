import querystring from 'querystring'

export interface RouteParameters {
  name: string
  params?: any | undefined
  payload?: any | undefined
}
export interface GetParameters {
  name: string
  params?: any | undefined
  payload?: querystring.ParsedUrlQueryInput | string
}
