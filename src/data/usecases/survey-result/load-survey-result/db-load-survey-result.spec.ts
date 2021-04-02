import { DbLoadSurveyResult } from './db-load-survey-result'
import { SurveyResultModel } from '@/domain/models/survey-result'
import { mockSurveyResultModel } from '@/domain/test'
import { LoadSurveyResultRepository } from '@/data/protocols/db/survey-result/load-survey-result-repository'

describe('DbLoadSurveyResult', () => {
  test('should call LoadSurveyResultRepository with correct values', async () => {
    class LoadSuveyResultRepositoryStub implements LoadSurveyResultRepository {
      async loadBySurveyId (surveyId: string): Promise<SurveyResultModel> {
        return Promise.resolve(mockSurveyResultModel())
      }
    }
    const loadSurveyResultRepositoryStub = new LoadSuveyResultRepositoryStub()
    const loadBySurveyIdSpy = jest.spyOn(loadSurveyResultRepositoryStub, 'loadBySurveyId')
    const sut = new DbLoadSurveyResult(loadSurveyResultRepositoryStub)
    await sut.load('any_suvey_id')
    expect(loadBySurveyIdSpy).toBeCalledWith('any_suvey_id')
  })
})
