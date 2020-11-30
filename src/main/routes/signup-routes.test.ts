import request from 'supertest'
import app from '../config/app'

jest.useFakeTimers()

describe('Sign Up Routes', () => {
  test('Should return an account on succes', async () => {
    await request(app)
      .post('/api/signup')
      .send({
        name: 'Rodrigo',
        email: 'rodrigo.manguinho@gmail.com',
        password: '123',
        passwordConfirmation: '123'
      })
      .expect(200)
  })
})
