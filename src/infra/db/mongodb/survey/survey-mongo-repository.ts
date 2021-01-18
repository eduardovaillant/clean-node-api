import { MongoHelper } from '../helpers/mongo-helper'
import { AddSurveyModel } from '../../../../domain/usecases/add-survey'
import { AddSurveyRepository } from '../../../../data/protocols/db/survey/add-survey-repository'

export class SurveyMongoRepository implements AddSurveyRepository {
  async add (surveyData: AddSurveyModel): Promise<void> {
    const accountCollection = await MongoHelper.getCollection('surveys')
    await accountCollection.insertOne(surveyData)
  }
}
