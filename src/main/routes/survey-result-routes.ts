import { makeSaveSurveyResultControler } from '@/main/factories/controllers/survey-result/save-survey-result/save-survey-result-controller-factory'
import { makeLoadSurveyResultControler } from '@/main/factories/controllers/survey-result/load-survey-result/load-survey-result-controller-factory'
import { adaptRoute } from '@/main/adapters/express-route-adapter'
import { auth } from '@/main/middlewares'
import { Router } from 'express'

export default (router: Router): void => {
  router.put('/surveys/:surveyId/results', auth, adaptRoute(makeSaveSurveyResultControler()))
  router.get('/surveys/:surveyId/results', auth, adaptRoute(makeLoadSurveyResultControler()))
}
