import { HttpRequest, HtttpResponse } from '../protocols/http'
export class SignUpController {
  handle (httpRequest: HttpRequest): HtttpResponse {
    if (!httpRequest.body.name) {
      return {
        statusCode: 400,
        body: new Error('Missing param: name')
      }
    } else if (!httpRequest.body.email) {
      return {
        statusCode: 400,
        body: new Error('Missing param: email')
      }
    }
  }
}
