import { InvalidParamError } from '../../errors'
import { Validation } from './validation'

export class CompareFieldValidation implements Validation {
  private readonly fieldName: string
  private readonly fielNameToCompare: string

  constructor (fieldName: string, fielNameToCompare: string) {
    this.fieldName = fieldName
    this.fielNameToCompare = fielNameToCompare
  }

  validate (input: any): Error {
    if (input[this.fieldName] !== input[this.fielNameToCompare]) {
      return new InvalidParamError(this.fielNameToCompare)
    }
  }
}
