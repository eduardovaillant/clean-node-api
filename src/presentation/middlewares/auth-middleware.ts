
import { Middleware, HttpRequest, HttpResponse } from '../protocols'
import { forbbiden } from '../helpers/http/http-helper'
import { AccessDeniedError } from '../errors'

export class AuthMiddleware implements Middleware {
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const error = forbbiden(new AccessDeniedError())
    return new Promise(resolve => resolve(error))
  }
}
