import { ServerError } from '../errors/server-error'
import { HtttpResponse } from '../protocols/http'

export const badRequest = (error: Error): HtttpResponse => (
  {
    statusCode: 400,
    body: error
  }
)

export const serverError = (): HtttpResponse => (
  {
    statusCode: 500,
    body: new ServerError()
  }
)
