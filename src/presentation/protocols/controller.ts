import { HttpRequest, HtttpResponse } from './http'

export interface Controller {
  handle: (httpRequest: HttpRequest) => HtttpResponse
}
