import { HtttpResponse } from '../protocols/http'

export const badRequest = (error: Error): HtttpResponse => (
  {
    statusCode: 400,
    body: error
  }
)
