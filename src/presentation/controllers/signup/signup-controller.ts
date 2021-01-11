import { HttpRequest, HtttpResponse, Controller, AddAccount, Validation, Authentication } from './signup-controller-protocols'
import { badRequest, serverError, ok } from '../../helpers/http/http-helper'

export class SignUpController implements Controller {
  constructor (
    private readonly addAccount: AddAccount,
    private readonly validation: Validation,
    private readonly authetication: Authentication
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HtttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const { name, email, password } = httpRequest.body
      const account = await this.addAccount.add({ name, email, password })
      await this.authetication.auth({ email, password })
      return ok(account)
    } catch (error) {
      console.error(error)
      return serverError(error)
    }
  }
}
