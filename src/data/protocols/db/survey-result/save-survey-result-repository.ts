import { SurveyResultModel } from '@/domain/models/survey-result'
import { SaveSurveyResultParams } from '@/domain/usecases/save-survey/save-survey-result'

export interface SaveSurveyResultRepository {
  save (data: SaveSurveyResultParams): Promise<SurveyResultModel>
}
