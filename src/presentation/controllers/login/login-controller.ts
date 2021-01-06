import { Controller, HttpRequest, HtttpResponse, Authentication, Validation } from './login-controller-protocols'
import { badRequest, serverError, unauthorized, ok } from '../../helpers/http/http-helper'

export class LoginController implements Controller {
  constructor (
    private readonly authetication: Authentication,
    private readonly validation: Validation
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HtttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const { email, password } = httpRequest.body
      const accessToken = await this.authetication.auth({
        email,
        password
      })
      if (!accessToken) {
        return unauthorized()
      }
      return ok({ accessToken })
    } catch (error) {
      return serverError(error)
    }
  }
}
