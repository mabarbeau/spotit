import querystring from 'querystring'

export interface RouteParameters {
  params?: any | undefined
  payload?: any | undefined
}
export interface GetParameters {
  params?: any | undefined
  payload?: querystring.ParsedUrlQueryInput | string
}
