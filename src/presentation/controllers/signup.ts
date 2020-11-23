import { HttpRequest, HtttpResponse } from '../protocols/http'
import { MissingParamError } from '../errors/missing-param-error'
import { badRequest } from '../helpers/http-helper'

export class SignUpController {
  handle (httpRequest: HttpRequest): HtttpResponse {
    if (!httpRequest.body.name) {
      return badRequest(new MissingParamError('name'))
    } else if (!httpRequest.body.email) {
      return badRequest(new MissingParamError('email'))
    }
  }
}
