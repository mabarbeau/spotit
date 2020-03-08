declare module 'googlemaps'

declare namespace App {
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
  interface Alert {
    type: string
    text: string
  }
}
declare interface Window {
  gmapsCallback: () => void
  google: any
}
