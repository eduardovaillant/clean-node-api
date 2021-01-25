import { Router } from 'express'
import { adptRoute } from '../adapters/express-route-adapter'
import { makeAddSurveyControler } from '../factories/controllers/survey/add-survey/add-survey-controller-factory'

export default (router: Router): void => {
  router.post('/surveys', adptRoute(makeAddSurveyControler()))
}
