import { Router } from 'express'
import { adaptMiddleware } from '../adapters/express-middleware-adapter'
import { adptRoute } from '../adapters/express-route-adapter'
import { makeAddSurveyControler } from '../factories/controllers/survey/add-survey/add-survey-controller-factory'
import { makeAuthMiddleware } from '../factories/middlewares/auth-middleware-factory'

export default (router: Router): void => {
  const adminAuth = adaptMiddleware(makeAuthMiddleware('admin'))
  router.post('/surveys', adminAuth, adptRoute(makeAddSurveyControler()))
}
