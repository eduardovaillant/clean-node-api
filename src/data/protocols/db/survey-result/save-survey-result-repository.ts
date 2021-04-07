import { SaveSurveyResultParams } from '@/domain/usecases/save-survey/save-survey-result'

export interface SaveSurveyResultRepository {
  save (data: SaveSurveyResultParams): Promise<void>
}
