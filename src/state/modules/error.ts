class ErrorHandler implements App.ErrorHandler {
  messages: App.ErrorMessages

  constructor(messages: App.ErrorMessages) {
    this.messages = messages
  }

  public handle(error: Error): string {
    console.error(error)
    switch (error.constructor.name) {
    case 'RouteNotFoundException':
    case 'ParamNotFoundException':
      return this.messages[500]
    default:
      return this.messages[500]
    }
  }
}

const errorHandlerInstance = new ErrorHandler({
  400: 'Bad Request',
  401: 'Unauthorized',
  404: 'Not Found',
  500: 'Internal Server Error',
})

console.log(errorHandlerInstance)
