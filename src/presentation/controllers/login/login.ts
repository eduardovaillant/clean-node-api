import { Controller, HttpRequest, HtttpResponse, Authentication, Validation } from './login-protocols'
import { badRequest, serverError, unauthorized, ok } from '../../helpers/http/http-helper'

export class LoginController implements Controller {
  private readonly validation: Validation
  private readonly authetication: Authentication

  constructor (authetication: Authentication, validation: Validation) {
    this.validation = validation
    this.authetication = authetication
  }

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
