import { SurveyResultMongoRepository } from './survey-result-mongo-repository'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import { SurveyModel } from '@/domain/models/survey'
import { AccountModel } from '@/domain/models/account'
import { Collection, ObjectID } from 'mongodb'

let surveyCollection: Collection
let accountCollection: Collection
let surveyResultCollection: Collection

const makeSurvey = async (): Promise<SurveyModel> => {
  const res = await surveyCollection.insertOne(
    {
      question: 'any_question',
      answers: [
        {
          image: 'any_image',
          answer: 'any_answer_1'
        },
        {
          answer: 'any_answer_2'
        },
        {
          answer: 'any_answer_3'
        }
      ],
      date: new Date()
    }
  )
  return MongoHelper.map(res.ops[0])
}

const makeAccount = async (): Promise<AccountModel> => {
  const res = await accountCollection.insertOne(
    {
      name: 'any_name',
      email: 'any_email@email.com',
      password: 'any_password'
    }
  )
  return MongoHelper.map(res.ops[0])
}

const makeSut = (): SurveyResultMongoRepository => {
  return new SurveyResultMongoRepository()
}

describe('Survey Result Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    surveyCollection = await MongoHelper.getCollection('surveys')
    await surveyCollection.deleteMany({})
    surveyResultCollection = await MongoHelper.getCollection('surveyResults')
    await surveyResultCollection.deleteMany({})
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  describe('save()', () => {
    test('Should add a survey result if its new', async () => {
      const sut = makeSut()
      const survey = await makeSurvey()
      const account = await makeAccount()
      await sut.save({
        accountId: account.id,
        surveyId: survey.id,
        answer: survey.answers[0].answer,
        date: new Date()
      })
      const surveyResult = await surveyResultCollection.findOne({
        accountId: account.id,
        surveyId: survey.id
      })
      expect(surveyResult).toBeTruthy()
    })

    test('Should update survey result if its not new', async () => {
      const sut = makeSut()
      const survey = await makeSurvey()
      const account = await makeAccount()
      await surveyResultCollection.insertOne(
        {
          accountId: new ObjectID(account.id),
          surveyId: new ObjectID(survey.id),
          answer: survey.answers[0].answer,
          date: new Date()
        }
      )
      await sut.save({
        accountId: account.id,
        surveyId: survey.id,
        answer: survey.answers[1].answer,
        date: new Date()
      })
      const surveyResult = await surveyResultCollection
        .find({
          accountId: account.id,
          surveyId: survey.id
        })
        .toArray()
      expect(surveyResult).toBeTruthy()
      expect(surveyResult.length).toBe(1)
    })
  })

  describe('loadBySurveyId()', () => {
    test('Should load survey result', async () => {
      const sut = makeSut()
      const survey = await makeSurvey()
      const account = await makeAccount()
      await surveyResultCollection.insertMany(
        [
          {
            accountId: new ObjectID(account.id),
            surveyId: new ObjectID(survey.id),
            answer: survey.answers[0].answer,
            date: new Date()
          },
          {
            accountId: new ObjectID(account.id),
            surveyId: new ObjectID(survey.id),
            answer: survey.answers[0].answer,
            date: new Date()
          },
          {
            accountId: new ObjectID(account.id),
            surveyId: new ObjectID(survey.id),
            answer: survey.answers[1].answer,
            date: new Date()
          },
          {
            accountId: new ObjectID(account.id),
            surveyId: new ObjectID(survey.id),
            answer: survey.answers[1].answer,
            date: new Date()
          }
        ]
      )
      const surveyResult = await sut.loadBySurveyId(survey.id)
      expect(surveyResult).toBeTruthy()
      expect(surveyResult.surveyId).toEqual(survey.id)
      expect(surveyResult.answers[0].count).toBe(2)
      expect(surveyResult.answers[0].percent).toBe(50)
      expect(surveyResult.answers[1].count).toBe(2)
      expect(surveyResult.answers[1].percent).toBe(50)
      expect(surveyResult.answers[2].count).toBe(0)
      expect(surveyResult.answers[2].percent).toBe(0)
    })

    test('Should return null if there is no survey result', async () => {
      const sut = makeSut()
      const survey = await makeSurvey()
      const surveyResult = await sut.loadBySurveyId(survey.id)
      expect(surveyResult).toBeNull()
    })
  })
})
