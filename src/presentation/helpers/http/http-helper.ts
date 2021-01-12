import { ServerError, UnauthorizedError } from '../../errors'
import { HtttpResponse } from '../../protocols/http'

export const badRequest = (error: Error): HtttpResponse => (
  {
    statusCode: 400,
    body: error
  }
)

export const unauthorized = (): HtttpResponse => (
  {
    statusCode: 401,
    body: new UnauthorizedError()
  }
)

export const forbbiden = (error: Error): HtttpResponse => (
  {
    statusCode: 403,
    body: error
  }
)

export const serverError = (error: Error): HtttpResponse => (
  {
    statusCode: 500,
    body: new ServerError(error.stack)
  }
)

export const ok = (data: any): HtttpResponse => (
  {
    statusCode: 200,
    body: data
  }
)
