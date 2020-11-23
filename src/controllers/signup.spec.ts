import { SignUpController } from './signup'

describe('SignUp Controller', () => {
  test('Should return 400 if no name is provided', () => {
    const sut = new SignUpController()
    const httpRequest = {
      email: 'any_email@mail.com',
      password: 'any_password',
      passowrd_confirmation: 'any_password'
    }
    const httResponse = sut.handle(httpRequest)
    expect(httResponse.statusCode).toBe(400)
    expect(httResponse.body).toEqual(new Error('Missing param: name'))
  })
})
