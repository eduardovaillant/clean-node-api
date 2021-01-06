import { Router } from 'express'
import { adptRoute } from '../adapters/express-route-adapter'
import { makeSignUpController } from '../factories/signup/signup-factory'

export default (router: Router): void => {
  router.post('/signup', adptRoute(makeSignUpController()))
}
