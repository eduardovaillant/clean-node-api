import { AddSurveyController } from './add-survey-controller'
import { Validation } from './add-survey-controller-protocols'

describe('Add Survey', () => {
  test('Should call validation with correct values', async () => {
    class ValidationStub implements Validation {
      validate (input: any): Error {
        return null
      }
    }
    const validationStub = new ValidationStub()
    const sut = new AddSurveyController(validationStub)
    const validationSpy = jest.spyOn(validationStub, 'validate')
    const httpRequest = {
      body: {
        question: 'any_question',
        answers: [
          {
            image: 'any_image',
            answer: 'any_answer'
          }
        ]
      }
    }
    await sut.handle(httpRequest)
    expect(validationSpy).toHaveBeenCalledWith(httpRequest.body)
  })
})
