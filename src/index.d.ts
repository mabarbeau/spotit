/* eslint-disable no-unused-vars */

declare module 'googlemaps'

declare namespace App {
  interface Error {
    message: string
    getMessage(): string
  }
  interface ErrorHandler {
    messages: object
    handle(error: Error): string
  }
  interface ErrorMessages {
    400: string
    401: string
    404: string
    500: string
  }
}
declare namespace Routing {
  interface RouteParameters {
    name: string
    params?: any | undefined
    payload?: any | undefined
  }
}
